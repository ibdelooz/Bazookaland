import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TICKET_DATA, TicketType } from "../data";
import { Plus, Minus, Ticket, Check, ShieldAlert } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface BilletterieProps {
  onAddTickets: (quantities: { [key: string]: number }, prices: { [key: string]: number }) => void;
}

export default function Billetterie({ onAddTickets }: BilletterieProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  
  // Quantities for each ticket
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({
    pass_1j: 0,
    pass_2j: 0,
    pass_vip_1j: 0,
    pass_vip_2j: 0,
    culture_support: 0,
  });

  // Slider price for the free price item
  const [supportPrice, setSupportPrice] = useState(3000);

  // Success indicator message
  const [showSuccess, setShowSuccess] = useState(false);

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

    // Reveal ticket rows
    if (containerRef.current) {
      const rows = containerRef.current.querySelectorAll(".ticket-row");
      gsap.fromTo(
        rows,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
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

  const handleIncrement = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  const handleDecrement = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, prev[id] - 1),
    }));
  };

  const calculateTotal = () => {
    let total = 0;
    TICKET_DATA.forEach((ticket) => {
      const q = quantities[ticket.id];
      if (ticket.isFreePrice) {
        total += q * supportPrice;
      } else {
        total += q * ticket.price;
      }
    });
    return total;
  };

  const handleSelectTickets = () => {
    const totalQty = (Object.values(quantities) as number[]).reduce((a, b) => a + b, 0);
    if (totalQty === 0) return;

    // Send data to App state
    const customPrices = {
      pass_1j: 5000,
      pass_2j: 8000,
      pass_vip_1j: 15000,
      pass_vip_2j: 25000,
      culture_support: supportPrice,
    };
    onAddTickets(quantities, customPrices);

    // Show temporary beautiful success alert
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      // Reset quantities for clean slate
      setQuantities({
        pass_1j: 0,
        pass_2j: 0,
        pass_vip_1j: 0,
        pass_vip_2j: 0,
        culture_support: 0,
      });
    }, 3000);
  };

  return (
    <section
      id="billetterie"
      ref={containerRef}
      className="py-24 sm:py-32 bg-cream text-dark"
    >
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div ref={headerRef} className="mb-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-10 h-[1.5px] bg-orange-dark"></span>
            <span className="font-mono text-xs tracking-widest text-orange-dark uppercase font-bold">
              OFFRES OFFICIELLES
            </span>
            <span className="w-10 h-[1.5px] bg-orange-dark"></span>
          </div>
          <h2 className="font-display text-5xl sm:text-7xl tracking-wider text-dark uppercase mb-4">
            BILLETTERIE
          </h2>
          <p className="text-dark/70 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Achetez vos pass en toute sécurité. Les bracelets d'accès vous seront remis aux guichets d'entrée sur présentation de votre ticket.
          </p>
        </div>

        {/* Tickets Selector Card Widget */}
        <div className="bg-dark text-cream p-6 sm:p-10 shadow-2xl relative border border-orange-dark/10">
          
          <div className="flex items-center gap-3 border-b border-cream/10 pb-6 mb-8">
            <Ticket className="w-6 h-6 text-orange-dark animate-pulse" />
            <h3 className="font-mono text-xs uppercase tracking-widest font-bold">
              Sélectionnez vos places
            </h3>
          </div>

          <div className="flex flex-col gap-6">
            {TICKET_DATA.map((ticket) => (
              <div
                key={ticket.id}
                className="ticket-row flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-cream/5 border border-cream/5 hover:border-orange-dark/20 transition-all duration-300"
              >
                {/* Details Column */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-display text-lg sm:text-2xl tracking-wide">
                      {ticket.name}
                    </h4>
                  </div>
                  <p className="text-cream/60 text-xs sm:text-sm font-sans tracking-wide leading-relaxed max-w-xl">
                    {ticket.description}
                  </p>

                  {/* Free Price Slider Sub-Widget */}
                  {ticket.isFreePrice && quantities[ticket.id] > 0 && (
                    <div className="mt-4 p-4 bg-orange-dark/10 border border-orange-dark/20 flex flex-col gap-3">
                      <div className="flex justify-between font-mono text-xs font-bold text-orange-dark">
                        <span>MIN: {ticket.minPrice} FCFA</span>
                        <span>MONTANT: {supportPrice} FCFA</span>
                        <span>MAX: {ticket.maxPrice} FCFA</span>
                      </div>
                      <input
                        type="range"
                        min={ticket.minPrice}
                        max={ticket.maxPrice}
                        step="500"
                        value={supportPrice}
                        onChange={(e) => setSupportPrice(Number(e.target.value))}
                        className="w-full accent-orange-dark h-1 bg-cream/20 cursor-pointer"
                      />
                      <span className="text-[10px] font-mono text-cream/40">
                        * Votre don finance directement les infrastructures du festival et l'hébergement des artistes locaux.
                      </span>
                    </div>
                  )}
                </div>

                {/* Price & Counter Column */}
                <div className="flex items-center justify-between md:justify-end gap-6 border-t border-cream/5 md:border-0 pt-4 md:pt-0">
                  {/* Price Tag */}
                  <div className="flex flex-col md:items-end">
                    <span className="font-mono text-xs font-bold text-orange-dark uppercase tracking-wider">
                      TARIF
                    </span>
                    <span className="font-display text-xl sm:text-2xl">
                      {ticket.isFreePrice ? supportPrice : ticket.price} <span className="font-mono text-sm">{ticket.currency}</span>
                    </span>
                  </div>

                  {/* Counter Buttons */}
                  <div className="flex items-center bg-cream/10 p-1.5 border border-cream/10">
                    <button
                      onClick={() => handleDecrement(ticket.id)}
                      className="p-1 text-cream/60 hover:text-orange-dark transition-colors cursor-pointer"
                      aria-label="Diminuer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-mono text-sm font-bold w-10 text-center select-none text-cream">
                      {quantities[ticket.id]}
                    </span>
                    <button
                      onClick={() => handleIncrement(ticket.id)}
                      className="p-1 text-cream/60 hover:text-orange-dark transition-colors cursor-pointer"
                      aria-label="Augmenter"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Alert of success adding */}
          {showSuccess && (
            <div className="mt-8 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-bold flex items-center gap-2 justify-center animate-bounce">
              <Check className="w-5 h-5" /> TICKETS AJOUTÉS AU PANIER AVEC SUCCÈS !
            </div>
          )}

          {/* Pricing Summary & Checkout Button */}
          <div className="mt-10 border-t border-cream/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-col text-center sm:text-left">
              <span className="font-mono text-xs font-bold text-cream/50 uppercase tracking-widest">
                MONTANT TOTAL SÉLECTIONNÉ
              </span>
              <span className="font-display text-3xl sm:text-4xl text-orange-dark">
                {calculateTotal()} <span className="font-mono text-lg">FCFA</span>
              </span>
            </div>

            <button
              onClick={handleSelectTickets}
              disabled={calculateTotal() === 0}
              className={`w-full sm:w-auto px-10 py-5 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 transform rounded-none cursor-pointer flex items-center justify-center gap-2 ${
                calculateTotal() > 0
                  ? "bg-orange-dark text-dark hover:bg-cream hover:text-dark hover:translate-y-[-2px] shadow-lg shadow-orange-dark/10"
                  : "bg-cream/10 text-cream/30 cursor-not-allowed border border-cream/5"
              }`}
            >
              SÉLECTIONNER LES TICKETS
            </button>
          </div>

          {/* Secure transaction notice */}
          <div className="mt-6 flex items-center gap-2 justify-center font-mono text-[10px] text-cream/30">
            <ShieldAlert className="w-3.5 h-3.5 text-orange-dark" />
            <span>Paiement sécurisé local ou par Mobile Money disponible à Lomé.</span>
          </div>

        </div>

      </div>
    </section>
  );
}
