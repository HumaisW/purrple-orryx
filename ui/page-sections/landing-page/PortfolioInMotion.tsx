"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    image: "/awwards/menalac awards saudi.jpeg",
    index: "01 / 10",
    title: "MENALAC AWARDS",
    subtitle: "Saudi Arabia · Full production",
    label: "AWARDS & GALA"
  },
  {
    id: 2,
    image: "/awwards/london gate.jpeg",
    index: "02 / 10",
    title: "LONDON GATE",
    subtitle: "UAE · Full Event Managemnt & production",
    label: "AWARDS & GALA"
  },
  {
    id: 3,
    image: "/landing page - PO/DSC03145.jpg",
    index: "03 / 10",
    title: "RSA COLD CHAIN LAUNCH",
    subtitle: "Dubai · Stage full stage execution end-to-end",
    label: "BRAND EXPERIENCE"
  },
  {
    id: 4,
    image: "/awwards/tokai.jpeg",
    index: "04 / 10",
    title: "TOKAI LAUNCH EVENT",
    subtitle: "Dubai · Creative & production",
    label: "ANNUAL CELEBRATION"
  },
  {
    id: 5,
    image: "/landing page - PO/20191128_214033.jpg",
    index: "05 / 10",
    title: "FRANKE ANNIVERSARY",
    subtitle: "Dubai · Stage, AV & lighting",
    label: "CORPORATE GATHERING"
  },
  {
    id: 6,
    image: "/landing page - PO/HAM_0376.jpg",
    index: "06 / 10",
    title: "FCM ANNUAL BALL",
    subtitle: "UAE · Full event delivery",
    label: "EMPLOYEE EXPERIENCE"
  },
];

