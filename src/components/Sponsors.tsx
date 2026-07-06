import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SPONSORS_DATA } from "../data";
import { Shield } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Sponsors() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reveal header
    gsap.fromTo(
      headerRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );

    // Reveal grid items
    if (containerRef.current) {
      const items = containerRef.current.querySelectorAll(".sponsor-card");
      gsap.fromTo(
        items,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-20 sm:py-28 bg-cream text-dark border-t border-dark/15"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div ref={headerRef} className="mb-14 text-center">
          <span className="font-mono text-xs tracking-widest text-orange-dark font-bold mb-2 block uppercase">
            PARTENAIRES DE CONFIANCE
          </span>
          <h2 className="font-display text-4xl sm:text-6xl tracking-wider uppercase text-dark">
            ILS SOUTIENNENT LA CULTURE
          </h2>
        </div>

        {/* Sponsors Grid styled like high-fashion stamps */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-dark/25">
          {SPONSORS_DATA.map((sponsor) => (
            <div
              key={sponsor.name}
              className="sponsor-card border-r border-b border-dark/25 p-8 sm:p-12 flex items-center justify-center bg-transparent hover:bg-dark hover:text-cream transition-all duration-300 group aspect-[4/3] relative overflow-hidden"
            >
              {/* Minimal text-stamp logo with incredible bold display fonts */}
              <span className="font-display text-xl sm:text-3xl tracking-widest uppercase transition-transform duration-300 group-hover:scale-105 text-center leading-none">
                {sponsor.name}
              </span>

              {/* Little corner cross decoration for high craft feel */}
              <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-dark group-hover:bg-orange-dark opacity-20 group-hover:opacity-100 transition-all rounded-full" />
              <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-dark group-hover:bg-orange-dark opacity-20 group-hover:opacity-100 transition-all rounded-full" />
            </div>
          ))}
        </div>

        {/* Call to action for potential sponsors */}
        <div className="mt-12 text-center">
          <p className="font-mono text-xs text-dark/60 tracking-wider">
            Vous souhaitez associer votre marque à Bazookaland 2026 ?{" "}
            <a
              href="mailto:partner@bazookaland.com"
              className="text-orange-dark hover:underline font-bold"
            >
              Contactez le collectif Akaf Family
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
