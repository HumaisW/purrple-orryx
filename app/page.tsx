"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import Header from "@/ui/globals/Header";
import Hero from "@/ui/page-sections/landing-page/Hero";
import Stats from "@/ui/page-sections/landing-page/Stats";
import TrustedBy from "@/ui/page-sections/landing-page/TrustedBy";
import EventTypes from "@/ui/page-sections/landing-page/EventTypes";
import Portfolio from "@/ui/page-sections/landing-page/Portfolio";
import PortfolioInMotion from "@/ui/page-sections/landing-page/PortfolioInMotion";
import Difference from "@/ui/page-sections/landing-page/Difference";
import Approach from "@/ui/page-sections/landing-page/Approach";
import Process from "@/ui/page-sections/landing-page/Process";
import Faq from "@/ui/page-sections/landing-page/Faq";
import CaseStudies from "@/ui/page-sections/landing-page/CaseStudies";
import Reviews from "@/ui/page-sections/landing-page/Reviews";
import Cta from "@/ui/page-sections/landing-page/Cta";
import Footer from "@/ui/globals/Footer";
import FloatingContact from "@/ui/globals/FloatingContact";

export default function Home() {
  const attribution = useRef<{ ref: string; payload: string; sent: boolean } | null>(null);

  useEffect(() => {
    const PHONE = "97148842588";
    const INBOX = "info@purrpleorryx.com";
    const ENDPOINT = "https://prrowess.app.n8n.cloud/webhook/po-click-ref";
    const KEY = "po_click_ref";
    const PKEY = "po_click_payload";
    const SENT = "po_click_sent";

    function ss(key: string) {
      try { return window.sessionStorage.getItem(key); } catch { return null; }
    }
    function ssSet(key: string, value: string) {
      try { window.sessionStorage.setItem(key, value); } catch {}
    }

    function rand(n: number) {
      const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
      const bytes = new Uint8Array(n);
      window.crypto.getRandomValues(bytes);
      return Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("");
    }

    function channel(gclid: string | null, gbraid: string | null, wbraid: string | null) {
      if (gclid || gbraid || wbraid) return "G";
      const referrer = document.referrer || "";
      if (!referrer) return "D";
      let hostname: string;
      try { hostname = new URL(referrer).hostname; } catch { return "D"; }
      if (hostname.indexOf(window.location.hostname) > -1) return null;
      if (/google\.|bing\.|yahoo\.|duckduckgo\./.test(hostname)) return "O";
      if (/facebook\.|instagram\.|linkedin\.|tiktok\.|t\.co|twitter\.|x\.com/.test(hostname)) return "S";
      return "R";
    }

    // Capture on arrival, but never contact the webhook until a contact click.
    // Keep an in-memory copy for blocked storage and React effect replays.
    if (!attribution.current) {
      const q = new URLSearchParams(window.location.search);
      const gclid = q.get("gclid");
      const gbraid = q.get("gbraid");
      const wbraid = q.get("wbraid");
      const hasAdsClickId = Boolean(gclid || gbraid || wbraid);
      let ref = ss(KEY);
      let payload = ss(PKEY);
      if (!ref || hasAdsClickId) {
        const c = channel(gclid, gbraid, wbraid);
        if (c) {
          ref = "PO-" + c + "-" + rand(6);
          payload = JSON.stringify({
            ref,
            gclid: gclid || "",
            gbraid: gbraid || "",
            wbraid: wbraid || "",
            gad_campaignid: q.get("gad_campaignid") || "",
            utm_id: q.get("utm_id") || "",
            utm_campaign: q.get("utm_campaign") || "",
            utm_term: q.get("utm_term") || "",
            landing_page: window.location.pathname,
          });
          ssSet(KEY, ref);
          ssSet(PKEY, payload);
        }
      }
      if (!ref) return;
      attribution.current = {
        ref,
        payload: payload || JSON.stringify({ ref, gclid: "", gbraid: "", wbraid: "", gad_campaignid: "", utm_id: "", utm_campaign: "", utm_term: "", landing_page: window.location.pathname }),
        sent: ss(SENT) === ref,
      };
    }

    const entry = attribution.current;
    const { ref, payload } = entry;
    function send() {
      if (entry.sent || ss(SENT) === ref) return;
      entry.sent = true;
      ssSet(SENT, ref);
      try {
        if (navigator.sendBeacon?.(ENDPOINT, new Blob([payload], { type: "text/plain;charset=UTF-8" }))) return;
      } catch {}
      // Also fall back when sendBeacon exists but refuses to queue the request.
      try {
        void fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=UTF-8" },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      } catch {}
    }

    const attached = new Set<HTMLAnchorElement>();
    const msg = "Hi Purrple Orryx, I'd like to discuss a corporate event. (Ref: " + ref + ")";
    function attach(a: HTMLAnchorElement) {
      a.setAttribute("data-po-ref", ref);
      if (attached.has(a)) return;
      a.addEventListener("click", send, { capture: true });
      attached.add(a);
    }
    function rewrite() {
      document.querySelectorAll<HTMLAnchorElement>('a[href*="wa.me"],a[href*="api.whatsapp.com"],a[href*="whatsapp.com/send"]').forEach((a) => {
        a.href = "https://api.whatsapp.com/send?phone=" + PHONE + "&text=" + encodeURIComponent(msg);
        attach(a);
      });
      document.querySelectorAll<HTMLAnchorElement>('a[href^="mailto:"]').forEach((a) => {
        const href = a.getAttribute("href") || "";
        if (href.toLowerCase().indexOf(INBOX) === -1) return;
        a.href = href.split("?")[0] + "?subject=" + encodeURIComponent("Event enquiry (Ref: " + ref + ")");
        attach(a);
      });
    }
    rewrite();
    const observer = new MutationObserver(rewrite);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      attached.forEach((a) => a.removeEventListener("click", send, true));
    };
  }, []);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative min-h-screen selection:bg-[var(--color-accent)]/30 overflow-hidden">
      <Header />
      <Hero />
      <Stats />
      <TrustedBy />
      <EventTypes />
      <PortfolioInMotion />
      <Portfolio />

      <Approach />
      <Process />



      <Difference />
      <Reviews />



      <Faq />
      <Cta />
      <Footer />
      <FloatingContact />
    </main>
  );
}
