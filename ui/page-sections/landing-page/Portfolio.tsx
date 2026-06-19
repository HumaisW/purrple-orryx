"use client";

import Image from "next/image";
import Link from "next/link";
import ActionButtons from "@/ui/globals/ActionButtons";

export default function Portfolio() {
  return (
    <section id="portfolio" className="bg-white text-black py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 xl:gap-16 items-center">
          {/* Left Column */}
          <div className="w-full lg:w-1/2 space-y-6 md:space-y-8">
            <span className="text-[#532b7c] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase block">
              SELECTED PORTFOLIO
            </span>
            <h2 className="text-[2.5rem] sm:text-[3rem] md:text-[4rem] lg:text-[3.5rem] xl:text-[4.5rem] font-sans font-black leading-[1] md:leading-[0.9] tracking-tighter uppercase text-[#020202]">
              <span className="block">One place to</span>
              <span className="block">explore the scale,</span>
              <span className="block">detail and variety</span>
              <span className="block text-[#E5097F]">of our work.</span>
            </h2>
            <p className="text-gray-600 font-sans font-medium text-sm sm:text-base md:text-lg leading-relaxed max-w-lg">
              Immerse yourself in a curated showcase of our most defining moments. Discover the scale, precision, and unforgettable impact that characterize the complete Purrple Orryx portfolio.
            </p>

            <div className="flex flex-col gap-0 border-t border-gray-200 mt-6 md:mt-8 max-w-lg">
              <div className="flex items-center gap-4 border-b border-gray-200 py-3 md:py-4">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rotate-45 bg-[#532b7c] flex-shrink-0"></div>
                <span className="text-sm md:text-base font-semibold text-gray-800">Corporate events across Dubai, the UAE and GCC</span>
              </div>
              <div className="flex items-center gap-4 border-b border-gray-200 py-3 md:py-4">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rotate-45 bg-[#532b7c] flex-shrink-0"></div>
                <span className="text-sm md:text-base font-semibold text-gray-800">Real stage, AV, décor, entertainment and guest-experience work</span>
              </div>
              <div className="flex items-center gap-4 border-b border-gray-200 py-3 md:py-4">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rotate-45 bg-[#532b7c] flex-shrink-0"></div>
                <span className="text-sm md:text-base font-semibold text-gray-800">Easy to share internally with marketing, HR and procurement teams</span>
              </div>
            </div>

            <div className="pt-2 md:pt-4">
              <Link
                href="mailto:info@purrpleorryx.com"
                className="inline-flex items-center gap-2 md:gap-3 bg-[#532b7c] text-white px-6 md:px-8 py-3 md:py-4 font-sans font-bold text-[9px] md:text-[10px] lg:text-xs tracking-[0.2em] uppercase hover:bg-[#ed217c] transition-colors duration-300 rounded-[2px] w-full sm:w-auto justify-center"
              >
                KICKSTART YOUR EVENT <span className="text-base md:text-lg leading-none">↗</span>
              </Link>
              <p className="text-[8px] md:text-[10px] text-gray-500 mt-3 md:mt-4 max-w-sm text-center sm:text-left uppercase tracking-wider font-semibold">
                MAIL US AND LET US KNOW ABOUT YOUR EVENT.
              </p>
            </div>
          </div>

          {/* Right Column (Images) */}
          <div className="w-full lg:w-1/2 relative h-[400px] sm:h-[450px] md:h-[550px] lg:h-[600px] flex items-center justify-center mt-12 md:mt-16 lg:mt-0">
            <div className="relative w-full max-w-[320px] sm:max-w-[380px] md:max-w-[450px] lg:max-w-[500px] aspect-[4/5]">
              {/* Back Left Image */}
              <div className="absolute top-6 sm:top-8 md:top-10 -left-6 sm:-left-12 md:-left-20 w-[60%] sm:w-[65%] md:w-[70%] aspect-[4/5] bg-white p-2 md:p-3 pb-8 sm:pb-10 md:pb-14 shadow-xl transform -rotate-[12deg] z-10 transition-all duration-500 hover:scale-[1.05] hover:z-50 hover:-rotate-6 hover:-translate-y-4">
                <div className="relative w-full h-full">
                  <Image
                    src="/landing page - PO/0034.jpg"
                    alt="Corporate Event"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-red-900/10 mix-blend-multiply pointer-events-none"></div>
                </div>
              </div>

              {/* Back Right Image */}
              <div className="absolute top-2 sm:top-4 -right-6 sm:-right-10 md:-right-16 w-[60%] sm:w-[65%] md:w-[70%] aspect-[4/5] bg-white p-2 md:p-3 pb-8 sm:pb-10 md:pb-14 shadow-xl transform rotate-[12deg] z-20 transition-all duration-500 hover:scale-[1.05] hover:z-50 hover:rotate-6 hover:-translate-y-4">
                <div className="relative w-full h-full">
                  <Image
                    src="/landing page - PO/DSC01558.jpg"
                    alt="Family Day Event"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Front Middle Image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] sm:w-[70%] md:w-[75%] aspect-[4/5] bg-white p-2 md:p-3 pb-10 sm:pb-12 md:pb-16 shadow-2xl transform rotate-2 z-30 transition-all duration-500 hover:scale-105 hover:z-50">
                <div className="relative w-full h-full">
                  <Image
                    src="/landing page - PO/0320.jpg"
                    alt="Gala Dinner"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none"></div>
                  {/* Photo Caption overlay */}
                  <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4 text-white">
                    <p className="text-[7px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-gray-300 mb-0.5 md:mb-1">PURRPLE ORRYX</p>
                    <p className="text-base sm:text-lg md:text-xl font-black leading-none mb-0.5 md:mb-1">SELECTED WORK</p>
                    <p className="text-[8px] md:text-[10px] text-gray-300">Dubai - UAE - GCC</p>
                  </div>
                </div>
              </div>

              {/* Circular Button */}
              <Link
                href="https://www.canva.com/design/DAGR2JQDo_M/Zf7WbXw1yfrSH7Dl-N3uWA/edit"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 md:-bottom-8 md:-right-8 w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 bg-[#ed217c] rounded-full flex flex-col items-center justify-center text-white z-40 shadow-xl hover:scale-110 transition-transform duration-300"
              >
                <span className="font-bold text-xs sm:text-sm md:text-base leading-none">VIEW</span>
                <span className="text-[7px] sm:text-[8px] md:text-[10px] tracking-wider mt-1 text-center leading-tight">FULL<br />PORTFOLIO</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center mt-16 md:mt-24">
        <ActionButtons />
      </div>
    </section>
  );
}
