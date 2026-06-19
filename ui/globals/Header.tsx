"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, ArrowUpRight, Menu, X } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Events", href: "#events" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "How it works", href: "#how-it-works" },
    { name: "Why us", href: "#why-us" },
  ];

  return (
    <header
      className={`fixed top-4 left-0 right-0 z-50 flex flex-col items-center px-4 transition-all duration-300 ${isScrolled ? 'translate-y-[-10px] scale-[0.98] opacity-95' : 'translate-y-0 scale-100 opacity-100'}`}
    >
      <div className="flex items-center justify-between w-full max-w-[1400px] bg-[#0B0A0C]/90 backdrop-blur-md border border-white/10 rounded-[1.25rem] px-4 md:px-6 py-3 md:py-4 shadow-2xl relative z-50">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="relative w-32 md:w-44 h-7 md:h-10">
            <Image
              src="/main-logo.png"
              alt="Purrple Orryx Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-white font-sans font-bold text-[10px] xl:text-[11px] tracking-[0.2em] uppercase hover:text-[#E5097F] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 md:gap-6 xl:gap-8 shrink-0">
          <Link
            href="mailto:info@purrpleorryx.com"
            className="hidden md:flex items-center gap-2 text-white hover:text-[#E5097F] transition-colors group"
          >
            <Mail className="w-4 h-4 xl:w-5 xl:h-5 transition-transform group-hover:-translate-y-0.5" />
            <span className="font-sans font-bold text-[10px] xl:text-[11px] tracking-widest uppercase mt-0.5">
              Email
            </span>
          </Link>

          <Link
            href="https://wa.me/971551035775"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 md:gap-2 bg-gradient-to-r from-[#E5097F] to-[#7B2481] px-4 py-2.5 md:px-5 md:py-3 xl:px-7 xl:py-3.5 rounded-[0.75rem] hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(229,9,127,0.3)]"
          >
            <span className="text-white font-sans font-black text-[9px] md:text-[10px] xl:text-[11px] tracking-[0.2em] uppercase mt-0.5">
              WhatsApp
            </span>
            <ArrowUpRight className="w-3 h-3 md:w-3.5 md:h-3.5 text-white transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={3} />
          </Link>

          {/* Hamburger Toggle (Mobile) */}
          <button
            className="lg:hidden text-white hover:text-[#E5097F] transition-colors ml-1 p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`absolute top-[calc(100%+10px)] w-[calc(100%-2rem)] max-w-[1400px] bg-[#0B0A0C]/95 backdrop-blur-xl border border-white/10 rounded-[1.25rem] p-6 shadow-2xl transition-all duration-300 lg:hidden origin-top z-40 ${isMobileMenuOpen ? 'scale-y-100 opacity-100 pointer-events-auto' : 'scale-y-0 opacity-0 pointer-events-none'
          }`}
      >
        <nav className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white font-sans font-bold text-xs tracking-[0.2em] uppercase hover:text-[#E5097F] transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="w-full h-px bg-white/10 my-2"></div>
          <Link
            href="mailto:info@purrpleorryx.com"
            className="flex items-center gap-3 text-white hover:text-[#E5097F] transition-colors group"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Mail className="w-5 h-5" />
            <span className="font-sans font-bold text-xs tracking-widest uppercase mt-0.5">
              Email Us
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
