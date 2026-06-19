"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const clients = [
  "Talabat", "LG", "Hapag-Lloyd", "Hilti", "Nespresso", "YouTube", "Four Seasons",
  "Fairmont", "Pharmax", "Air Liquide", "Amazon", "Sony", "Cummins", "Atlantis Dubai"
];

export default function TrustedBy() {
  const containerRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Create infinitely repeating timeline for the marquee
      const tl = gsap.timeline({ repeat: -1 });
      tl.to(marqueeRef.current, { x: "-50%", ease: "none", duration: 60 });

      // Link marquee speed to scroll velocity
      let speedProxy = { value: 1 };
      
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          // Increase timeScale based on scroll velocity
          const velocity = Math.abs(self.getVelocity()) / 300;
          const targetTimeScale = 1 + velocity;
          
          gsap.to(speedProxy, {
            value: targetTimeScale,
            duration: 0.2,
            onUpdate: () => {
              tl.timeScale(speedProxy.value);
            },
            overwrite: true
          });

          // Return to normal speed after scrolling stops
          gsap.to(speedProxy, {
            value: 1,
            duration: 1,
            delay: 0.2,
            onUpdate: () => {
              tl.timeScale(speedProxy.value);
            },
            overwrite: true
          });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-12 md:py-16 bg-[#E5097F] text-white overflow-hidden border-t border-b border-[#E5097F]/20 flex flex-col items-center"
    >
      {/* Catchy Heading */}
      <div className="w-full text-center mb-8 md:mb-12 relative z-20 px-4">
        <h3 className="text-white/90 font-sans font-bold text-xs md:text-sm tracking-[0.4em] uppercase drop-shadow-md">
          Trusted by the world's most ambitious brands
        </h3>
      </div>

      <div className="relative flex flex-col justify-center w-[200vw] lg:w-[150vw] select-none z-10">
        {/* Gradients to fade edges for a seamless look */}
        <div className="absolute top-0 left-0 w-[20vw] h-full bg-gradient-to-r from-[#E5097F] to-transparent z-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[20vw] h-full bg-gradient-to-l from-[#E5097F] to-transparent z-20 pointer-events-none"></div>

        {/* Single Row Marquee */}
        <div ref={marqueeRef} className="flex items-center w-max">
          {[...clients, ...clients, ...clients, ...clients].map((client, idx) => (
            <div key={idx} className="flex items-center gap-4 md:gap-8 px-4 md:px-8 group">
              <span className="font-sans font-bold text-lg md:text-2xl lg:text-3xl tracking-tighter text-white uppercase whitespace-nowrap">
                {client}
              </span>
              <span className="text-sm md:text-lg text-white/50">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
