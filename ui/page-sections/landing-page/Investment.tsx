"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function Investment() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      if (!sectionRef.current || !scrollWrapperRef.current) return;

      // DESKTOP: Cinematic Horizontal Parallax
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            start: "top top",
            end: "+=4000", // Smooth scroll duration
            scrub: 1,
          }
        });

        // 1. Move the entire container left by 300vw
        tl.to(scrollWrapperRef.current, {
          x: "-300vw",
          ease: "none"
        }, 0);

        // 2. Parallax Background Images (Move RIGHT inside their over-sized masks)
        // Subtler parallax distance to prevent chaotic movement
        gsap.utils.toArray(".parallax-img").forEach((img: any) => {
          tl.fromTo(img, 
            { x: "-5vw" }, 
            { x: "5vw", ease: "none" }, 
            0
          );
        });

        // 3. Parallax Text (Move LEFT slightly to create a floating depth effect)
        gsap.utils.toArray(".parallax-text").forEach((txt: any) => {
          tl.fromTo(txt, 
            { x: "5vw" }, 
            { x: "-5vw", ease: "none" }, 
            0
          );
        });

        // 4. Parallax Decorative Rings
        tl.fromTo(".parallax-ring", { x: "20vw" }, { x: "-20vw", ease: "none" }, 0);
        tl.fromTo(".parallax-ring-slow", { x: "10vw" }, { x: "-10vw", ease: "none" }, 0);

        // 5. Massive Background Typography Parallax
        tl.fromTo(".bg-text-parallax", { x: "30vw" }, { x: "-80vw", ease: "none" }, 0);
      });

      // MOBILE: Vertical Stacking with Fade Ups
      mm.add("(max-width: 1023px)", () => {
        gsap.set(scrollWrapperRef.current, { x: 0 });
        gsap.set(".parallax-img", { x: 0 });
        gsap.set(".parallax-text", { x: 0 });

        gsap.utils.toArray(".mobile-fade").forEach((el: any) => {
          gsap.fromTo(el, 
            { opacity: 0, y: 40 },
            { 
              opacity: 1, y: 0, duration: 1, ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
              }
            }
          );
        });
      });

    }, sectionRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    // Fixed Background: Changed to white so it flows with the new premium editorial theme
    <section ref={sectionRef} className="relative w-full bg-white text-[var(--color-primary)] overflow-hidden lg:h-screen">
      
      {/* Massive Background Parallax Text (Desktop) */}
      <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 left-0 w-[400vw] h-full pointer-events-none items-center z-0 bg-text-parallax">
        <span className="text-[30vw] font-sans font-bold text-[var(--color-primary)]/[0.02] tracking-tighter whitespace-nowrap select-none">
          MULTIPLIER PIPELINE ROI ENGAGEMENT
        </span>
      </div>

      {/* Container switches from vertical stack to horizontal track */}
      <div 
        ref={scrollWrapperRef} 
        className="flex flex-col lg:flex-row w-full lg:w-[400vw] h-full relative z-10"
      >
        
        {/* PANEL 1: Intro */}
        <div className="w-full lg:w-screen h-screen flex flex-col justify-center px-6 md:px-12 lg:px-[10vw] shrink-0 relative mobile-fade py-24 lg:py-0">
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="w-12 h-[2px] bg-[var(--color-accent)]"></div>
            <span className="text-[var(--color-primary)]/50 font-sans font-bold tracking-[0.2em] uppercase text-xs md:text-sm">
              Investment, Not Expense
            </span>
          </div>
          <h2 className="text-[2.5rem] sm:text-[3rem] md:text-[4rem] lg:text-[4.5rem] xl:text-[5.5rem] font-sans font-thin uppercase tracking-tighter leading-[0.9] text-[var(--color-primary)]">
            An event isn't a <br/>
            <span className="font-serif italic font-light text-[var(--color-primary)]/40 lowercase">line item.</span> <br/>
            <span className="font-bold text-[var(--color-accent)]">It's a multiplier.</span>
          </h2>
        </div>

        {/* PANEL 2: The Expense */}
        <div className="w-full lg:w-screen h-screen flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-[5vw] px-6 md:px-12 lg:px-[10vw] shrink-0 relative py-24 lg:py-0">
          <div className="w-full lg:w-[45vw] h-[40vh] lg:h-[60vh] relative overflow-hidden rounded-[2rem] lg:rounded-tr-[6rem] lg:rounded-bl-[6rem] mobile-fade shadow-[0_30px_60px_rgba(44,26,77,0.1)] border-4 border-white group">
            {/* Safe Wrapper: Explicitly wider than the mask, starts off-center, guaranteeing edges never show */}
            <div className="absolute top-0 bottom-0 left-[-10vw] w-[calc(100%+20vw)] parallax-img">
              <Image 
                src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2000" 
                alt="The Expense"
                fill 
                className="object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-[var(--color-primary)]/10 mix-blend-overlay z-10 pointer-events-none"></div>
            </div>
          </div>
          <div className="w-full lg:w-[35vw] parallax-text mobile-fade pl-4 lg:pl-0 border-l-4 lg:border-l-0 border-[var(--color-accent)]/30">
            <div className="text-[var(--color-accent)] font-mono font-bold text-lg mb-4 lg:mb-6 tracking-widest uppercase">01 — The Expense</div>
            <h3 className="text-5xl lg:text-7xl font-sans font-bold uppercase tracking-tighter text-[var(--color-primary)] mb-4 lg:mb-6">The Photo Op.</h3>
            <p className="text-xl lg:text-2xl text-[var(--color-primary)]/70 font-light leading-relaxed">
              Done wrong, it's a six- or seven-figure photo opportunity. We've been on both sides of that line, and we know which decisions make the difference.
            </p>
          </div>
        </div>

        {/* PANEL 3: The Investment */}
        <div className="w-full lg:w-screen h-screen flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-[5vw] px-6 md:px-12 lg:px-[10vw] shrink-0 relative py-24 lg:py-0">
          <div className="w-full lg:w-[35vw] parallax-text order-2 lg:order-1 mobile-fade pl-4 lg:pl-0 border-l-4 lg:border-l-0 border-[var(--color-accent)]/30">
            <div className="text-[var(--color-accent)] font-mono font-bold text-lg mb-4 lg:mb-6 tracking-widest uppercase">02 — The Investment</div>
            <h3 className="text-5xl lg:text-7xl font-sans font-bold uppercase tracking-tighter text-[var(--color-primary)] mb-4 lg:mb-6">The Pipeline.</h3>
            <p className="text-xl lg:text-2xl text-[var(--color-primary)]/70 font-light leading-relaxed">
              Done right, a corporate event compounds: it accelerates a sales cycle, lands a launch in the press, hardens a culture, or closes a recruiting gap. That's pipeline.
            </p>
          </div>
          <div className="w-full lg:w-[45vw] h-[40vh] lg:h-[60vh] relative overflow-hidden rounded-[2rem] lg:rounded-tl-[6rem] lg:rounded-br-[6rem] order-1 lg:order-2 mobile-fade shadow-[0_30px_60px_rgba(236,72,153,0.15)] border-4 border-white group">
            {/* Safe Wrapper */}
            <div className="absolute top-0 bottom-0 left-[-10vw] w-[calc(100%+20vw)] parallax-img">
              <Image 
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=2000" 
                alt="The Investment"
                fill 
                className="object-cover transition-all duration-1000 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)]/20 to-transparent z-10 pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* PANEL 4: The Return */}
        <div className="w-full lg:w-screen h-screen flex flex-col justify-center items-center text-center px-6 md:px-12 lg:px-[10vw] shrink-0 relative py-24 lg:py-0 overflow-hidden">
          <h2 className="text-[2.5rem] sm:text-[3rem] md:text-[4rem] lg:text-[4.5rem] xl:text-[5.5rem] font-serif italic font-light text-[var(--color-primary)]/60 leading-[1.1] tracking-tighter z-10 parallax-text mobile-fade">
            "We don't just plan the event.<br/>
            <span className="text-[var(--color-primary)] font-sans font-bold uppercase not-italic block mt-4 lg:mt-6 transition-colors duration-500 hover:text-[var(--color-accent)]">We plan the return on it."</span>
          </h2>
          
          {/* Abstract floating rings behind the text (Desktop only) */}
          <div className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none z-0">
            <div className="w-[60vh] h-[60vh] border-2 border-[var(--color-accent)]/10 rounded-full parallax-ring absolute shadow-[0_0_100px_rgba(236,72,153,0.1)]"></div>
            <div className="w-[80vh] h-[80vh] border border-[var(--color-primary)]/5 rounded-full parallax-ring-slow absolute"></div>
            <div className="w-[100vh] h-[100vh] border border-[var(--color-primary)]/5 rounded-full parallax-ring absolute"></div>
          </div>
        </div>

      </div>
    </section>
  );
}
