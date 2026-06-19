"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Elegant Text Reveal
      gsap.utils.toArray<HTMLElement>(".desc-reveal").forEach((elem) => {
        gsap.fromTo(elem,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.5, ease: "power4.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Number Counter Animation
      gsap.utils.toArray<HTMLElement>(".stat-number").forEach((el) => {
        const target = parseInt(el.getAttribute("data-target") || "0", 10);
        gsap.to(el, {
          innerHTML: target,
          duration: 2.5,
          ease: "power3.out",
          snap: { innerHTML: 1 },
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-white py-12 md:py-20 px-4 md:px-8 lg:px-16 overflow-hidden relative z-10 border-t border-gray-100">
      <div ref={containerRef} className="max-w-[1200px] mx-auto w-full relative z-10">

        {/* 3-Column Stats Grid */}
        <div className="w-full flex flex-col md:grid md:grid-cols-3 gap-0 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-200">

          <div className="desc-reveal flex flex-col items-center text-center group py-8 md:py-0 first:pt-0 last:pb-0">
            <div className="mb-3 flex items-start transition-transform duration-500 ease-out group-hover:-translate-y-1">
              <span className="stat-number text-[3.5rem] md:text-[4rem] lg:text-[4.5rem] font-sans font-black leading-none tracking-tighter text-[#7B2481] pr-2" data-target="13">0</span>
              <span className="text-[1.5rem] lg:text-[2rem] text-[#7B2481] font-sans font-black mt-1">+</span>
            </div>
            <div className="text-[10px] md:text-xs text-[#E5097F] font-sans font-bold uppercase tracking-[0.2em] max-w-[200px] leading-relaxed">
              Years producing<br/>corporate events
            </div>
          </div>

          <div className="desc-reveal flex flex-col items-center text-center group py-8 md:py-0 first:pt-0 last:pb-0">
            <div className="mb-3 flex items-start transition-transform duration-500 ease-out group-hover:-translate-y-1">
              <span className="stat-number text-[3.5rem] md:text-[4rem] lg:text-[4.5rem] font-sans font-black leading-none tracking-tighter text-[#7B2481] pr-2" data-target="100">0</span>
              <span className="text-[1.5rem] lg:text-[2rem] text-[#7B2481] font-sans font-black mt-1">+</span>
            </div>
            <div className="text-[10px] md:text-xs text-[#E5097F] font-sans font-bold uppercase tracking-[0.2em] max-w-[200px] leading-relaxed">
              Projects<br/>Delivered
            </div>
          </div>

          <div className="desc-reveal flex flex-col items-center text-center group py-8 md:py-0 first:pt-0 last:pb-0">
            <div className="mb-3 flex items-start transition-transform duration-500 ease-out group-hover:-translate-y-1">
              <span className="stat-number text-[3.5rem] md:text-[4rem] lg:text-[4.5rem] font-sans font-black leading-none tracking-tighter text-[#7B2481] pr-2" data-target="1">0</span>
            </div>
            <div className="text-[10px] md:text-xs text-[#E5097F] font-sans font-bold uppercase tracking-[0.2em] max-w-[200px] leading-relaxed">
              Point of contact<br/>from brief to load-out
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
