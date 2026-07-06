import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown, Music, Sparkles, MapPin } from "lucide-react";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Elegant slide-up on load
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.fromTo(
      heroRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );
    
    tl.fromTo(
      titleRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 },
      "-=1.0"
    );

    tl.fromTo(
      subtitleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0 },
      "-=0.8"
    );

    tl.fromTo(
      ctaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.6"
    );
  }, []);

  const handleScrollToTickets = () => {
    const target = document.getElementById("billetterie");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center pt-48 md:pt-56 pb-20 overflow-hidden bg-dark"
    >
      {/* High-quality background generated picture with dark high-contrast overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/bazookaland_hero_1783338869585.jpg"
          alt="Bazookaland Festival Vibe"
          className="w-full h-full object-cover object-center filter saturate-75 brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-dark/40 z-10" />
        <div className="absolute inset-0 bg-black/30 z-10" />
      </div>

      {/* Hero content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Huge Festival Title */}
        <h1
          ref={titleRef}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display text-cream leading-none tracking-wider mb-6 md:mb-8 flex flex-col"
        >
          <span className="hover:text-orange-dark transition-colors duration-300">BAZOOKA</span>
          <span className="text-orange-dark hover:text-cream transition-colors duration-300">LAND</span>
        </h1>

        {/* Tag line with icons (Moved below title to prevent overlapping with header nav) */}
        <div
          ref={subtitleRef}
          className="flex flex-wrap items-center justify-center gap-3 mb-8 md:mb-10 bg-orange-dark/10 backdrop-blur-md border border-orange-dark/20 px-5 py-2.5 rounded-full text-orange-dark font-mono text-xs tracking-widest uppercase"
        >
          <span className="flex items-center gap-1.5 font-bold">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> AKAF FAMILY PRÉSENTE
          </span>
          <span className="text-cream/30">|</span>
          <span className="flex items-center gap-1.5 text-cream">
            <MapPin className="w-3.5 h-3.5 text-orange-dark" /> LOMÉ, TOGO
          </span>
        </div>

        {/* Description & slogan & buttons */}
        <div ref={ctaRef} className="flex flex-col items-center gap-6 md:gap-8 w-full">
          <p className="max-w-xl text-cream/80 text-sm sm:text-base md:text-lg font-sans tracking-wide leading-relaxed font-medium">
             Le plus grand événement de culture urbaine et de musique à Lomé.
            Deux jours intenses de vibrations, d’énergie et de créativité. 
          </p>

          <div className="text-orange-dark font-syne font-black uppercase text-base sm:text-xl tracking-widest">
            " FOR THE CULTURE !!! "
          </div>

          {/* Action buttons with strict no-overlap design */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mt-4 md:mt-6 w-full max-w-md mx-auto">
            <button
              onClick={handleScrollToTickets}
              className="w-full sm:w-auto px-8 py-4 bg-orange-dark hover:bg-orange-dark/95 text-dark font-mono text-xs font-bold uppercase tracking-widest rounded-none shadow-lg transition-all duration-300 cursor-pointer transform hover:translate-y-[-2px] active:translate-y-0 text-center"
            >
              PRENDRE MON TICKET
            </button>
            <button
              onClick={() => {
                const target = document.getElementById("programme");
                if (target) target.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-cream/20 hover:border-orange-dark hover:text-orange-dark text-cream font-mono text-xs font-bold uppercase tracking-widest rounded-none transition-all duration-300 cursor-pointer transform hover:translate-y-[-2px] active:translate-y-0 text-center"
            >
              VOIR LE PROGRAMME
            </button>
          </div>

          {/* Animated scroll down indicator */}
          <div className="flex flex-col items-center gap-2 mt-12 md:mt-16 animate-pulse">
            <span className="font-mono text-[10px] tracking-widest text-cream/40 uppercase">SCROLLER</span>
            <div className="p-2 bg-cream/5 border border-cream/10 rounded-full animate-bounce">
              <ArrowDown className="w-4 h-4 text-orange-dark" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
