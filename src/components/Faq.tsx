import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FAQ_DATA, FaqItem } from "../data";
import { ChevronDown, MessageSquare } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reveal header
    gsap.fromTo(
      headerRef.current,
      { y: 40, opacity: 0 },
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

    // Reveal accordion items
    if (containerRef.current) {
      const items = containerRef.current.querySelectorAll(".faq-item-row");
      gsap.fromTo(
        items,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
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

  const handleToggle = (id: string) => {
    setActiveIndex((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      ref={containerRef}
      className="py-24 sm:py-32 bg-cream text-dark border-t border-dark/10"
    >
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div ref={headerRef} className="mb-16 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
            <span className="w-10 h-[1.5px] bg-orange-dark"></span>
            <span className="font-mono text-xs tracking-widest text-orange-dark uppercase font-bold">
              QUESTIONS / RÉPONSES
            </span>
          </div>
          <h2 className="font-display text-5xl sm:text-7xl tracking-wider text-dark uppercase mb-4">
            INFOS & FAQ
          </h2>
          <p className="text-dark/70 text-sm sm:text-base max-w-xl leading-relaxed">
            Tout ce qu'il faut savoir sur l'accès, la sécurité, les consommations et le déroulement du festival Bazookaland.
          </p>
        </div>

        {/* Custom Accordion List */}
        <div className="flex flex-col border-t-2 border-dark">
          {FAQ_DATA.map((item) => {
            const isOpen = activeIndex === item.id;
            return (
              <div
                key={item.id}
                className="faq-item-row border-b border-dark/15 flex flex-col group transition-colors duration-300"
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => handleToggle(item.id)}
                  className="w-full flex items-center justify-between py-6 sm:py-8 text-left cursor-pointer focus:outline-none select-none"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs font-bold text-orange-dark">
                      [ {item.id.toUpperCase()} ]
                    </span>
                    <h3 className="font-display text-lg sm:text-2xl tracking-wide group-hover:text-orange-dark transition-colors duration-300">
                      {item.question}
                    </h3>
                  </div>
                  
                  {/* Rotating Chevron wrapper */}
                  <div
                    className={`p-2 bg-dark/5 group-hover:bg-orange-dark/10 rounded-full text-dark group-hover:text-orange-dark transition-all duration-300 ${
                      isOpen ? "rotate-180 bg-orange-dark/10 text-orange-dark" : "rotate-0"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                  </div>
                </button>

                {/* Animated content box */}
                <div
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{
                    maxHeight: isOpen ? "400px" : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="pb-8 pl-4 pr-4 sm:pl-16 text-dark/80 text-xs sm:text-sm sm:text-base font-sans tracking-wide leading-relaxed max-w-3xl">
                    {item.answer}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
