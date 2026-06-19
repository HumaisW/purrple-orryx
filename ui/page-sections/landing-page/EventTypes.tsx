"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const eventTypes = [
  { id: "01", title: "Gala Dinners & Award Nights", src: "/newimgs/1.jpeg" },
  { id: "02", title: "Conferences & Summits", src: "/newimgs/6.jpeg" },
  { id: "03", title: "Product Launches & Grand Openings", src: "/awwards/vnguard.jpeg" },
  { id: "04", title: "Family Days & Team Building", src: "/event types/family days.JPG" },
  { id: "05", title: "Corporate Celebrations", src: "/newimgs/3.jpeg" },
  { id: "06", title: "Exhibitions & Brand Activations", src: "/newimgs/11.jpeg" },
];

export default function EventTypes() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Reveal animation for text
      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((elem) => {
        gsap.fromTo(elem,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Grid cards animation
      gsap.fromTo(".event-card",
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
          scrollTrigger: {
            trigger: ".events-grid",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-white py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1600px] mx-auto w-full px-4 md:px-8 lg:px-16">

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 lg:gap-24 mb-12 md:mb-16">

          {/* Left Title */}
          <div className="w-full lg:w-3/5">
            <h2 className="reveal-up text-[2.5rem] sm:text-[3rem] md:text-[4rem] lg:text-[3.5rem] xl:text-[4.5rem] font-sans font-black leading-[0.9] tracking-tighter uppercase text-[#020202]">
              <span className="block">Built for the</span>
              <span className="block">moment.</span>
              <span className="block text-[#E5097F]">Remembered</span>
              <span className="block text-[#E5097F]">after it.</span>
            </h2>
          </div>

          {/* Right Text & Controls */}
          <div className="w-full lg:w-2/5 flex flex-col items-start lg:pt-8">
            <p className="reveal-up text-lg md:text-xl font-sans font-medium text-gray-600 leading-relaxed max-w-lg mb-8">
              From leadership conferences to award nights and large-scale employee experiences, every event is shaped around your audience, your brand and the result you need.
            </p>
            <div className="w-full flex items-center justify-between">
              <Link href="#portfolio" className="reveal-up group flex items-center gap-4 font-sans text-sm font-bold uppercase tracking-widest text-[#020202] hover:text-[#E5097F] transition-colors">
                <span>See the work</span>
                <div className="w-8 h-[2px] bg-[#020202] group-hover:bg-[#E5097F] group-hover:w-12 transition-all duration-300"></div>
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* Masonry Grid Container */}
      <div className="w-full px-4 md:px-8 lg:px-16 events-grid">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
          {eventTypes.map((event, idx) => {
            // Calculate grid spans perfectly matching the user's layout
            let gridClasses = "col-span-1";

            if (idx === 0) {
              // Gala Dinners: Wide on tablet, tall left column on desktop
              gridClasses = "md:col-span-2 lg:col-span-1 lg:row-span-2";
            } else if (idx === 4) {
              // Corporate Celebrations: Standard on tablet, tall right column on desktop
              gridClasses = "md:col-span-1 lg:col-span-1 lg:row-span-2";
            } else if (idx === 5) {
              // Exhibitions: Wide bottom row (2 columns on desktop)
              gridClasses = "md:col-span-2 lg:col-span-2 lg:row-span-1";
            } else {
              // Standard 1x1 blocks
              gridClasses = "md:col-span-1 lg:col-span-1 lg:row-span-1";
            }

            return (
              <div
                key={idx}
                className={`event-card relative rounded-none overflow-hidden group cursor-pointer ${gridClasses}`}
              >
                <Image
                  src={event.src}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none"></div>

                {/* Bottom Left Info Wrapper */}
                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 flex flex-col items-start gap-2">
                  {/* Small Label Box */}
                  <div className="w-8 h-6 md:w-10 md:h-8 border border-white/30 flex items-center justify-center backdrop-blur-sm bg-white/10 rounded-[3px] transition-colors duration-500">
                    <span className="text-white font-sans font-bold text-[10px] md:text-xs">
                      {event.id}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-white font-sans font-bold text-xl md:text-2xl lg:text-[1.75rem] leading-[1.1] tracking-tight max-w-[80%]"
                  >
                    {event.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
