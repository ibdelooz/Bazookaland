import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROGRAM_DATA } from "../data";
import { Calendar, User } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Programme() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reveal header
    gsap.fromTo(
      headerRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );

    // Reveal columns content
    if (columnsRef.current) {
      const items = columnsRef.current.querySelectorAll(".reveal-item");
      gsap.fromTo(
        items,
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: columnsRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);

  return (
    <section
      id="programme"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-cream text-dark border-t border-cream/10"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div ref={headerRef} className="mb-20 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
            <span className="w-10 h-[1.5px] bg-orange-dark"></span>
            <span className="font-mono text-xs tracking-widest text-orange-dark uppercase font-bold">
              LINE-UP & SCÈNES
            </span>
          </div>
          <h2 className="font-display text-5xl sm:text-7xl tracking-wider text-dark uppercase">
            LE PROGRAMME
          </h2>
          <p className="mt-4 text-dark/70 max-w-xl text-sm sm:text-base leading-relaxed">
            Musique live, street art et culture urbaine. Retrouvez les plus grands artistes de la scène africaine et internationale à Lomé.
          </p>
        </div>

        {/* Two Columns Program Grid */}
        <div
          ref={columnsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24"
        >
          {PROGRAM_DATA.map((day, dIdx) => (
            <div key={day.dayName} className="flex flex-col">
              {/* Day Header */}
              <div className="reveal-item flex items-end justify-between border-b-2 border-dark pb-4 mb-8">
                <div className="flex flex-col">
                  <span className="font-mono text-xs tracking-widest text-orange-dark font-bold mb-1">
                    JOUR 0{dIdx + 1}
                  </span>
                  <h3 className="font-display text-4xl sm:text-5xl tracking-wide">
                    {day.dayName}
                  </h3>
                </div>
                <div className="flex items-center gap-2 font-mono text-sm font-bold text-dark/60 bg-dark/5 px-3 py-1 rounded">
                  <Calendar className="w-4 h-4 text-orange-dark" />
                  {day.date}
                </div>
              </div>

              {/* Artists List */}
              <div className="flex flex-col divide-y divide-dark/10">
                {day.artists.map((artist, aIdx) => (
                  <div
                    key={artist.name}
                    className="reveal-item py-6 group flex items-center justify-between hover:px-2 transition-all duration-300"
                  >
                    <div className="flex flex-col">
                      {/* Large Condensed Artist Name */}
                      <span className="font-display text-2xl sm:text-4xl tracking-wide group-hover:text-orange-dark group-hover:translate-x-1 transition-all duration-300">
                        {artist.name}
                      </span>
                      {/* Subtitle genre */}
                      <span className="font-mono text-[11px] uppercase tracking-widest text-dark/50 mt-1 flex items-center gap-1 group-hover:text-dark/80 transition-colors">
                        <User className="w-3 h-3 text-orange-dark" /> {artist.genre}
                      </span>
                    </div>

                    {/* Performance Order / Time design tag */}
                    <span className="font-mono text-xs text-dark/40 font-bold group-hover:text-orange-dark transition-colors">
                      #{String(aIdx + 1).padStart(2, "0")} SHOW
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
