"use client";

import { useEffect } from "react";
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
