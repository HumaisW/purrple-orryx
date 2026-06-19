"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ActionButtons from "@/ui/globals/ActionButtons";
import SocialLinks from "@/ui/globals/SocialLinks";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const images = [
    "/hero/0034.jpg",
    "/hero/0320.jpg",
    "/hero/20191128_214033.jpg",
    "/hero/20220221_202606 (1).jpg",
    "/hero/2U7A9389 (2).jpg",
    "/hero/DSC09999.jpg",
    "/hero/DSC_1409 (2).jpg",
    "/hero/DSC_2864.JPG",
    "/hero/File 6803.jpg",
    "/hero/HAM_1103.jpg",
    "/hero/IBN_4949.jpg",
    "/hero/IMGL4047.jpg",
    "/hero/IMG_20230118_181054.jpg",
    "/hero/IMG_20230118_183141.jpg",
    "/hero/IMG_20250705_190932.jpg",
    "/hero/WhatsApp Image 2026-06-19 at 12.02.57 AM.jpeg",
    "/hero/WhatsApp Image 2026-06-19 at 12.03.00 AM.jpeg",
    "/hero/WhatsApp Image 2026-06-19 at 12.03.03 AM.jpeg",
    "/hero/WhatsApp Image 2026-06-19 at 12.03.04 AM.jpeg"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 6000); // 6 seconds per slide

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 1. Entrance Animation for Slideshow Background (Simplified for performance)
      tl.fromTo(
        ".slideshow-container",
        { scale: 1.1 },
        { scale: 1.05, duration: 3, ease: "power2.out" }
      )

        // 2. 3D Typography Entrance
        .fromTo(
          ".title-line-1",
          { y: "120%", opacity: 0, rotationX: -60, transformOrigin: "bottom center" },
          { y: "0%", opacity: 1, rotationX: 0, duration: 1.5, stagger: 0.1 },
          "-=3"
        )
        .fromTo(
          ".title-line-2",
          { y: "120%", opacity: 0, rotationX: -60, transformOrigin: "bottom center" },
          { y: "0%", opacity: 1, rotationX: 0, duration: 1.5, stagger: 0.1 },
          "-=2.7"
        )
        .fromTo(
          ".title-line-3",
          { y: "120%", opacity: 0, rotationX: -60, scale: 0.9, transformOrigin: "bottom center" },
          { y: "0%", opacity: 1, rotationX: 0, scale: 1, duration: 2, ease: "elastic.out(1, 0.7)" },
          "-=2.5"
        )

        // 3. Fades and Logo
        .fromTo(
          logoRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 0.15, duration: 2, ease: "power3.out" },
          "-=3"
        )
        .fromTo(
          ".fade-in-element",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.5, stagger: 0.2 },
          "-=2"
        );

      // 4. Infinite Slideshow Slow Pan (Parallax)
      gsap.to(".slideshow-container", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // Note: Heavy Mouse Parallax animation removed by request.
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[100svh] md:h-[100svh] bg-[#020202] overflow-hidden text-white flex flex-col items-center justify-center"
    >
      {/* Slideshow Background Layer */}
      <div className="slideshow-container absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#020202] will-change-transform">
        {images.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 w-full h-full transition-opacity duration-[2500ms] ease-in-out ${index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
          >
            <Image
              src={src}
              alt={`Slideshow image ${index + 1}`}
              fill
              className={`object-cover transition-transform duration-[10000ms] ease-out ${index === currentImageIndex ? "scale-110" : "scale-100"
                }`}
              priority={index === 0}
            />
          </div>
        ))}

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-[#050505] z-10"></div>
        <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.9)] z-10"></div>
      </div>

      {/* Noise Overlay */}
      <div className="absolute inset-0 pointer-events-none z-[2] opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}></div>

      {/* Central Logo Watermark */}
      <div className="absolute inset-0 flex items-center justify-center z-[2] pointer-events-none">
        <div ref={logoRef} className="relative w-64 h-64 md:w-96 md:h-96" style={{ transformStyle: "preserve-3d" }}>
          <Image
            src="/main-logo.png"
            alt="Oryx Emblem"
            fill
            className="object-contain brightness-0 invert opacity-20"
            priority
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-20 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col justify-center h-full pt-32 pb-24 md:py-0">

        {/* Main Text Content */}
        <div className="flex flex-col items-start text-left w-full max-w-5xl mt-12">

          {/* Eyebrow Text */}
          <div className="overflow-hidden mb-6 flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#E5097F] shadow-[0_0_10px_#E5097F]"></span>
            <p className="fade-in-element font-mono text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase text-white/80 drop-shadow-md">
              CORPORATE EVENT MANAGEMENT & PRODUCTION • DUBAI & GCC
            </p>
          </div>

          {/* Heading Lines */}
          <div className="flex flex-col gap-1 md:gap-0">
            <div className="overflow-hidden">
              <h1 className="title-line-1 text-[11vw] md:text-[8vw] lg:text-[7vw] xl:text-[6.5vw] font-sans font-black uppercase tracking-tight leading-[0.9] text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                YOUR EVENT
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1 className="title-line-2 text-[11vw] md:text-[8vw] lg:text-[7vw] xl:text-[6.5vw] font-sans font-black uppercase tracking-tight leading-[0.9] text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                ISN'T A COST.
              </h1>
            </div>
            <div className="overflow-hidden pb-4">
              <h1 className="title-line-3 text-[11vw] md:text-[8vw] lg:text-[7vw] xl:text-[6.5vw] font-sans font-black uppercase tracking-tight leading-[0.9] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <span className="text-white">IT'S AN </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5097F] via-[#9B2C8B] to-[#4A72B8]">INVESTMENT.</span>
              </h1>
            </div>
          </div>

          {/* Paragraph Text */}
          <div className="mt-6 overflow-hidden max-w-[650px]">
            <p className="fade-in-element text-sm md:text-lg lg:text-xl text-white/80 leading-relaxed drop-shadow-md font-medium">
              We work as your strategic partner, not a vendor.<br className="hidden md:block" />
              Senior-led discovery, in-house production, end-to-end delivery<br className="hidden md:block" />
              across the UAE, KSA and the wider GCC.
            </p>
          </div>
        </div>

        {/* Vertical Side Text */}
        <div className="hidden xl:flex absolute right-12 top-1/2 -translate-y-1/2 flex-col items-center justify-center fade-in-element">
          <div className="[writing-mode:vertical-rl] flex items-center gap-6 text-[10px] tracking-[0.4em] uppercase text-white/50 font-sans font-semibold">
            <span>DUBAI-BASED</span>
            <span className="text-[6px] opacity-50">•</span>
            <span>SINCE 2013</span>
            <span className="text-[6px] opacity-50">•</span>
            <span>UAE & GCC DELIVERY</span>
          </div>
        </div>

        {/* Bottom Left Social Links */}
        <div className="hidden md:flex absolute bottom-12 left-12 lg:left-24 z-20 fade-in-element">
          <SocialLinks iconClassName="w-5 h-5 text-white" linkClassName="opacity-40 hover:opacity-100 hover:text-white transition-all hover:scale-110" />
        </div>

        {/* Bottom Right CTAs - Flow on mobile, Absolute on desktop */}
        <div className="mt-12 md:mt-0 md:absolute md:bottom-12 md:right-12 lg:right-24 z-20 flex flex-col items-start md:items-end gap-3 fade-in-element w-full md:w-auto">
          <ActionButtons className="w-full md:w-auto" />
          <div className="flex items-center gap-2 mt-2 md:mt-1 md:mr-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></span>
            <p className="text-[9px] md:text-[10px] text-white/50 uppercase tracking-[0.1em] font-sans font-semibold">Automated acknowledgement in under 5 seconds</p>
          </div>
          <div className="flex md:hidden items-center mt-6">
            <SocialLinks iconClassName="w-5 h-5 text-white" linkClassName="opacity-40 hover:opacity-100 hover:text-white transition-all hover:scale-110" />
          </div>
        </div>

      </div>

    </section>
  );
}
