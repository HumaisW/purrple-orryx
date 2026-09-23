(function () {
  var PHONE = '97148842588';
  var INBOX = 'info@purrpleorryx.com';
  var ENDPOINT = 'https://prrowess.app.n8n.cloud/webhook/po-click-ref';
  var KEY = 'po_click_ref', PKEY = 'po_click_payload', SENT = 'po_click_sent';
  var OUTBOX = 'po_click_outbox';

  function ss(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function ssSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function ssDel(k) { try { localStorage.removeItem(k); } catch (e) {} }

  function rand(n) {
    var a = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789', s = '', b = new Uint8Array(n);
    crypto.getRandomValues(b);
    for (var i = 0; i < n; i++) s += a[b[i] % a.length];
    return s;
  }

  function channel(gclid) {
    if (gclid) return 'G';
    var r = document.referrer || '';
    if (!r) return 'D';
    var h;
    try { h = new URL(r).hostname; } catch (e) { return 'D'; }
    if (h.indexOf(location.hostname) > -1) return null;
    if (/google\.|bing\.|yahoo\.|duckduckgo\./.test(h)) return 'O';
    if (/facebook\.|instagram\.|linkedin\.|tiktok\.|t\.co|twitter\.|x\.com/.test(h)) return 'S';
    return 'R';
  }

  var q = new URLSearchParams(location.search);
  var gclid = q.get('gclid') || q.get('gbraid') || q.get('wbraid');
  var WINDOW_DAYS = 30;
  var stored = null;
  try { stored = JSON.parse(localStorage.getItem(PKEY) || 'null'); } catch (e) { stored = null; }
  var ref = ss(KEY);

  if (stored && stored.ts && (Date.now() - stored.ts) > WINDOW_DAYS * 86400000) {
    ssDel(KEY); ssDel(PKEY); ssDel(SENT); ssDel(OUTBOX);
    ref = null; stored = null;
  }

  var newPaidClick = !!gclid && (!stored || stored.gclid !== gclid);
  if (!ref || newPaidClick) {
    var c = channel(gclid);
    if (c) {
      ref = 'PO-' + c + '-' + rand(6);
      ssSet(KEY, ref);
      ssDel(SENT); ssDel(OUTBOX);
      ssSet(PKEY, JSON.stringify({
        ref: ref,
        ts: Date.now(),
        gclid: q.get('gclid') || '',
        gbraid: q.get('gbraid') || '',
        wbraid: q.get('wbraid') || '',
        gad_campaignid: q.get('gad_campaignid') || '',
        utm_id: q.get('utm_id') || '',
        utm_campaign: q.get('utm_campaign') || '',
        utm_term: q.get('utm_term') || '',
        landing_page: location.pathname
      }));
    }
  }
  if (!ref) return;

  // ---------------------------------------------------------------------
  // Reporting the click to n8n.
  //
  // DELIBERATELY NOT ON PAGE LOAD. A row is created only when the visitor
  // actually acts — taps WhatsApp or the email link. A page view on its
  // own is worth nothing here and would burn an n8n execution per visit.
  // The single exception is the outbox retry at the bottom, which only
  // runs when an earlier tap failed to report, and which produces the row
  // that tap should have produced. It costs nothing when nothing failed.
  //
  // Three defects fixed, all of which silently lost ad attribution:
  //
  // 1. FIRE AND FORGET AT THE WORST MOMENT. The report was fired as the
  //    browser was already tearing the page down to navigate to wa.me,
  //    and nothing waited for it or noticed it had died. It now starts on
  //    pointerdown — before the tap completes, buying a head start — and
  //    the navigation is held for up to NAV_HOLD_MS until the server has
  //    actually confirmed. In practice the hold is imperceptible; it is
  //    capped, and the link always opens whether or not the report got
  //    through.
  //
  // 2. PREMATURE SUCCESS. The 'sent' flag used to be written BEFORE the
  //    send was attempted, so any failure was permanent: the flag said
  //    done, and that click's campaign, keyword and gclid were lost for
  //    good. It is now written only once the server confirms.
  //
  // 3. FALSE RECEIPT. navigator.sendBeacon returning true means 'queued',
  //    not 'delivered'. The old code read that as success and skipped its
  //    own fallback, so the fallback only ever ran when it wasn't needed.
  //    Beacon is now a last-ditch shot fired as we navigate away, and is
  //    never treated as proof of anything.
  //
  // The endpoint returns CORS headers, so res.ok is a genuine receipt.
  // Keep the text/plain content type: a JSON one triggers a CORS preflight
  // this request cannot satisfy, and the send is dropped with no error.
  // ---------------------------------------------------------------------

  var MAX_TRIES = 4;
  var NAV_HOLD_MS = 600;
  var tries = 0;
  var inFlight = null;

  function delivered() { return ss(SENT) === ref; }

  function post() {
    return fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body: ss(PKEY) || '',
      keepalive: true
    }).then(function (res) {
      if (res && res.ok) {
        ssSet(SENT, ref);     // only now is it really sent
        ssDel(OUTBOX);
        return true;
      }
      return false;
    }).catch(function () { return false; });
  }

  // Always returns a promise, so the click handler can wait on it safely.
  function kick() {
    if (delivered()) return Promise.resolve(true);
    if (inFlight) return inFlight;
    if (tries >= MAX_TRIES || !ss(PKEY)) return Promise.resolve(false);
    tries++;
    inFlight = post().then(function (ok) {
      inFlight = null;
      if (!ok && tries < MAX_TRIES) setTimeout(kick, 1000 * tries);
      return ok;
    });
    return inFlight;
  }

  // Last-ditch shot as we navigate away, when nothing has been confirmed.
  // Deliberately does NOT record success, because it cannot know. Worst
  // case is one duplicate row, which the resolver ignores — it matches on
  // ref and takes the first hit. A duplicate row is cheap; a lost click
  // is not.
  function beaconFallback() {
    var payload = ss(PKEY);
    if (!payload || delivered()) return;
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(ENDPOINT, new Blob([payload], { type: 'text/plain;charset=UTF-8' }));
      }
    } catch (e) {}
  }

  // Finger down: the earliest moment we know a CTA is being pressed, and
  // typically 100-300ms before the browser starts navigating.
  function onPress() {
    if (delivered()) return;
    ssSet(OUTBOX, ref);   // if this tap's report dies, retry on the next visit
    kick();
  }

  // The tap itself: hold the navigation briefly, but never break the link.
  function onClick(e) {
    if (delivered() || e.defaultPrevented) return;
    // Leave modified clicks (open in new tab, etc.) entirely alone.
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.currentTarget;
    var href = a && a.getAttribute('href');
    if (!href) return;

    e.preventDefault();
    var done = false;
    function go() {
      if (done) return;
      done = true;
      clearTimeout(timer);
      if (!delivered()) beaconFallback();
      window.location.href = href;
    }
    var timer = setTimeout(go, NAV_HOLD_MS);   // hard cap: the link always opens
    try { kick().then(go, go); } catch (err) { go(); }
  }

  var msg = "Hi Purrple Orryx, I'd like to discuss a corporate event. (Ref: " + ref + ")";

  function arm(a) {
    a.setAttribute('data-po-ref', ref);
    a.addEventListener('pointerdown', onPress, { capture: true });
    a.addEventListener('touchstart', onPress, { capture: true, passive: true });
    a.addEventListener('click', onClick, { capture: true });
  }

  function rewrite() {
    document.querySelectorAll('a[href*="wa.me"],a[href*="api.whatsapp.com"],a[href*="whatsapp.com/send"]').forEach(function (a) {
      if (a.getAttribute('data-po-ref') === ref) return;
      a.href = 'https://api.whatsapp.com/send?phone=' + PHONE + '&text=' + encodeURIComponent(msg);
      arm(a);
    });

    document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
      var h = a.getAttribute('href') || '';
      if (h.toLowerCase().indexOf(INBOX) === -1) return;
      if (a.getAttribute('data-po-ref') === ref) return;
      a.href = h.split('?')[0] + '?subject=' + encodeURIComponent('Event enquiry (Ref: ' + ref + ')');
      arm(a);
    });
  }

  rewrite();
  try { new MutationObserver(rewrite).observe(document.body, { childList: true, subtree: true }); } catch (e) {}

  // The ONLY thing that can reach the network on a plain page view: a tap
  // from an earlier visit whose report never got through. No pending tap,
  // no request, no execution.
  if (ss(OUTBOX) === ref && !delivered()) {
    kick();
    window.addEventListener('online', function () {
      if (ss(OUTBOX) === ref && !delivered()) kick();
    });
  }
})();