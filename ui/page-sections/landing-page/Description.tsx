"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Description() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Elegant Text Reveal
      gsap.utils.toArray<HTMLElement>(".desc-reveal").forEach((elem) => {
        gsap.fromTo(elem,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.5, ease: "power4.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // 2. Huge Kinetic Typography (Sliding horizontally on scroll)
      gsap.to(".scroll-text-left", {
        x: "-15%",
        ease: "none",
        scrollTrigger: {
          trigger: ".scroll-text-left",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

      // 3. Reveal Masonry Items
      gsap.utils.toArray<HTMLElement>(".masonry-item").forEach((item) => {
        gsap.fromTo(item,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // 5. Editorial Collage Parallax
      gsap.to(".parallax-img-slow", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: ".editorial-collage",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

      gsap.to(".parallax-img-fast", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: ".editorial-collage",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

      // 6. Number Counter Animation
      gsap.utils.toArray<HTMLElement>(".stat-number").forEach((el) => {
        const target = parseInt(el.getAttribute("data-target") || "0", 10);
        gsap.to(el, {
          innerHTML: target,
          duration: 2.5,
          ease: "power3.out",
          snap: { innerHTML: 1 },
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Masonry Data
  const galleryImages = [
    // Column 1
    [
      { src: "/landing page - PO/2U7A7021.jpg", cat: "Gala & Awards", title: "Corporate Summit — Dubai", aspect: "aspect-[4/3]" },
      { src: "/landing page - PO/20231206_224957.jpg", cat: "Brand Activation", title: "Luxury Showcase", aspect: "aspect-[3/4]" },
      { src: "/landing page - PO/DSC01550.jpg", cat: "VIP Experience", title: "Private Dinner", aspect: "aspect-square" }
    ],
    // Column 2
    [
      { src: "/landing page - PO/DSC00956.jpg", cat: "Product Launch", title: "Global Reveal — KSA", aspect: "aspect-[3/4]" },
      { src: "/landing page - PO/DSC_2864.JPG", cat: "Exhibition", title: "Custom Build & Setup", aspect: "aspect-square" },
      { src: "/landing page - PO/IMG_20240706_175157.jpg", cat: "Stage Design", title: "Tech Conference", aspect: "aspect-[4/3]" }
    ],
    // Column 3
    [
      { src: "/landing page - PO/HAM_0386.jpg", cat: "Creative Stage", title: "Live Entertainment", aspect: "aspect-square" },
      { src: "/landing page - PO/2U7A1361.jpg", cat: "Tech Production", title: "Immersive Visuals", aspect: "aspect-[4/3]" },
      { src: "/landing page - PO/IMGL6156.JPG", cat: "Exclusive Event", title: "Gala Dinner — Kuwait", aspect: "aspect-[3/4]" }
    ]
  ];

  return (
    <section className="bg-white text-[var(--color-primary)] py-32 md:py-48 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div ref={containerRef} className="max-w-[1800px] mx-auto w-full">

        {/* Top Section: Editorial Description with Images */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-12 mb-32 md:mb-48 border-t border-[var(--color-primary)]/10 pt-16">

          {/* Left Side: Parallax Image Collage */}
          <div className="editorial-collage w-full lg:w-[45%] relative h-[50vh] md:h-[70vh] group">
            {/* Main large image */}
            <div className="absolute top-0 left-0 w-[80%] h-[80%] rounded-2xl overflow-hidden border-4 md:border-8 border-white shadow-2xl bg-gray-100">
              <div className="absolute inset-x-0 -top-[20%] h-[140%]">
                <Image
                  src="/landing page - PO/DSC01550.jpg"
                  fill
                  alt="Event Setup"
                  className="parallax-img-slow object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-[var(--color-primary)]/10 mix-blend-multiply pointer-events-none"></div>
            </div>
            {/* Overlapping smaller image */}
            <div className="absolute bottom-0 right-0 w-[55%] h-[60%] rounded-2xl overflow-hidden shadow-2xl border-4 md:border-8 border-white bg-gray-100">
              <div className="absolute inset-x-0 -top-[20%] h-[140%]">
                <Image
                  src="/landing page - PO/2U7A1361.jpg"
                  fill
                  alt="Event Detail"
                  className="parallax-img-fast object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Elegant Text */}
          <div className="w-full lg:w-[45%] flex flex-col items-start gap-12 z-10">
            <p className="desc-reveal text-3xl md:text-4xl lg:text-5xl font-sans font-light leading-[1.3] tracking-tight text-[var(--color-primary)]">
              <span className="font-serif font-bold italic text-[var(--color-accent)] pr-2">Purrple Orryx</span>
              is a Dubai-based agency. We work as your partner, not a supplier. End-to-end, in-house production. ROI you can defend in a boardroom.
            </p>

            <a
              href="#about"
              className="desc-reveal group flex items-center gap-4 font-sans text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] relative overflow-hidden"
            >
              <div className="w-8 h-[2px] bg-[var(--color-accent)] group-hover:w-16 transition-all duration-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]"></div>
              <span>Discover Our Story</span>
            </a>
          </div>
        </div>

        {/* Huge Kinetic Header: Featured (Solid Text instead of outlined) */}
        <div className="relative mb-24 md:mb-32 pl-4">
          <h2 className="scroll-text-left text-[15vw] md:text-[12vw] font-sans font-bold tracking-tighter leading-none text-[var(--color-primary)] opacity-100 whitespace-nowrap drop-shadow-sm">
            Selected<span className="font-serif text-[var(--color-accent)] italic opacity-100">work</span>
          </h2>
        </div>

        {/* Masonry Image Gallery */}
        <div className="masonry-gallery flex flex-col md:flex-row gap-6 md:gap-8 mb-32 md:mb-48">

          {/* Column 1 */}
          <div className="flex flex-col gap-6 md:gap-8 w-full md:w-1/3">
            {galleryImages[0].map((img, idx) => (
              <div key={idx} className={`masonry-item relative w-full ${img.aspect} rounded-2xl overflow-hidden group cursor-pointer border border-[var(--color-primary)]/5 bg-[var(--color-primary)]/5`}>
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover transition-transform duration-[1s] ease-out group-hover:scale-110"
                />
                {/* Hover Details Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/90 via-[var(--color-primary)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <span className="text-[var(--color-accent)] font-sans font-bold text-xs tracking-widest uppercase transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">{img.cat}</span>
                  <h3 className="text-2xl lg:text-3xl font-sans font-light tracking-tight text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 delay-75 ease-out mt-2">{img.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="masonry-col-2 flex flex-col gap-6 md:gap-8 w-full md:w-1/3 z-10">
            {galleryImages[1].map((img, idx) => (
              <div key={idx} className={`masonry-item relative w-full ${img.aspect} rounded-2xl overflow-hidden group cursor-pointer border border-[var(--color-primary)]/5 bg-[var(--color-primary)]/5`}>
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover transition-transform duration-[1s] ease-out group-hover:scale-110"
                />
                {/* Hover Details Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/90 via-[var(--color-primary)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <span className="text-[var(--color-accent)] font-sans font-bold text-xs tracking-widest uppercase transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">{img.cat}</span>
                  <h3 className="text-2xl lg:text-3xl font-sans font-light tracking-tight text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 delay-75 ease-out mt-2">{img.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Column 3 */}
          <div className="masonry-col-3 flex flex-col gap-6 md:gap-8 w-full md:w-1/3">
            {galleryImages[2].map((img, idx) => (
              <div key={idx} className={`masonry-item relative w-full ${img.aspect} rounded-2xl overflow-hidden group cursor-pointer border border-[var(--color-primary)]/5 bg-[var(--color-primary)]/5`}>
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover transition-transform duration-[1s] ease-out group-hover:scale-110"
                />
                {/* Hover Details Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/90 via-[var(--color-primary)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <span className="text-[var(--color-accent)] font-sans font-bold text-xs tracking-widest uppercase transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">{img.cat}</span>
                  <h3 className="text-2xl lg:text-3xl font-sans font-light tracking-tight text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 delay-75 ease-out mt-2">{img.title}</h3>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Impact Section: Heading + Stats in same line */}
        <div className="flex flex-col xl:flex-row items-start justify-between gap-16 border-t border-[var(--color-primary)]/10 pt-16">

          {/* Static Header: Impact */}
          <div className="w-full xl:w-[40%] relative flex justify-start">
            <h2 className="desc-reveal text-[10vw] md:text-[8vw] xl:text-[5vw] font-sans font-bold tracking-tighter leading-[0.9] text-[var(--color-primary)] drop-shadow-sm">
              Real Impact <br className="hidden xl:block" />
              <span className="font-serif text-[var(--color-accent)] italic">Delivered</span>
            </h2>
          </div>

          {/* Elegant Stats Grid */}
          <div className="w-full xl:w-[60%] grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">

            <div className="desc-reveal flex flex-col items-start group">
              <div className="text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[8rem] font-sans font-medium leading-[0.85] mb-6 tracking-tighter text-[var(--color-primary)] transition-all duration-500 group-hover:text-[var(--color-accent)] group-hover:-translate-y-2 flex items-start">
                <span className="stat-number" data-target="13">0</span><span className="text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] align-top text-[var(--color-accent)] font-sans font-medium group-hover:text-[var(--color-primary)] ml-1">+</span>
              </div>
              <div className="text-sm md:text-base text-[var(--color-primary)]/70 uppercase tracking-widest font-sans font-medium max-w-[200px] border-l-2 border-[var(--color-accent)] pl-4">
                Years producing events since 2013
              </div>
            </div>

            <div className="desc-reveal flex flex-col items-start group">
              <div className="text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[8rem] font-sans font-medium leading-[0.85] mb-6 tracking-tighter text-[var(--color-primary)] transition-all duration-500 group-hover:text-[var(--color-accent)] group-hover:-translate-y-2 flex items-start">
                <span className="stat-number" data-target="5">0</span>
              </div>
              <div className="text-sm md:text-base text-[var(--color-primary)]/70 uppercase tracking-widest font-sans font-medium max-w-[200px] border-l-2 border-[var(--color-accent)] pl-4">
                Countries delivered across the GCC
              </div>
            </div>

            <div className="desc-reveal flex flex-col items-start group">
              <div className="text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[8rem] font-sans font-medium leading-[0.85] mb-6 tracking-tighter text-[var(--color-primary)] transition-all duration-500 group-hover:text-[var(--color-accent)] group-hover:-translate-y-2 flex items-start">
                <span className="stat-number" data-target="100">0</span><span className="text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] align-top text-[var(--color-accent)] font-sans font-medium group-hover:text-[var(--color-primary)] ml-1">%</span>
              </div>
              <div className="text-sm md:text-base text-[var(--color-primary)]/70 uppercase tracking-widest font-sans font-medium max-w-[200px] border-l-2 border-[var(--color-accent)] pl-4">
                In-house production capabilities
              </div>
            </div>

            <div className="desc-reveal flex flex-col items-start group">
              <div className="text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[8rem] font-sans font-medium leading-[0.85] mb-6 tracking-tighter text-[var(--color-primary)] transition-all duration-500 group-hover:text-[var(--color-accent)] group-hover:-translate-y-2 flex items-start">
                <span className="stat-number" data-target="1">0</span>
              </div>
              <div className="text-sm md:text-base text-[var(--color-primary)]/70 uppercase tracking-widest font-sans font-medium max-w-[200px] border-l-2 border-[var(--color-accent)] pl-4">
                Point of contact from brief to load-out
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
