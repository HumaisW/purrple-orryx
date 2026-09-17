/* ============================================================================
   Purrple Orryx - Click Reference Tracking  (v2)
   Deploy on: events.purrpleorryx.com (and www.purrpleorryx.com)
   Replaces v1 entirely.

   FIXED IN v2
   v1 appended the reference to a link and then guarded against re-appending by
   searching the href for the literal text "[ref: PO-G-XXXXXX]". Once written
   into a URL those characters are percent-encoded to "%5Bref%3A+PO-G-XXXXXX%5D",
   so the guard never matched. Every re-render appended another copy and the
   prefilled message ended up with the reference six or seven times over.

   v2 never appends to a live link. It records each link's original address once
   in data-po-base and always rebuilds from that pristine copy, so running the
   tagger any number of times produces exactly the same result. It also only
   writes the href when the value actually changes, which stops the observer
   retriggering itself.

   WHAT IT DOES
   1. On page load, works out where the visitor came from and mints a short
      reference such as PO-G-AB12CD. G = Google Ads, O = Organic, D = Direct,
      R = Referral, S = Social.
   2. Rewrites every WhatsApp and mailto link so the reference travels with the
      visitor. WhatsApp gets it in the prefilled message, email in the subject.
   3. When the visitor actually clicks WhatsApp or email, and only then, it
      posts the pairing to n8n. Page views are never posted, so this costs one
      execution per real enquiry rather than one per visitor.

   WHY text/plain ON THE BEACON
   navigator.sendBeacon with Content-Type application/json is not on the
   browser's CORS safelist, so the browser attempts a preflight. sendBeacon
   cannot perform a preflight, so the request is dropped silently with no error
   anywhere. text/plain needs no preflight. The n8n endpoint parses the raw
   string, so this is the correct transport, not a workaround.
   ========================================================================= */

