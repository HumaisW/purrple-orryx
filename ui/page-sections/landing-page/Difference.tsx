"use client";

import Image from "next/image";
import Link from "next/link";

const listItems = [
  {
    num: "01",
    title: "ONE ACCOUNTABLE TEAM",
    desc: "One primary team manages the brief, creative direction, technical production, suppliers and event-day delivery."
  },
  {
    num: "02",
    title: "CREATIVE AND PRODUCTION TOGETHER",
    desc: "Every concept is shaped with practical delivery, stage, AV, audience movement and guest experience in mind."
  },
  {
    num: "03",
    title: "BUILT AROUND THE BUSINESS GOAL",
    desc: "We ask what the event must achieve, then align the experience, budget and execution around that outcome."
  }
];

export default function Difference() {
  return (
    <section className="relative w-full bg-white py-24 md:py-32 overflow-hidden">

      {/* Subtle background glow top left */}
      <div className="absolute top-0 left-0 w-[50vw] h-[50vw] bg-[#E5097F]/5 rounded-full blur-[150px] pointer-events-none -translate-x-1/4 -translate-y-1/4"></div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Column - Image & Badge */}
          <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
            {/* Main Image */}
            <div className="relative w-full aspect-[3/4] md:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] group">
              <Image
                src="/landing page - PO/IMGL7819 (1).jpg"
                alt="Purrple Orryx Event Setup"
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Floating Pink Badge */}
            <div className="absolute -bottom-6 -left-4 md:-bottom-12 md:-left-12 w-32 h-32 md:w-48 md:h-48 rounded-full bg-[#E5097F] flex flex-col justify-center items-center text-center text-white shadow-[0_10px_30px_rgba(229,9,127,0.3)] z-20 group-hover:scale-105 transition-transform duration-500">
              <span className="font-sans font-bold text-[8px] md:text-[10px] tracking-[0.15em] uppercase mb-1">Built around</span>
              <span className="font-sans font-black text-sm md:text-[1.3rem] tracking-tighter uppercase leading-[1.1] px-4">Your <br /> Objective</span>
            </div>
          </div>

          {/* Right Column - Text & List */}
          <div className="flex flex-col pt-12 lg:pt-0">
            {/* Eyebrow */}
            <span className="text-[#4A154B] font-sans font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase mb-8 block">
              Why Purrple Orryx
            </span>

            {/* Heading */}
            <h2 className="text-[2.5rem] sm:text-[3rem] md:text-[4rem] lg:text-[3.5rem] xl:text-[4.5rem] font-sans font-black tracking-tighter uppercase text-[#020202] leading-[0.85] mb-16">
              <span className="block">We don't just</span>
              <span className="block">plan the event.</span>
              <span className="block text-[#E5097F]">We plan the</span>
              <span className="block text-[#E5097F]">return on it.</span>
            </h2>

            {/* List */}
            <div className="flex flex-col border-t border-gray-200">
              {listItems.map((item, i) => (
                <div key={i} className="flex gap-6 md:gap-12 py-8 border-b border-gray-200 group">
                  <div className="text-[#E5097F] font-sans font-black text-sm md:text-base mt-1">
                    {item.num}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-sans font-bold text-lg md:text-xl text-[#020202] uppercase tracking-tight mb-3 group-hover:text-[#E5097F] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 font-sans font-medium text-base md:text-lg leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Button */}
            <div className="mt-12 inline-block">
              <Link
                href="#contact"
                className="group flex items-center gap-3 text-[#020202] font-sans font-bold text-xs tracking-[0.2em] uppercase hover:text-[#E5097F] transition-colors duration-300 border-b border-transparent hover:border-[#E5097F] pb-2"
              >
                <span>Start the conversation</span>
                <span className="font-black text-sm leading-none transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
