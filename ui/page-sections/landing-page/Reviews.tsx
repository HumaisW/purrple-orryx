"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ActionButtons from "@/ui/globals/ActionButtons";

const reviews = [
  {
    quote: "The team understood the brief quickly, stayed calm under pressure and delivered the experience exactly as promised.",
    role: "CORPORATE MARKETING LEAD",
    location: "Annual event - Dubai"
  },
  {
    quote: "From stage and AV to show flow and guest experience, everything felt coordinated through one capable team.",
    role: "REGIONAL EVENT STAKEHOLDER",
    location: "Conference - UAE"
  },
  {
    quote: "The final event looked premium, ran smoothly and gave our internal team confidence throughout the process.",
    role: "BRAND MANAGER",
    location: "Launch event - GCC"
  }
];

export default function Reviews() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // 1. Text Reveal Animation
      gsap.fromTo(".review-header-reveal",
        { opacity: 0, y: 80, rotateX: -20 },
        {
          opacity: 1, y: 0, rotateX: 0, duration: 1.2, stagger: 0.15, ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );

      // 2. Continuous Shimmer Gradient on the Header
      gsap.to(".gradient-text", {
        backgroundPosition: "200% center",
        duration: 8,
        repeat: -1,
        ease: "linear",
      });

      // 3. Staggered Cards Entrance with scale and 3D tilt
      gsap.fromTo(".review-card",
        { opacity: 0, y: 100, scale: 0.9, rotateX: -15 },
        {
          opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 1.5, stagger: 0.2, ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".reviews-grid",
            start: "top 85%",
          }
        }
      );

      // 4. Parallax Background Glow
      gsap.to(".bg-glow", {
        y: 300,
        x: 100,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 3D Magnetic Hover Effect for Cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate tilt (max 15 degrees)
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      duration: 0.4,
      rotateX,
      rotateY,
      transformPerspective: 1000,
      ease: "power2.out",
      boxShadow: `${-rotateY * 2}px ${rotateX * 2 + 30}px 50px rgba(229,9,127,0.15)`,
      borderColor: "rgba(229,9,127,0.3)"
    });
  };

  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      duration: 1,
      rotateX: 0,
      rotateY: 0,
      ease: "elastic.out(1, 0.3)",
      boxShadow: "0 10px 40px rgba(0,0,0,0)",
      borderColor: "rgba(255,255,255,0.1)"
    });
  };

  return (
    <section ref={containerRef} className="relative w-full bg-[#0B0A0C] py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden [perspective:1000px]">
      
      {/* Background Subtle Glow */}
      <div className="bg-glow absolute top-0 -left-32 w-[50vw] h-[50vw] bg-[#E5097F]/15 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
      <div className="bg-glow absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-[#7BA2D5]/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" style={{ animationDelay: '-2s' }}></div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* Header Grid */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
          <div className="flex flex-col">
            <span className="review-header-reveal text-[#8997B8] font-sans font-bold text-[10px] md:text-xs tracking-[0.3em] uppercase mb-6 md:mb-8 flex items-center gap-3">
              <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#E5097F]"></div>
              <span className="text-[#E5097F] drop-shadow-[0_0_8px_rgba(229,9,127,0.5)]">CLIENT</span> VOICES
            </span>
            <h2 className="text-[2.5rem] sm:text-[3rem] md:text-[4rem] lg:text-[3.5rem] xl:text-[4.5rem] font-sans font-black tracking-tighter uppercase leading-[0.85] text-white">
              <span className="review-header-reveal block">Trusted when</span>
              <span className="review-header-reveal block">the room</span>
              <span className="review-header-reveal block gradient-text text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A9A] via-[#80AED6] to-[#FF7A9A] bg-[length:200%_auto]">
                has to be right.
              </span>
            </h2>
          </div>
          <div className="lg:w-1/4 pb-4 md:pb-8 review-header-reveal">
            <div className="pl-6 border-l border-[#E5097F]/30">
              <p className="text-white/40 font-sans text-xs md:text-sm leading-relaxed max-w-xs">
                We measure our success by the confidence we give our clients. Discover what industry leaders have to say about our execution.
              </p>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="reviews-grid grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 [transform-style:preserve-3d]">
          {reviews.map((review, i) => (
            <div 
              key={i} 
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => handleMouseLeave(i)}
              className="review-card flex flex-col justify-between bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 md:p-10 lg:p-12 transition-colors duration-500 cursor-crosshair relative overflow-hidden group"
            >
              {/* Internal Card Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#E5097F]/0 to-[#E5097F]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 mix-blend-overlay"></div>

              <div className="mb-16 relative z-10">
                <span className="text-[#E5097F] font-serif text-5xl leading-none font-bold block mb-8 drop-shadow-[0_0_15px_rgba(229,9,127,0.5)] transform transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-[-10deg]">“</span>
                <p className="text-white/90 font-sans text-lg md:text-xl leading-relaxed font-light transition-colors duration-500 group-hover:text-white">
                  {review.quote}
                </p>
              </div>
              <div className="flex flex-col mt-auto pt-6 border-t border-white/5 relative z-10 transition-colors duration-500 group-hover:border-white/20">
                <span className="text-white font-sans font-bold text-[10px] tracking-widest uppercase mb-2">
                  {review.role}
                </span>
                <span className="text-white/40 font-sans text-xs">
                  {review.location}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex justify-center mt-16 md:mt-24 relative z-20">
          <ActionButtons />
        </div>

      </div>
    </section>
  );
}
