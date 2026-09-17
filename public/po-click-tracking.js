/* Purrple Orryx click reference tracking. Full replacement. */
(function () {
  'use strict';
  var ENDPOINT = 'https://prrowess.app.n8n.cloud/webhook/po-click-ref';
  var KEY = 'po_ref';
  var PKEY = 'po_ref_payload';
  var SKEY = 'po_ref_sent';
  function ssGet(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function ssSet(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  function rand(n) {
    var abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', s = '';
    for (var i = 0; i < n; i++) s += abc.charAt(Math.floor(Math.random() * abc.length));
    return s;
  }
  var q = new URLSearchParams(location.search);
  function p(name) { return q.get(name) || ''; }
  var gclid = p('gclid');
  var gbraid = p('gbraid');
  var wbraid = p('wbraid');
  var gadCampaignId = p('gad_campaignid');
  var isPaid = !!(gclid || gbraid || wbraid || gadCampaignId || /^(cpc|ppc|paid|paidsearch)$/i.test(p('utm_medium')));
  function channel() {
    if (isPaid) return 'G';
    var r = document.referrer || '';
    if (!r) return 'D';
    var host = '';
    try { host = new URL(r).hostname.toLowerCase(); } catch (e) { return 'D'; }
    if (host.indexOf(location.hostname) > -1) return ssGet(KEY) ? ssGet(KEY).split('-')[1] : 'D';
    if (/(google|bing|yahoo|duckduckgo|ecosia|baidu|yandex)\./.test(host)) return 'O';
    if (/(facebook|instagram|linkedin|twitter|x\.com|t\.co|tiktok|youtube|snapchat|pinterest)\./.test(host)) return 'S';
    return 'R';
  }
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
  function isWhatsApp(href) {
    return /^(https?:)?\/\/(api\.whatsapp\.com|wa\.me|web\.whatsapp\.com)/i.test(href);
  }
  function isEmail(href) { return /^mailto:/i.test(href); }
  function tagWhatsApp(href) {
    if (href.indexOf(TAG) > -1) return href;
    var url;
    try { url = new URL(href, location.href); } catch (e) { return href; }
    var text = url.searchParams.get('text') || "Hi, I'd like to discuss an event.";
    url.searchParams.set('text', text + ' ' + TAG);
    return url.toString();
  }
  function tagEmail(href) {
    if (href.indexOf(TAG) > -1) return href;
    var parts = href.split('?');
    var addr = parts[0];
    var sp = new URLSearchParams(parts[1] || '');
    var subject = sp.get('subject') || 'Event enquiry';
    sp.set('subject', subject + ' ' + TAG);
    return addr + '?' + sp.toString();
  }
  function tagAll() {
    var links = document.querySelectorAll('a[href]');
    for (var i = 0; i < links.length; i++) {
      var h = links[i].getAttribute('href') || '';
      if (isWhatsApp(h)) links[i].setAttribute('href', tagWhatsApp(h));
      else if (isEmail(h)) links[i].setAttribute('href', tagEmail(h));
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tagAll);
  } else {
    tagAll();
  }
  if (window.MutationObserver) {
    new MutationObserver(function () { tagAll(); })
      .observe(document.documentElement, { childList: true, subtree: true });
  }
  function send() {
    if (ssGet(SKEY) === ref) return;
    var payload = ssGet(PKEY);
    if (!payload) return;
    ssSet(SKEY, ref);
    try {
      var blob = new Blob([payload], { type: 'text/plain;charset=UTF-8' });
      if (!navigator.sendBeacon || !navigator.sendBeacon(ENDPOINT, blob)) {
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
  document.addEventListener('click', function (ev) {
    var a = ev.target && ev.target.closest ? ev.target.closest('a[href]') : null;
    if (!a) return;
    var h = a.getAttribute('href') || '';
    if (isWhatsApp(h)) { a.setAttribute('href', tagWhatsApp(h)); send(); }
    else if (isEmail(h)) { a.setAttribute('href', tagEmail(h)); send(); }
  }, true);
  window.poWhatsAppLink = function (baseHref) {
    send();
    return tagWhatsApp(baseHref || 'https://api.whatsapp.com/send?phone=97148842588');
  };
  window.poEmailLink = function (baseHref) {
    send();
    return tagEmail(baseHref || 'mailto:info@purrpleorryx.com');
  };
  window.poRef = ref;
})();