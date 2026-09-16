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
  const attributionInitialized = useRef(false);

  useEffect(() => {
    // Run after hydration, once per page mount (including React Strict Mode).
    if (attributionInitialized.current) return;
    attributionInitialized.current = true;

    const PHONE = "97148842588";
    const ENDPOINT = "https://prrowess.app.n8n.cloud/webhook/po-click-ref";
    const KEY = "po_click_ref";
    const q = new URLSearchParams(window.location.search);

    function rand(n: number) {
      const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
      const bytes = new Uint8Array(n);
      window.crypto.getRandomValues(bytes);
      return Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("");
    }

    const gclid = q.get("gclid") || q.get("gbraid") || q.get("wbraid");
    let ref: string | null = null;
    try {
      ref = window.sessionStorage.getItem(KEY);
    } catch {
      // Contact links still work when browser storage is unavailable.
    }

    if (gclid || !ref) {
      ref = "PO-" + (gclid ? "G" : "O") + "-" + rand(6);
      try {
        window.sessionStorage.setItem(KEY, ref);
      } catch {
        // Keep this page's reference in memory if storage is blocked.
      }
      void fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ref,
          gclid: gclid || "",
          utm_campaign: q.get("utm_campaign") || "",
          utm_term: q.get("utm_term") || "",
          landing_page: window.location.pathname,
        }),
        keepalive: true,
      }).catch(() => {});
    }

    const msg = "Hi Purrple Orryx, I'd like to discuss a corporate event. (Ref: " + ref + ")";
    document.querySelectorAll<HTMLAnchorElement>('a[href*="wa.me"], a[href*="api.whatsapp.com"]').forEach((a) => {
      a.href = "https://api.whatsapp.com/send?phone=" + PHONE + "&text=" + encodeURIComponent(msg);
    });
    document.querySelectorAll<HTMLAnchorElement>('a[href^="mailto:"]').forEach((a) => {
      a.href = a.getAttribute("href")!.split("?")[0] +
        "?subject=" + encodeURIComponent("Event enquiry (Ref: " + ref + ")");
    });
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