(function () {
  'use strict';

  var ENDPOINT = 'https://prrowess.app.n8n.cloud/webhook/po-click-ref';
  var KEY  = 'po_ref';          // the reference itself
  var PKEY = 'po_ref_payload';  // everything we captured about the click
  var SKEY = 'po_ref_sent';     // guard so we post once per session
  var BASE_ATTR = 'data-po-base';

  /* ---------- storage helpers, safe in private browsing ---------- */
  function ssGet(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function ssSet(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }

  /* ---------- mint a reference ---------- */
  function rand(n) {
    var abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', s = '';
    for (var i = 0; i < n; i++) s += abc.charAt(Math.floor(Math.random() * abc.length));
    return s;
  }

  var q = new URLSearchParams(location.search);
  function p(name) { return q.get(name) || ''; }

  /* ---------- which channel is this ----------
     Google sends gclid, or gbraid / wbraid when gclid is unavailable, which is
     most clicks. Checking gclid alone misfiles real paid clicks as Direct.
     gad_campaignid is appended by Google on every ad click and is also proof
     of a paid click.                                                         */
  var gclid  = p('gclid');
  var gbraid = p('gbraid');
  var wbraid = p('wbraid');
  var gadCampaignId = p('gad_campaignid');
  var isPaid = !!(gclid || gbraid || wbraid || gadCampaignId ||
                  /^(cpc|ppc|paid|paidsearch)$/i.test(p('utm_medium')));

  function channel() {
    if (isPaid) return 'G';
    var prev = ssGet(KEY);
    var r = document.referrer || '';
    if (!r) return prev ? prev.split('-')[1] : 'D';
    var host = '';
    try { host = new URL(r).hostname.toLowerCase(); } catch (e) { return 'D'; }
    if (host.indexOf(location.hostname) > -1) return prev ? prev.split('-')[1] : 'D';
    if (/(google|bing|yahoo|duckduckgo|ecosia|baidu|yandex)\./.test(host)) return 'O';
    if (/(facebook|instagram|linkedin|twitter|x\.com|t\.co|tiktok|youtube|snapchat|pinterest)\./.test(host)) return 'S';
    return 'R';
  }

  /* ---------- establish the reference ----------
     A fresh ad click always mints a new reference, even if the visitor already
     has one, because it is a new campaign touch and that is what we pay to
     measure. Otherwise the existing one is kept for the session.             */
  var ref = ssGet(KEY);
  if (!ref || isPaid) {
    ref = 'PO-' + channel() + '-' + rand(6);
    ssSet(KEY, ref);
    ssSet(PKEY, JSON.stringify({
      ref: ref,
      gclid: gclid,
      gbraid: gbraid,
      wbraid: wbraid,
      gad_campaignid: gadCampaignId,
      utm_id: p('utm_id'),
      utm_campaign: p('utm_campaign'),
      utm_term: p('utm_term'),
      landing_page: location.pathname
    }));
    ssSet(SKEY, '');
  }
  if (!ref) return;

  var TAG = '[ref: ' + ref + ']';

  /* ---------- link detection ---------- */
  function isWhatsApp(href) {
    return /^(https?:)?\/\/(api\.whatsapp\.com|wa\.me|web\.whatsapp\.com)/i.test(href);
  }
  function isEmail(href) { return /^mailto:/i.test(href); }

  /* ---------- build the tagged address FROM THE ORIGINAL ----------
     Both builders take the pristine address and return the tagged one. They
     never read the current href, so they cannot compound.                    */
  function buildWhatsApp(base) {
    var url;
    try { url = new URL(base, location.href); } catch (e) { return base; }
    var text = url.searchParams.get('text') || "Hi, I'd like to discuss an event.";
    url.searchParams.set('text', text + ' ' + TAG);
    return url.toString();
  }

  /* Subject survives replies and forwards far better than body text, which is
     what lets the inbox workflow match an email back to a campaign.          */
  function buildEmail(base) {
    var parts = base.split('?');
    var addr = parts[0];
    var sp = new URLSearchParams(parts[1] || '');
    var subject = sp.get('subject') || 'Event enquiry';
    sp.set('subject', subject + ' ' + TAG);
    return addr + '?' + sp.toString();
  }

  /* ---------- tag one link, idempotently ---------- */
  function tagEl(el) {
    var base = el.getAttribute(BASE_ATTR);
    if (base === null) {
      base = el.getAttribute('href') || '';
      if (!isWhatsApp(base) && !isEmail(base)) return;
      el.setAttribute(BASE_ATTR, base);
    }
    var next = isWhatsApp(base) ? buildWhatsApp(base)
             : isEmail(base)    ? buildEmail(base)
             : null;
    // Only write when it actually differs, otherwise the observer retriggers
    // itself on its own mutation.
    if (next && el.getAttribute('href') !== next) el.setAttribute('href', next);
  }

  function tagAll() {
    var links = document.querySelectorAll('a[href]');
    for (var i = 0; i < links.length; i++) tagEl(links[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tagAll);
  } else {
    tagAll();
  }

  /* ---------- re-tag links that appear later ----------
     The page renders buttons after first paint, so a single pass at load
     misses them. Batched to one pass per frame rather than one per mutation. */
  if (window.MutationObserver) {
    var queued = false;
    new MutationObserver(function () {
      if (queued) return;
      queued = true;
      (window.requestAnimationFrame || setTimeout)(function () { queued = false; tagAll(); }, 0);
    }).observe(document.documentElement, { childList: true, subtree: true });
  }

  /* ---------- post the pairing on a real contact click ---------- */
  function send() {
    if (ssGet(SKEY) === ref) return;   // already recorded this visit
    var payload = ssGet(PKEY);
    if (!payload) return;
    ssSet(SKEY, ref);
    try {
      var blob = new Blob([payload], { type: 'text/plain;charset=UTF-8' });
      if (!navigator.sendBeacon || !navigator.sendBeacon(ENDPOINT, blob)) {
        // Fallback for browsers that refuse the beacon. keepalive lets the
        // request outlive the page as the visitor leaves for WhatsApp.
        fetch(ENDPOINT, {
          method: 'POST',
          body: payload,
          headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
          keepalive: true,
          mode: 'no-cors'
        }).catch(function () {});
      }
    } catch (e) {}
  }

  /* Capture phase so this runs before the page's own handlers and before
     navigation begins. Delegated on document so buttons added later are
     covered without re-binding.                                             */
  document.addEventListener('click', function (ev) {
    var a = ev.target && ev.target.closest ? ev.target.closest('a[href]') : null;
    if (!a) return;
    var base = a.getAttribute(BASE_ATTR) || a.getAttribute('href') || '';
    if (!isWhatsApp(base) && !isEmail(base)) return;
    tagEl(a);
    send();
  }, true);

  /* ---------- for buttons that are NOT plain links ----------
     If a button runs JavaScript instead of being an <a href>, the delegated
     handler above cannot see it. Call these from that button's own handler,
     passing the plain untagged link. They return the address to open and
     record the click at the same time.                                      */
  window.poWhatsAppLink = function (baseHref) {
    send();
    return buildWhatsApp(baseHref || 'https://api.whatsapp.com/send?phone=97148842588');
  };
  window.poEmailLink = function (baseHref) {
    send();
    return buildEmail(baseHref || 'mailto:info@purrpleorryx.com');
  };
  window.poRef = ref;
})();