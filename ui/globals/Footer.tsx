"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import SocialLinks from "@/ui/globals/SocialLinks";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Reveal footer links
      gsap.fromTo(".footer-link",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          }
        }
      );

      // Subtle parallax on massive text
      if (textRef.current) {
        gsap.fromTo(textRef.current,
          { y: 100 },
          {
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top bottom",
              end: "bottom bottom",
              scrub: true
            }
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative w-full bg-[var(--color-foreground)] text-white pt-24 md:pt-32 pb-8 overflow-hidden rounded-t-[3rem] md:rounded-t-[5rem] -mt-12 z-20 border-t border-white/10">

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-24">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 mb-24">

          {/* Column 1: Info */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white/40 font-sans font-bold text-xs tracking-widest uppercase mb-4">Dubai Office</h4>
            <div className="footer-link flex flex-col gap-2 font-sans text-white/80">
              <p>Dubai Design District (d3)</p>
              <p>Building 4, Office 123</p>
              <p>Dubai, UAE</p>
            </div>
            <a href="mailto:info@purrpleorryx.com" className="footer-link inline-block mt-4 text-[var(--color-accent)] hover:text-white transition-colors font-medium">
              info@purrpleorryx.com
            </a>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col gap-6 lg:pl-12">
            <h4 className="text-white/40 font-sans font-bold text-xs tracking-widest uppercase mb-4">Navigation</h4>
            <div className="flex flex-col gap-4 font-sans font-medium">
              {[
                { name: 'Events', href: '#events' },
                { name: 'Portfolio', href: '#portfolio' },
                { name: 'How it works', href: '#how-it-works' },
                { name: 'Why us', href: '#why-us' }
              ].map((link) => (
                <Link key={link.name} href={link.href} className="footer-link group flex items-center gap-4 w-fit">
                  <span className="w-0 h-[1px] bg-[var(--color-accent)] group-hover:w-4 transition-all duration-300"></span>
                  <span className="text-white/80 group-hover:text-white transition-colors">{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Socials */}
          <div className="flex flex-col gap-6 lg:pl-12">
            <h4 className="text-white/40 font-sans font-bold text-xs tracking-widest uppercase mb-4">Follow Us</h4>
            <SocialLinks 
              className="gap-4" 
              iconClassName="w-5 h-5" 
              linkClassName="footer-link w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-[#E5097F] text-white hover:text-[#E5097F] transition-colors"
            />
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white/40 font-sans font-bold text-xs tracking-widest uppercase mb-4">Stay Updated</h4>
            <p className="footer-link text-white/60 font-sans text-sm mb-2">Subscribe to get the latest event insights.</p>
            <div className="footer-link relative w-full">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-transparent border-b border-white/20 py-3 pr-10 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-accent)] transition-colors"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 text-[var(--color-accent)] font-bold text-xl hover:scale-110 transition-transform">
                →
              </button>
            </div>
          </div>

        </div>



        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-xs text-white/40 tracking-widest uppercase">
          <p>© {new Date().getFullYear()} Purrple Orryx. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="https://www.purrpleorryx.com/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="https://www.purrpleorryx.com/terms-and-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
