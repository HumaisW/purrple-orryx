"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

const faqs = [
  {
    question: "What types of corporate events do you manage?",
    answer: "We manage conferences, summits, gala dinners, award nights, product launches, grand openings, family days, team-building events, exhibitions, activations and corporate celebrations."
  },
  {
    question: "Do you handle AV, staging and production?",
    answer: "Yes. Purrple Orryx can manage creative direction, stage, AV, lighting, entertainment, technical production, suppliers, show flow and on-site delivery as one coordinated scope."
  },
  {
    question: "Do you deliver events outside Dubai?",
    answer: "Yes. The team supports events across the UAE and selected GCC markets, depending on the event requirements and production scope."
  },
  {
    question: "How do we start?",
    answer: "Send your vision through WhatsApp or email. A specialist will arrange a discovery and strategy session, then present a tailored proposal."
  }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(3); // Keep the last one open by default

  return (
    <section className="relative w-full bg-[#FAFAFA] py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden">
      
      {/* Background Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-[#E5097F]/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column - Text */}
          <div className="flex flex-col pt-4">
            <span className="text-[#4A154B] font-sans font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase mb-8 block">
              Useful to know
            </span>
            <h2 className="text-[2.5rem] sm:text-[3rem] md:text-[4rem] lg:text-[3.5rem] xl:text-[4.5rem] font-sans font-black tracking-tighter uppercase leading-[0.85] text-[#020202] mb-12">
              <span className="block">Clear</span>
              <span className="block">Answers.</span>
              <span className="block text-[#E5097F]">Fast next</span>
              <span className="block text-[#E5097F]">Steps.</span>
            </h2>
            <p className="text-gray-500 font-sans text-sm md:text-base leading-relaxed max-w-sm">
              We believe in keeping things simple. Find straightforward answers to common questions so you know exactly what to expect when partnering with us.
            </p>
          </div>

          {/* Right Column - Accordion */}
          <div className="flex flex-col justify-center">
            <div className="border-t border-gray-200">
              {faqs.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={i} className="border-b border-gray-200">
                    <button
                      className="w-full py-8 flex items-center justify-between text-left focus:outline-none group"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                    >
                      <span className="font-sans font-bold text-lg md:text-xl text-[#020202] group-hover:text-[#E5097F] transition-colors pr-8">
                        {faq.question}
                      </span>
                      <span className="text-[#E5097F] shrink-0">
                        {isOpen ? <X size={20} strokeWidth={4} /> : <Plus size={20} strokeWidth={4} />}
                      </span>
                    </button>
                    <div 
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 pb-8' : 'max-h-0 opacity-0'}`}
                    >
                      <p className="text-gray-500 font-sans text-base leading-relaxed pr-12">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
