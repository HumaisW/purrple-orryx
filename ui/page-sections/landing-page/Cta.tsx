"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import ActionButtons from "@/ui/globals/ActionButtons";
import SocialLinks from "@/ui/globals/SocialLinks";

const bgImages = [
  "/landing page - PO/DSC05559.jpg",
  "/landing page - PO/DSC09999.jpg",
  "/landing page - PO/File 6676.jpg",
  "/landing page - PO/File 6983.jpg",
  "/landing page - PO/HA104215.jpg",
];

export default function Cta() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bgImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full py-32 md:py-48 overflow-hidden">
      {/* Background Image Carousel with Heavy Overlay */}
      <div className="absolute inset-0 z-0">
        {bgImages.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImage ? "opacity-100" : "opacity-0"
              }`}
          >
            <Image
              src={src}
              alt={`Event Background ${index + 1}`}
              fill
              className="object-cover opacity-100 md:opacity-100 mix-blend-luminosity"
              sizes="100vw"
              priority={index === 0}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0A0C] via-[#0B0A0C]/80 to-[#0B0A0C]"></div>
        {/* Subtle color cast */}
        <div className="absolute inset-0 bg-[#E5097F]/5 pointer-events-none mix-blend-screen"></div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">

        {/* Eyebrow */}
        <div className="mb-8">
          <span className="text-[#8997B8] font-sans font-bold text-[10px] md:text-[11px] tracking-[0.25em] uppercase">
            Your next event starts with one message
          </span>
        </div>

        {/* Massive Headline */}
        <h2 className="text-[2.5rem] sm:text-[3rem] md:text-[4rem] lg:text-[4.5rem] xl:text-[5.5rem] font-sans font-black tracking-tighter uppercase leading-[0.85] text-white mb-10 drop-shadow-2xl">
          <span className="block">Let's create</span>
          <span className="block">something</span>
          <span className="block">
            <span className="text-white">The </span>
            <span className="text-[#E5097F]">room</span>
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#E5097F] via-[#E4A2C4] to-[#7BA2D5] pb-2">
            remembers.
          </span>
        </h2>

        {/* Description */}
        <p className="text-white/60 font-sans text-base md:text-xl leading-relaxed max-w-2xl mb-14 drop-shadow-lg">
          Share your vision today. Our team will take it from the first conversation to a clear, tailored proposal.
        </p>

        {/* Action Buttons */}
        <ActionButtons className="mb-8" />
        
        {/* Social Links */}
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 mb-20">
          <span className="text-white/60 font-sans font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase">Follow us</span>
          <div className="w-8 h-[1px] bg-white/20 hidden sm:block"></div>
          <SocialLinks iconClassName="w-5 h-5 text-white" linkClassName="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[#E5097F] transition-colors" />
        </div>

        {/* Bottom Status */}
        <div className="flex items-center gap-3 bg-black/20 inline-flex px-4 py-2 rounded-full border border-white/5 backdrop-blur-sm">
          <div className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2DCD7A]"></span>
          </div>
          <span className="text-white/40 font-sans font-bold text-[8px] md:text-[9px] tracking-[0.2em] uppercase mt-px">
            Automated acknowledgement in under 5 seconds
          </span>
        </div>

      </div>
    </section>
  );
}
