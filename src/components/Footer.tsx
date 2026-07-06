import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Mail, Phone, Instagram, Youtube, Twitter, Heart, ArrowUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      className="bg-dark text-cream py-20 border-t border-cream/10"
    >
      <div
        ref={containerRef}
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16"
      >
        {/* Info Column (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-10">
          <div>
            {/* Logo */}
            <span className="font-display text-3xl sm:text-4xl tracking-wider text-cream block mb-6">
              BAZOOKA<span className="text-orange-dark">LAND</span>
            </span>

            {/* Slogan */}
            <p className="font-display text-4xl sm:text-5xl text-orange-dark leading-none tracking-wide uppercase mb-8">
              " FOR THE CULTURE !!! "
            </p>

            {/* Address cards */}
            <div className="flex flex-col gap-4 font-sans text-sm tracking-wide text-cream/70">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-dark shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-cream block">Lieu de l'événement :</span>
                  Esplanade de la Plage de Lomé (Face Hôtel de la Paix), Lomé, Togo
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-dark shrink-0" />
                <div>
                  <span className="font-bold text-cream">E-mail :</span> contact@akaf-family.com
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-dark shrink-0" />
                <div>
                  <span className="font-bold text-cream">Infoline :</span> +228 90 00 12 34 / +228 99 88 77 66
                </div>
              </div>
            </div>
          </div>

          {/* Social icons & credits */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-5">
              {[
                { icon: <Instagram className="w-5 h-5" />, url: "https://instagram.com" },
                { icon: <Youtube className="w-5 h-5" />, url: "https://youtube.com" },
                { icon: <Twitter className="w-5 h-5" />, url: "https://twitter.com" },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-cream/5 border border-cream/10 rounded-full hover:bg-orange-dark hover:text-dark hover:border-orange-dark hover:scale-110 transition-all duration-300 text-cream"
                >
                  {item.icon}
                </a>
              ))}
            </div>

            <div className="text-xs font-mono text-cream/40 flex items-center gap-1.5 flex-wrap">
              <span>© {new Date().getFullYear()} BAZOOKALAND.</span>
              <span>Propulsé par</span>
              <span className="text-orange-dark font-bold hover:underline cursor-pointer">
                AKAF FAMILY
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                Fait avec <Heart className="w-3 h-3 text-red-500 fill-red-500" /> à Lomé.
              </span>
            </div>
          </div>
        </div>

        {/* Map Column (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <span className="font-mono text-xs tracking-widest text-orange-dark uppercase font-bold">
            CARTE INTERACTIVE
          </span>

          {/* Maps iframe wrapper styled beautifully with borders and shadow */}
          <div className="relative w-full h-[280px] sm:h-[350px] bg-cream/5 border border-cream/10 p-2 shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.0423023063544!2d1.222370775878486!3d6.125026927568551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1023e1fa37a85eb7%3A0x6b49e8a719d9b62c!2sPlage%20de%20Lom%C3%A9!5e0!3m2!1sfr!2stg!4v1710000000000!5m2!1sfr!2stg"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(1.2)" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bazookaland Location Map"
            />
          </div>

          <div className="flex justify-between items-center text-xs font-mono text-cream/50 mt-1">
            <span>PLAGE DE LOMÉ, TOGO</span>
            <button
              onClick={handleScrollToTop}
              className="flex items-center gap-1.5 hover:text-orange-dark transition-colors font-bold uppercase cursor-pointer"
            >
              RETOURNER EN HAUT <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Legal terms bar */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-cream/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-mono text-cream/30">
        <div className="flex gap-6 flex-wrap justify-center">
          <a href="#" className="hover:text-cream transition-colors">Mentions Légales</a>
          <a href="#" className="hover:text-cream transition-colors">Politique de Confidentialité</a>
          <a href="#" className="hover:text-cream transition-colors">CGV de la Billetterie</a>
        </div>
        <div>
          <span>Bazookaland Event 2026. Tous droits réservés.</span>
        </div>
      </div>
    </footer>
  );
}
