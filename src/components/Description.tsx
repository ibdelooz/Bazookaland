import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles, Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Description() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Continuous badge rotation via GSAP
    if (badgeRef.current) {
      gsap.to(badgeRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      });
    }

    // 2. ScrollTrigger reveal for description text card
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }

    // 3. ScrollTrigger subtle entrance for collage photos
    if (collageRef.current) {
      const photos = collageRef.current.querySelectorAll(".collage-photo");
      gsap.fromTo(
        photos,
        { scale: 0.8, opacity: 0, y: 60 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.4,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: collageRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);

  const handleScrollToTickets = () => {
    const target = document.getElementById("billetterie");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="description"
      ref={containerRef}
      className="relative min-h-[850px] lg:min-h-[950px] py-24 md:py-32 liquid-gradient text-cream overflow-hidden border-y border-orange-dark/30 flex items-center justify-center"
    >
      {/* Gritty Film Grain Noise Overlay covering the whole section */}
      <div className="absolute inset-0 grainy-noise pointer-events-none z-10" />
      
      {/* Dark organic shadow overlay for deep visual contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-transparent to-dark/60 pointer-events-none z-0" />

      {/* Massive Background Catchphrase - Layered behind front photos but over background */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-10 opacity-80">
        <span className="font-display font-black text-[12vw] sm:text-[10vw] tracking-tighter leading-none text-white/90 uppercase text-center transform -rotate-2 whitespace-nowrap">
          POUR LES BILLETS
        </span>
      </div>

      {/* Scrapbook Collage: Overlapping organic photos around the section */}
      <div ref={collageRef} className="absolute inset-0 w-full h-full pointer-events-none z-10">
        
        {/* Photo 1: Top-Left (Dance stage energy) */}
        <div className="collage-photo absolute top-8 left-[-4%] md:left-[2%] w-36 sm:w-56 md:w-64 aspect-[4/3] shadow-2xl border border-white/20 transform -rotate-6 pointer-events-auto hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-300 overflow-hidden">
          <img
            src="/src/assets/images/bazookaland_dance_1783341760375.jpg"
            alt="Dancers at Bazookaland"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Photo 2: Top-Right (Crowd with stage lights) */}
        <div className="collage-photo absolute top-4 right-[-6%] md:right-[3%] w-44 sm:w-64 md:w-80 aspect-[4/3] shadow-2xl border border-white/20 transform rotate-3 pointer-events-auto hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-300 overflow-hidden">
          <img
            src="/src/assets/images/bazookaland_crowd_1783341746949.jpg"
            alt="Festival crowd"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Photo 3: Mid-Left (Artist close up) */}
        <div className="collage-photo absolute bottom-24 left-[-5%] md:left-[5%] w-32 sm:w-48 md:w-56 aspect-[3/4] shadow-2xl border border-white/20 transform -rotate-3 pointer-events-auto hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-300 overflow-hidden hidden sm:block">
          <img
            src="/src/assets/images/bazookaland_artist_1783338894284.jpg"
            alt="Bazookaland performance"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Photo 4: Bottom-Right (Singer spotlight orange theme) */}
        <div className="collage-photo absolute bottom-8 right-[-4%] md:right-[2%] w-40 sm:w-60 md:w-72 aspect-[3/4] shadow-2xl border border-white/20 transform rotate-4 pointer-events-auto hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-300 overflow-hidden">
          <img
            src="/src/assets/images/bazookaland_singer_1783341775079.jpg"
            alt="Live performance singer"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Photo 5: Bottom-Left (General crowd energy) */}
        <div className="collage-photo absolute bottom-6 left-[-2%] sm:left-[1%] md:left-[12%] w-36 sm:w-56 aspect-[4/3] shadow-2xl border border-white/20 transform -rotate-2 pointer-events-auto hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-300 overflow-hidden">
          <img
            src="/src/assets/images/bazookaland_hero_1783338869585.jpg"
            alt="Bazookaland culture crowd"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

      </div>

      {/* Main text container card styled on top of the collage */}
      <div className="max-w-7xl mx-auto px-6 relative z-20 flex flex-col items-center">
        
        <div
          ref={textRef}
          className="max-w-2xl bg-dark/75 backdrop-blur-md border border-white/10 p-8 md:p-12 text-center flex flex-col items-center gap-6 shadow-2xl relative"
        >
          {/* Tag */}
          <div className="flex items-center gap-2 bg-cream/10 backdrop-blur-sm border border-cream/20 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-orange-dark animate-pulse" />
            L'ÉVÉNEMENT DE L'ANNÉE
          </div>

          {/* Section Title */}
          <h2 className="font-display text-4xl sm:text-6xl tracking-wider leading-none uppercase text-cream">
            BAZOOKALAND
          </h2>

          {/* Description Paragraph */}
          <p className="text-base sm:text-lg md:text-xl font-sans tracking-wide leading-relaxed text-cream/90 font-medium">
            Bazookaland est l'épicentre culturel de Lomé. Un rassemblement vibrant célébrant la musique, l'art de rue et l'esprit urbain du Togo. 
            <br className="mt-4 block" />
            Initié par <span className="text-dark font-extrabold px-1.5 py-0.5 bg-cream rounded-none font-mono text-xs uppercase">AKAF FAMILY</span>, ce festival insuffle un vent de créativité pure et authentique pour inspirer et rassembler.
          </p>

          {/* "FOR THE CULTURE" Badge Slogan */}
          <div className="text-lg sm:text-2xl font-syne font-black text-dark tracking-widest uppercase py-1.5 px-4 bg-orange-dark/95 rounded-none shadow-md mt-2">
            " FOR THE CULTURE !!! "
          </div>

          {/* CTA Action Button */}
          <button
            onClick={handleScrollToTickets}
            className="mt-4 flex items-center gap-3 px-8 py-4 bg-cream text-dark font-mono text-xs font-bold uppercase tracking-widest hover:bg-orange-dark hover:text-dark transition-all duration-300 shadow-xl group cursor-pointer"
          >
            VOIR LES TICKETS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

      {/* Spinning Circle Badge - Positioned relative to bottom right collage */}
      <div className="absolute bottom-20 right-4 sm:right-10 md:right-20 z-25 pointer-events-none">
        <div ref={badgeRef} className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full text-cream select-none filter drop-shadow-lg">
            <path
              id="badgePath"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              fill="none"
            />
            <text className="font-mono text-[7px] uppercase fill-cream tracking-widest font-black">
              <textPath href="#badgePath" startOffset="0%">
                ★ BAZOOKALAND ★ FOR THE CULTURE ★ LOMÉ 2026 ★ AKAF FAMILY
              </textPath>
            </text>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <Star className="w-5 h-5 text-cream fill-cream animate-pulse" />
          </div>
        </div>
      </div>

      {/* Custom Film Reel/Knob Icon in Bottom-Left */}
      <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-25 flex items-center justify-center pointer-events-auto">
        <div className="w-12 h-12 rounded-full bg-dark/90 border-2 border-white/40 flex items-center justify-center shadow-2xl hover:rotate-180 transition-transform duration-700 cursor-pointer">
          <svg viewBox="0 0 100 100" className="w-6 h-6 text-cream fill-current">
            <circle cx="50" cy="50" r="10" />
            <circle cx="50" cy="22" r="8" />
            <circle cx="50" cy="78" r="8" />
            <circle cx="22" cy="50" r="8" />
            <circle cx="78" cy="50" r="8" />
          </svg>
        </div>
      </div>

    </section>
  );
}
