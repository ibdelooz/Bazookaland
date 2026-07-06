import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles, Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Description() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Continuous badge rotation via GSAP
    if (badgeRef.current) {
      gsap.to(badgeRef.current, {
        rotation: 360,
        duration: 15,
        repeat: -1,
        ease: "none"
      });
    }

    // 2. ScrollTrigger reveal for description text
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }

    // 3. ScrollTrigger parallax / tilt for vignettes
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".vignette-card");
      gsap.fromTo(
        cards,
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.3,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: cardsRef.current,
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
      className="relative py-24 sm:py-32 liquid-gradient text-cream overflow-hidden border-y border-orange-dark/20"
    >
      {/* Dark organic noise/mesh overlay */}
      <div className="absolute inset-0 bg-dark/20 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-transparent to-dark/40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Column 1: Centered presentation text (Span 7) */}
          <div ref={textRef} className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-8">
            <div className="flex items-center gap-2 bg-cream/10 backdrop-blur-md border border-cream/20 px-4 py-2 rounded-full text-xs font-mono tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-orange-dark animate-pulse" />
              L'ÉVÉNEMENT DE L'ANNÉE
            </div>

            <h2 className="font-display text-4xl sm:text-6xl tracking-wider leading-none uppercase">
              BAZOOKALAND
            </h2>

            <p className="text-lg sm:text-2xl font-sans tracking-wide leading-relaxed text-cream/90 max-w-2xl font-medium">
              Bazookaland est l'épicentre culturel de Lomé. Un rassemblement vibrant célébrant la musique, l'art de rue et l'esprit urbain du Togo. 
              <br className="hidden sm:inline" />
              Initié par <span className="text-dark font-extrabold px-1.5 py-0.5 bg-cream rounded-sm font-mono text-xs">AKAF FAMILY</span>, ce festival insuffle un vent de créativité pure et authentique pour inspirer et rassembler.
            </p>

            <span className="text-xl sm:text-3xl font-syne font-black text-dark tracking-widest block uppercase py-1 px-3 bg-orange-dark/95 w-fit rounded-sm shadow-md">
              " FOR THE CULTURE !!! "
            </span>

            <button
              onClick={handleScrollToTickets}
              className="mt-4 flex items-center gap-3 px-8 py-4 bg-dark text-cream font-mono text-xs font-bold uppercase tracking-widest hover:bg-cream hover:text-dark transition-all duration-300 shadow-xl group cursor-pointer"
            >
              VOIR LES TICKETS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Column 2: Badge and Photo Vignettes (Span 5) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[350px]">
            
            {/* Spinning Circle Badge */}
            <div className="absolute top-[-40px] right-[-20px] lg:right-[20px] z-30 pointer-events-none">
              <div ref={badgeRef} className="relative w-40 h-40 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full text-cream select-none">
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
                {/* Center logo or star inside badge */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Star className="w-6 h-6 text-cream fill-cream animate-pulse" />
                </div>
              </div>
            </div>

            {/* Photo Vignettes Stack */}
            <div ref={cardsRef} className="relative w-full max-w-[280px] h-[340px] flex items-center justify-center">
              
              {/* Back Card: Artist */}
              <div className="vignette-card absolute w-full h-full bg-cream p-3 shadow-2xl rounded-none transform -rotate-6 translate-x-[-15px] translate-y-[-10px] z-10 flex flex-col border border-dark/10 group hover:rotate-0 transition-transform duration-500">
                <div className="w-full h-[80%] overflow-hidden bg-dark">
                  <img
                    src="/src/assets/images/bazookaland_artist_1783338894284.jpg"
                    alt="Artiste Bazookaland"
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 flex items-center justify-between pt-2">
                  <span className="font-mono text-[10px] text-dark/70 font-bold uppercase tracking-wider">SHOWCASE 2026</span>
                  <span className="font-mono text-[9px] text-orange-dark font-bold">LOMÉ, TG</span>
                </div>
              </div>

              {/* Front Card: Crowd energy */}
              <div className="vignette-card absolute w-full h-full bg-cream p-3 shadow-2xl rounded-none transform rotate-3 translate-x-[15px] translate-y-[15px] z-20 flex flex-col border border-dark/10 group hover:rotate-0 transition-transform duration-500">
                <div className="w-full h-[80%] overflow-hidden bg-dark">
                  <img
                    src="/src/assets/images/bazookaland_hero_1783338869585.jpg"
                    alt="Crowd Energy"
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 flex items-center justify-between pt-2">
                  <span className="font-mono text-[10px] text-dark/70 font-bold uppercase tracking-wider">AFRICA VIBES</span>
                  <span className="font-mono text-[9px] text-orange-dark font-bold">AKAF FAMILY</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
