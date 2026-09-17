(function () {
  var PHONE = '97148842588';
  var ENDPOINT = 'https://prrowess.app.n8n.cloud/webhook/po-click-ref';
  var KEY = 'po_click_ref', PKEY = 'po_click_payload', SENT = 'po_click_sent';

  function ss(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function ssSet(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }

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
  var ref = ss(KEY);

  // Mint once per session. Never replace a stored reference.
  if (!ref) {
    var c = channel(gclid);
    if (c) {
      ref = 'PO-' + c + '-' + rand(6);
      ssSet(KEY, ref);
      ssSet(PKEY, JSON.stringify({
        ref: ref,
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

  function register() {
    if (ss(SENT) === ref) return;
    ssSet(SENT, ref);
    var payload = ss(PKEY);
    if (!payload) return;
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(ENDPOINT, new Blob([payload], { type: 'application/json' }));
        return;
      }
    } catch (e) {}
    try {
      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true
      }).catch(function () {});
    } catch (e) {}
  }

  ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(function (evt) {
    window.addEventListener(evt, register, { once: true, capture: true, passive: true });
  });

  var msg = "Hi Purrple Orryx, I'd like to discuss a corporate event. (Ref: " + ref + ")";

  function rewrite() {
    document.querySelectorAll('a[href*="wa.me"],a[href*="api.whatsapp.com"],a[href*="whatsapp.com/send"]').forEach(function (a) {
      if (a.getAttribute('data-po-ref') === ref) return;
      a.href = 'https://api.whatsapp.com/send?phone=' + PHONE + '&text=' + encodeURIComponent(msg);
      a.setAttribute('data-po-ref', ref);
      a.addEventListener('pointerdown', register, { capture: true });
      a.addEventListener('click', register, { capture: true });
    });
  }

  rewrite();
  try { new MutationObserver(rewrite).observe(document.body, { childList: true, subtree: true }); } catch (e) {}
})();