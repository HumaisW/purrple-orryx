"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

const cases = [
  {
    category: "GALA & AWARDS",
    title: "Recognition night for a 1,400-person logistics co.",
    details: "Atlantis Dubai · stage build, AV, broadcast, talent",
    image: "/landing page - PO/2U7A1361.jpg"
  },
  {
    category: "CONFERENCE",
    title: "Two-day APAC sales kick-off, end-to-end run.",
    details: "Four Seasons · keynote stage, breakouts, networking, AV",
    image: "/landing page - PO/2U7A1892.jpg"
  },
  {
    category: "FAMILY DAY · TEAM BUILDING",
    title: "Outdoor family day for 2,000+ employees.",
    details: "Open venue · fabrication, F&B coord, kids' zones, entertainment",
    image: "/landing page - PO/DSC00956.jpg"
  }
];

export default function CaseStudies() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Internal Image Parallax
      gsap.utils.toArray<HTMLElement>(".parallax-image").forEach((img) => {
        gsap.fromTo(img,
          { yPercent: -15 },
          {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );
      });

      // 2. Text Reveal
      gsap.utils.toArray<HTMLElement>(".case-text").forEach((textElem) => {
        gsap.fromTo(textElem,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textElem,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-32 md:py-48 bg-white text-[var(--color-primary)] overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">

        {/* Header Block */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-32 md:mb-48 border-t border-[var(--color-primary)]/10 pt-16">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-[var(--color-accent)]"></div>
              <span className="text-[var(--color-primary)]/50 font-sans font-bold tracking-[0.2em] uppercase text-xs md:text-sm">
                SELECTED WORK
              </span>
            </div>
            <h2 className="text-[2.5rem] sm:text-[3rem] md:text-[4rem] lg:text-[4.5rem] xl:text-[5.5rem] font-sans font-bold uppercase tracking-tighter text-[var(--color-primary)] leading-[0.9]">
              Recent <br />
              <span className="italic font-light font-serif text-[var(--color-accent)] lowercase">case studies</span>
            </h2>
          </div>

          <button className="group flex items-center gap-4 px-8 py-4 rounded-full border border-[var(--color-primary)]/20 text-[var(--color-primary)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300 font-sans font-bold uppercase tracking-widest text-sm shadow-sm hover:shadow-[0_10px_30px_rgba(236,72,153,0.3)]">
            View full portfolio
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Case Studies List - Overlapping Editorial Cards */}
        <div className="flex flex-col gap-32 md:gap-48 lg:gap-64">
          {cases.map((study, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                className={`relative flex flex-col ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center`}
              >

                {/* Massive Image Mask */}
                <div className={`w-full lg:w-[75%] aspect-[4/3] md:aspect-[16/9] overflow-hidden relative group rounded-[2rem] lg:rounded-[3rem] shadow-[0_20px_50px_rgba(44,26,77,0.1)] border border-[var(--color-primary)]/5`}>
                  {/* The Parallax Image (larger than container) */}
                  <div className="absolute inset-x-0 -top-[15%] h-[130%]">
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      className="parallax-image object-cover opacity-90 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-100"
                    />
                  </div>
                </div>

                {/* Overlapping Typography Card */}
                <div className={`case-text w-[90%] md:w-[80%] lg:w-[45%] bg-white p-10 md:p-16 rounded-[2rem] shadow-[0_40px_80px_rgba(44,26,77,0.15)] border border-[var(--color-primary)]/5 z-10 -mt-24 lg:mt-0 ${isLeft ? 'lg:-ml-[20%] mx-auto lg:mx-0 lg:mr-auto' : 'lg:-mr-[20%] mx-auto lg:mx-0 lg:ml-auto'}`}>
                  <span className="text-[var(--color-accent)] font-sans font-bold text-xs md:text-sm tracking-[0.2em] uppercase mb-6 block">
                    {study.category}
                  </span>

                  <h3 className="text-3xl md:text-4xl xl:text-5xl font-sans font-bold leading-[1.1] tracking-tighter text-[var(--color-primary)] mb-6 transition-colors duration-300 hover:text-[var(--color-accent)] cursor-pointer">
                    {study.title}
                  </h3>

                  <p className="text-[var(--color-primary)]/70 font-sans text-lg md:text-xl leading-relaxed mb-10 border-l-2 border-[var(--color-accent)]/30 pl-6">
                    {study.details}
                  </p>

                  <a href="#" className="group inline-flex items-center gap-4 text-[var(--color-primary)] font-sans font-bold tracking-widest uppercase text-sm hover:text-[var(--color-accent)] transition-colors">
                    Read the case
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
