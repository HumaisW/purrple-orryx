"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, Lightbulb, Settings, Hammer, MonitorSpeaker, Mic2, Rocket } from "lucide-react";

const services = [
  { name: "Strategy", icon: <Target className="w-6 h-6 md:w-8 md:h-8" />, col: "md:col-span-2", row: "md:row-span-1", bgImage: "/approach/approach_strategy_1781731077919.png" },
  { name: "Creative", icon: <Lightbulb className="w-6 h-6 md:w-8 md:h-8" />, col: "md:col-span-1", row: "md:row-span-1", bgImage: "/approach/approach_creative_1781731089649.png" },
  { name: "Production", icon: <Settings className="w-6 h-6 md:w-8 md:h-8" />, col: "md:col-span-1", row: "md:row-span-2", bgImage: "/approach/approach_production_1781731102174.png" },
  { name: "Stage", icon: <Hammer className="w-6 h-6 md:w-8 md:h-8" />, col: "md:col-span-1", row: "md:row-span-1", bgImage: "/approach/approach_stage_1781731112262.png" },
  { name: "AV & lighting", icon: <MonitorSpeaker className="w-6 h-6 md:w-8 md:h-8" />, col: "md:col-span-2", row: "md:row-span-1", bgImage: "/approach/approach_av_1781731123931.png" },
  { name: "Entertainment", icon: <Mic2 className="w-6 h-6 md:w-8 md:h-8" />, col: "md:col-span-1", row: "md:row-span-1", bgImage: "/approach/approach_entertainment_1781731135668.png" },
  { name: "Live delivery", icon: <Rocket className="w-6 h-6 md:w-8 md:h-8" />, col: "md:col-span-3", row: "md:row-span-1", bgImage: "/approach/approach_delivery_1781731147836.png" },
];

export default function Approach() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Fade in header content
      gsap.fromTo(".approach-reveal", 
        { y: 30, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Stagger in the bento boxes with a subtle scale and 3D tilt
      gsap.fromTo(".service-bento",
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".bento-grid",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-[#020202] text-white py-24 md:py-32 overflow-hidden border-t border-white/5">
      
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image 
          src="/event types/corporatecelebrations.jpg"
          alt="Event Background"
          fill
          className="object-cover opacity-50"
        />
        {/* Heavy dark gradient overlay to ensure text and bento legibility */}
        <div className="absolute inset-0 bg-[#020202]/80"></div>
        
        {/* Subtle Glows */}
        <div className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] bg-[#E5097F]/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[20%] w-[30vw] h-[30vw] bg-[#7B2481]/15 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12">
        
        {/* Centered Header Section */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <div className="approach-reveal inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <div className="w-2 h-2 rounded-full bg-[#E5097F] animate-pulse"></div>
            <span className="text-white/80 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
              One accountable partner
            </span>
          </div>
          
          <h2 className="approach-reveal text-[2.5rem] sm:text-[3rem] md:text-[4rem] lg:text-[4.5rem] xl:text-[5.5rem] font-sans font-black leading-[1] tracking-tighter uppercase mb-8 drop-shadow-lg">
            One brief in. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5097F] to-[#7B2481]">One finished event out.</span>
          </h2>
          
          <p className="approach-reveal text-gray-400 font-sans font-medium text-base md:text-lg leading-relaxed max-w-2xl">
            We connect strategy, creative and production so your team is not chasing multiple suppliers, separate timelines or fragmented decisions.
          </p>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="bento-grid grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[160px] md:auto-rows-[180px]">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className={`service-bento relative bg-black border border-[#E5097F]/40 rounded-[2rem] p-6 md:p-8 overflow-hidden flex flex-col justify-between ${service.col} ${service.row}`}
            >
              {/* Background AI Image */}
              <div className="absolute inset-0 z-0">
                <Image 
                  src={service.bgImage}
                  alt={service.name}
                  fill
                  className="object-cover opacity-50 scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/80 to-transparent pointer-events-none"></div>
              </div>

              {/* Hover Glow Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#E5097F]/0 to-[#E5097F]/30 opacity-100 pointer-events-none z-0 mix-blend-overlay"></div>
              
              {/* Top Row: Icon & Number */}
              <div className="flex justify-between items-start relative z-10">
                <div className="text-[#E5097F] transform scale-110 rotate-6">
                  {service.icon}
                </div>
                <span className="font-mono text-xs md:text-sm font-bold tracking-widest text-white">
                  0{idx + 1}
                </span>
              </div>

              {/* Bottom Row: Title */}
              <h3 className="relative z-10 text-xl md:text-2xl font-sans font-bold uppercase tracking-widest text-white mt-8 translate-x-2">
                {service.name}
              </h3>
              
              {/* Giant Watermark Number */}
              <span className="absolute -bottom-8 -right-4 text-[8rem] md:text-[10rem] font-sans font-black text-[#E5097F]/[0.05] pointer-events-none select-none leading-none">
                {idx + 1}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-16 md:mt-24 text-center approach-reveal flex justify-center">
          <Link 
            href="#contact" 
            className="group relative inline-flex items-center gap-4 bg-white text-[#020202] hover:bg-[#E5097F] hover:text-white px-8 py-4 md:px-10 md:py-5 rounded-full transition-all duration-500 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] transform hover:-translate-y-1"
          >
            <span className="relative z-10 font-sans font-bold text-xs md:text-sm tracking-widest uppercase">Share your event vision</span>
            <span className="relative z-10 text-base font-black leading-none group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