const GALLERY_IMAGES = [
  ...SLIDES,

  { image: "/newimgs/abg-lab-exhibition-team.jpg", title: "Exhibition Experience" },
  { image: "/newimgs/ames-grand-opening-entrance.jpg", title: "Grand Opening" },
  { image: "/newimgs/av-lighting-gala-setup.jpg", title: "AV and Lighting" },
  { image: "/newimgs/beach-team-building-tug-of-war.jpg", title: "Team Building" },
  { image: "/newimgs/binance-leadership-dinner.jpg", title: "Leadership Dinner" },
  { image: "/newimgs/conference-audience-keynote.jpg", title: "Corporate Conference" },
  { image: "/newimgs/conference-classroom-setup.jpg", title: "Conference Production" },
  { image: "/newimgs/corporate-gala-dinner-pink-lighting.jpg", title: "Gala Dinner" },
  { image: "/newimgs/corporate-team-building-activity.jpg", title: "Team Experience" },
  { image: "/newimgs/cultural-gala-performance.jpg", title: "Cultural Performance" },
  { image: "/newimgs/cummins-exhibition-stand.jpg", title: "Exhibition Stand" },
  { image: "/newimgs/family-day-face-painting.jpg", title: "Family Day" },
  { image: "/newimgs/family-day-gardening-activity.jpg", title: "Family Engagement" },
  { image: "/newimgs/family-day-live-entertainment.jpg", title: "Live Entertainment" },
  { image: "/newimgs/family-day-outdoor-celebration.jpg", title: "Outdoor Celebration" },
  { image: "/newimgs/family-day-stage-program.jpg", title: "Family Day Stage" },
  { image: "/newimgs/fcm-annual-ball-ballroom.jpg", title: "FCM Annual Ball" },
  { image: "/newimgs/fcm-annual-ball-dance-floor.jpg", title: "Annual Ball Celebration" },
  { image: "/newimgs/fcm-annual-ball-stage-2024.jpg", title: "FCM Annual Ball Stage" },
  { image: "/newimgs/fcm-business-session-panel.jpg", title: "Business Session" },
  { image: "/newimgs/fcm-hollywood-photo-booth.jpg", title: "Themed Photo Experience" },
  { image: "/newimgs/fcm-immersive-guest-activation.jpg", title: "Guest Activation" },
  { image: "/newimgs/fcm-larger-than-life.jpg", title: "Themed Event" },
  { image: "/newimgs/fcm-themed-dance-performance.jpg", title: "Live Performance" },
  { image: "/newimgs/franke-anniversary-gala.jpg", title: "Franke Anniversary" },
  { image: "/newimgs/franke-anniversary-red-carpet.jpg", title: "Red Carpet Arrival" },
  { image: "/newimgs/franke-interactive-brand-gallery.jpg", title: "Brand Gallery" },
  { image: "/newimgs/franke-live-vocal-performance.jpg", title: "Vocal Performance" },
  { image: "/newimgs/franke-violin-performance.jpg", title: "Violin Performance" },
  { image: "/newimgs/healthcare-talk-audience.jpg", title: "Industry Talk" },
  { image: "/newimgs/hvacr-next-generation-host-team.jpg", title: "Event Host Team" },
  { image: "/newimgs/hvacr-panel-discussion.jpg", title: "Panel Discussion" },
  { image: "/newimgs/intertanko-conference-room.jpg", title: "Council Meeting" },
  { image: "/newimgs/live-acrobatic-entertainment.jpg", title: "Acrobatic Entertainment" },
  { image: "/newimgs/london-gate-guest-reception.jpg", title: "Guest Reception" },
  { image: "/newimgs/london-gate-launch-stage.jpg", title: "Product Launch" },
  { image: "/newimgs/masquerade-themed-event.jpg", title: "Masquerade Event" },
  { image: "/newimgs/menalac-award-winners.jpg", title: "Awards Celebration" },
  { image: "/newimgs/menalac-sport-lounge.jpg", title: "Awards Night" },
  { image: "/newimgs/outdoor-brand-event-night.jpg", title: "Outdoor Brand Event" },
  { image: "/newimgs/outdoor-city-gala-dinner.jpg", title: "Outdoor Gala Dinner" },
  { image: "/newimgs/outdoor-networking-event.jpg", title: "Networking Event" },
  { image: "/newimgs/polish-african-economic-forum.jpg", title: "Economic Forum" },
  { image: "/newimgs/rsa-cold-chain-auditorium.jpg", title: "RSA Auditorium" },
  { image: "/newimgs/rsa-cold-chain-keynote-speaker.jpg", title: "Keynote Session" },
  { image: "/newimgs/rsa-cold-chain-stage.jpg", title: "RSA Cold Chain Launch" },
  { image: "/newimgs/team-building-balloon-challenge.jpg", title: "Team Challenge" },
  { image: "/newimgs/tokai-tanoura-live-performance.jpg", title: "Tanoura Performance" },
  { image: "/newimgs/united-airlines-event-wide.jpg", title: "United Airlines Event" },
  { image: "/newimgs/united-airlines-speaker.jpg", title: "Corporate Speaker Session" },
  { image: "/newimgs/vip-guests-corporate-event.jpg", title: "VIP Guest Experience" },
  { image: "/newimgs/vip-ribbon-cutting-ceremony.jpg", title: "Ribbon Cutting Ceremony" },
];
export default function PortfolioInMotion() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  return (
    <section className="bg-[#0f0f13] text-white py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 xl:gap-16 items-start">
          {/* Left Column */}
          <div className="w-full lg:w-[45%] space-y-6 md:space-y-8 z-10">
            <div className="inline-flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#E5097F] animate-pulse"></div>
              <span className="text-[#a482cc] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase block">
                PORTFOLIO IN MOTION
              </span>
            </div>
            <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] xl:text-[4rem] font-sans font-black leading-[0.85] tracking-tighter uppercase">
              <span className="block text-white transition-transform duration-700 hover:translate-x-2">WE DON'T JUST</span>
              <span className="block text-white transition-transform duration-700 hover:translate-x-2">PLAN THE EVENT.</span>
              <span className="block text-white transition-transform duration-700 hover:translate-x-2">WE PLAN THE</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#E5097F] via-[#9B2C8B] to-[#4A72B8] transition-transform duration-700 hover:translate-x-2 pb-2">RETURN ON IT.</span>
            </h2>
            <p className="text-gray-400 font-sans font-medium text-sm sm:text-base leading-relaxed max-w-sm">
              Because proof is always more powerful than promises. Explore a moving edit of stages, environments, guest moments and live experiences delivered by Purrple Orryx across Dubai, the UAE and the GCC.
            </p>

            <div className="pt-4">
              <Link
                href="https://www.canva.com/design/DAGR2JQDo_M/Zf7WbXw1yfrSH7Dl-N3uWA/edit"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 md:gap-3 bg-white text-black px-6 md:px-8 py-3 md:py-4 font-sans font-bold text-[9px] md:text-[10px] lg:text-xs tracking-[0.2em] uppercase transition-all duration-300 rounded-full hover:bg-transparent hover:text-white border border-transparent hover:border-white hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                OPEN COMPLETE PORTFOLIO <span className="text-lg leading-none transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
              </Link>
              <p className="text-[7px] md:text-[8px] text-gray-500 mt-4 max-w-xs uppercase tracking-wider leading-relaxed">
                LET THE WORK DO THE TALKING.<br />DIVE INTO OUR FULL ARCHIVE.
              </p>
            </div>
          </div>

          {/* Right Column (Slider) */}
          <div className="w-full lg:w-[55%] relative group">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-[#111] rounded-[2rem] overflow-hidden shadow-2xl border border-white/5">
              {/* Images Crossfade */}
              {SLIDES.map((slide, idx) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority={idx === 0}
                  />
                </div>
              ))}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b0a1a]/90 via-[#36001a]/30 to-transparent pointer-events-none z-10"></div>

              {/* Text Overlay Crossfade */}
              {SLIDES.map((slide, idx) => (
                <div
                  key={`text-${slide.id}`}
                  className={`absolute bottom-6 left-6 md:bottom-12 md:left-12 text-white z-20 flex flex-col items-start transition-all duration-700 ease-out ${idx === currentIndex ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
                    }`}
                >
                  <div className="w-8 h-[1px] bg-[#a482cc] mb-3"></div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[#a482cc] text-[10px] md:text-xs font-medium tracking-widest">{slide.index}</span>
                  </div>
                  <p className="text-[8px] md:text-[10px] font-bold tracking-[0.2em] uppercase mb-2 opacity-90 drop-shadow-md">
                    {slide.label}
                  </p>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter mb-2 font-sans uppercase drop-shadow-xl">
                    {slide.title}
                  </h3>
                  <p className="text-xs md:text-sm font-medium opacity-80 drop-shadow-md">
                    {slide.subtitle}
                  </p>
                </div>
              ))}
            </div>

            {/* Navigation & Indicators underneath */}
            <div className="flex items-center justify-between mt-6 px-2">
              <div className="flex items-center gap-2">
                {SLIDES.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-[2px] transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-[#E5097F]' : 'w-4 bg-gray-700'}`}
                  ></div>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-700 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-700 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                >
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnails Marquee */}
        <div className="mt-12 md:mt-20 w-full relative overflow-hidden group">
          {/* Edge Gradients for Marquee Fading */}
          <div className="absolute top-0 bottom-0 left-0 w-8 md:w-24 bg-gradient-to-r from-[#0f0f13] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-8 md:w-24 bg-gradient-to-l from-[#0f0f13] to-transparent z-10 pointer-events-none"></div>

          <div
  className="flex w-max animate-marquee gap-3 sm:gap-4 py-4"
  style={{ animationDuration: "240s" }}
>
            {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((slide, idx) => {
              return (
                <div
                  key={idx}
                  className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] aspect-[16/10] rounded-2xl overflow-hidden flex-shrink-0 transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                    sizes="(max-width: 768px) 40vw, 20vw"
                  />
                  {/* Subtle dark overlay that clears on hover */}
                  <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
