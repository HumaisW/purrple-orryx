"use client";

import Image from "next/image";
import Link from "next/link";
import ActionButtons from "@/ui/globals/ActionButtons";

const steps = [
  {
    num: "01",
    tag: "SHARE",
    step: "STEP 1",
    title: "SHARE YOUR VISION",
    desc: "WhatsApp us or email your brief directly at info@purrpleorryx.com. Tell us the goal, date, audience and location—whatever you already know.",
    img: "/landing page - PO/DSC09999.jpg",
    actions: [
      { label: "WHATSAPP ↗", href: "https://wa.me/971551035775" },
      { label: "EMAIL ↗", href: "mailto:info@purrpleorryx.com" }
    ]
  },
  {
    num: "02",
    tag: "DISCOVER",
    step: "STEP 2",
    title: "DISCOVERY & STRATEGY SESSION",
    desc: "Our specialist schedules a focused meeting to deeply understand your event goals, audience, brand requirements, priorities and practical constraints.",
    img: "/landing page - PO/IMG_20250705_190932.jpg",
    actions: []
  },
  {
    num: "03",
    tag: "PRESENT",
    step: "STEP 3",
    title: "RECEIVE YOUR TAILORED PROPOSAL",
    desc: "We present a customised plan with the creative direction, production scope, timeline and a clear ROI framework. Once approved, we move into execution.",
    img: "/landing page - PO/IBN_4853.jpg",
    actions: []
  }
];

export default function Process() {
  return (
    <section className="relative w-full bg-[#FAFAFA] py-24 md:py-32 overflow-hidden">

      {/* Background Glow (to match the faint pink glow in screenshot behind step 2) */}
      <div className="absolute top-1/2 right-0 w-[60vw] h-[60vw] bg-[#E5097F]/5 rounded-full blur-[150px] pointer-events-none transform -translate-y-1/2 translate-x-1/4"></div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">

        {/* Header */}
        <div className="max-w-5xl mb-24 md:mb-32">
          <h2 className="text-[2.5rem] sm:text-[3rem] md:text-[4rem] lg:text-[4.5rem] xl:text-[5.5rem] font-sans font-black tracking-tighter uppercase text-[#020202] leading-[0.9] mb-8">
            Ready to discuss <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5097F] to-[#7B2481]">your event?</span>
          </h2>
          <div className="text-xl md:text-2xl lg:text-3xl font-sans font-medium text-[#020202] leading-tight mb-6">
            <p className="mb-2">Three simple steps.</p>
            <p>Then we get to work.</p>
          </div>
          <p className="text-gray-500 font-sans text-lg md:text-xl leading-relaxed max-w-3xl">
            No long forms. No complicated funnel. Start with a message, and our team takes the conversation forward.
          </p>
        </div>

        {/* Steps List */}
        <div className="flex flex-col">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`grid grid-cols-1 md:grid-cols-[auto_1fr] lg:grid-cols-[auto_400px_1fr] gap-8 lg:gap-16 items-start py-12 md:py-20 ${i !== steps.length - 1 ? 'border-b border-gray-200' : ''}`}
            >

              {/* Number */}
              <div className="text-[#4A154B] font-sans font-black text-lg md:text-xl mt-2 hidden md:block">
                {step.num}
              </div>

              {/* Image Box */}
              <div className="relative w-full aspect-[16/10] lg:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.05)] group">
                <Image
                  src={step.img}
                  alt={step.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80"></div>

                {/* Black tag bottom left */}
                <div className="absolute bottom-4 left-4 bg-[#020202] text-white px-5 py-2 rounded-full font-sans font-bold text-[10px] tracking-[0.2em] uppercase">
                  {step.tag}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col items-start pt-2 lg:pl-12">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[#E5097F] font-sans font-bold text-xs md:text-sm tracking-[0.2em] uppercase block">
                    {step.step}
                  </span>
                  {/* Mobile number display */}
                  <span className="text-[#4A154B] font-sans font-black text-sm md:hidden">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl lg:text-5xl font-sans font-black tracking-tighter uppercase text-[#020202] hover:text-[#E5097F] transition-colors duration-300 leading-[0.9] mb-6">
                  {step.title}
                </h3>

                <p className="text-gray-500 font-sans font-medium text-base md:text-lg leading-relaxed max-w-2xl mb-8">
                  {step.desc}
                </p>

                {/* Actions */}
                {step.actions && step.actions.length > 0 && (
                  <div className="flex flex-wrap items-center gap-4">
                    {step.actions.map((action, j) => (
                      <Link
                        key={j}
                        href={action.href}
                        target={action.href.startsWith("http") ? "_blank" : undefined}
                        rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 hover:border-[#E5097F] text-[#020202] bg-white transition-all duration-300 font-sans font-bold text-[10px] tracking-[0.2em] uppercase shadow-sm hover:shadow-md hover:-translate-y-0.5"
                      >
                        {action.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

        <div className="w-full flex justify-center mt-16 md:mt-24">
          <ActionButtons />
        </div>

      </div>
    </section>
  );
}
