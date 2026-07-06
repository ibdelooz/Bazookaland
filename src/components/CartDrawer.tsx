import { useState, FormEvent } from "react";
import { TICKET_DATA, TicketType } from "../data";
import { X, Trash2, Plus, Minus, CreditCard, ShieldCheck, Mail, User, Phone, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartQuantities: { [key: string]: number };
  customPrices: { [key: string]: number };
  onUpdateCart: (id: string, qty: number) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartQuantities,
  customPrices,
  onUpdateCart,
  onClearCart,
}: CartDrawerProps) {
  const [step, setStep] = useState<"review" | "form" | "ticket">("review");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    paymentMethod: "tmoney",
  });
  const [orderNumber, setOrderNumber] = useState("");

  const activeItems = Object.entries(cartQuantities).filter(([_, qty]) => qty > 0);
  
  const calculateTotal = () => {
    return activeItems.reduce((acc, [id, qty]) => {
      const ticket = TICKET_DATA.find((t) => t.id === id);
      if (!ticket) return acc;
      const price = ticket.isFreePrice ? (customPrices[id] || 3000) : ticket.price;
      return acc + price * qty;
    }, 0);
  };

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;
    
    // Generate a beautiful mock order reference
    const ref = "BZO-" + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(ref);
    setStep("ticket");
  };

  const handleCompleteSuccess = () => {
    onClearCart();
    setStep("review");
    setFormData({ name: "", email: "", phone: "", paymentMethod: "tmoney" });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer Body */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-[101] w-full max-w-md bg-dark text-cream border-l border-cream/10 shadow-2xl flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-cream/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-display text-xl sm:text-2xl tracking-wide">
                  MON PANIER
                </span>
                <span className="px-2 py-0.5 bg-orange-dark/10 border border-orange-dark/30 text-orange-dark text-[10px] font-mono rounded">
                  {activeItems.reduce((acc, [_, q]) => acc + q, 0)} TICKETS
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:text-orange-dark transition-colors cursor-pointer rounded-full border border-cream/5 hover:border-orange-dark/20"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6">
              
              {/* STEP 1: REVIEW CART ITEMS */}
              {step === "review" && (
                <div className="flex flex-col gap-6 h-full">
                  {activeItems.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-20">
                      <div className="w-16 h-16 bg-cream/5 border border-cream/10 rounded-full flex items-center justify-center text-cream/40 mb-2">
                        <Trash2 className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-sm text-cream/60 uppercase tracking-widest font-bold">Votre panier est vide</span>
                      <p className="text-xs text-cream/40 max-w-xs leading-relaxed">
                        Parcourez la billetterie officielle ci-dessous pour réserver vos pass pour Bazookaland 2026 !
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {activeItems.map(([id, qty]) => {
                        const ticket = TICKET_DATA.find((t) => t.id === id);
                        if (!ticket) return null;
                        const price = ticket.isFreePrice ? (customPrices[id] || 3000) : ticket.price;

                        return (
                          <div
                            key={id}
                            className="p-4 bg-cream/5 border border-cream/5 flex flex-col gap-3"
                          >
                            <div className="flex justify-between items-start gap-2">
                              <div>
                                <h4 className="font-display text-base tracking-wide text-cream">
                                  {ticket.name}
                                </h4>
                                <p className="text-[11px] text-cream/40 font-mono uppercase tracking-wider mt-0.5">
                                  {price} FCFA / unité
                                </p>
                              </div>
                              <button
                                onClick={() => onUpdateCart(id, 0)}
                                className="text-cream/40 hover:text-red-400 transition-colors cursor-pointer"
                                aria-label="Supprimer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="flex items-center justify-between border-t border-cream/5 pt-3">
                              <span className="font-mono text-xs font-bold text-orange-dark">
                                SOUS-TOTAL: {price * qty} FCFA
                              </span>

                              {/* Counter mini */}
                              <div className="flex items-center bg-cream/10 p-1 border border-cream/10 text-xs">
                                <button
                                  onClick={() => onUpdateCart(id, Math.max(0, qty - 1))}
                                  className="p-1 text-cream/60 hover:text-orange-dark cursor-pointer"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="font-mono px-3 select-none">{qty}</span>
                                <button
                                  onClick={() => onUpdateCart(id, qty + 1)}
                                  className="p-1 text-cream/60 hover:text-orange-dark cursor-pointer"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* STEP 2: CHECKOUT INFO FORM */}
              {step === "form" && (
                <form onSubmit={handleCheckoutSubmit} className="flex flex-col gap-5">
                  <div className="mb-4">
                    <span className="font-mono text-[10px] text-orange-dark font-bold block mb-1 uppercase tracking-widest">
                      ÉTAPE FINALE
                    </span>
                    <h3 className="font-display text-xl tracking-wide uppercase">
                      Informations de Commande
                    </h3>
                  </div>

                  {/* Name field */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] text-cream/50 uppercase tracking-widest font-bold flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-orange-dark" /> Nom & Prénom
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Koffi Mensah"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-cream/5 border border-cream/10 px-4 py-3 text-sm font-sans tracking-wide text-cream focus:border-orange-dark focus:outline-none focus:bg-cream/10"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] text-cream/50 uppercase tracking-widest font-bold flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-orange-dark" /> Adresse E-mail
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Ex: koffi@mail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-cream/5 border border-cream/10 px-4 py-3 text-sm font-sans tracking-wide text-cream focus:border-orange-dark focus:outline-none focus:bg-cream/10"
                    />
                  </div>

                  {/* Phone field */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] text-cream/50 uppercase tracking-widest font-bold flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-orange-dark" /> Numéro de Téléphone
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ex: +228 90 12 34 56"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-cream/5 border border-cream/10 px-4 py-3 text-sm font-sans tracking-wide text-cream focus:border-orange-dark focus:outline-none focus:bg-cream/10"
                    />
                  </div>

                  {/* Payment method */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] text-cream/50 uppercase tracking-widest font-bold flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-orange-dark" /> Moyen de Paiement
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: "tmoney", label: "T-Money (Togo)" },
                        { id: "moov", label: "Moov Money" },
                        { id: "flooz", label: "Flooz" },
                        { id: "card", label: "Carte Bancaire" },
                      ].map((item) => (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => setFormData({ ...formData, paymentMethod: item.id })}
                          className={`p-3 text-center text-xs font-mono font-bold tracking-wider uppercase border cursor-pointer ${
                            formData.paymentMethod === item.id
                              ? "bg-orange-dark/25 border-orange-dark text-orange-dark"
                              : "bg-cream/5 border-cream/10 text-cream/70 hover:border-cream/20"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-orange-dark/5 border border-orange-dark/15 text-[10px] font-mono text-cream/50 leading-relaxed">
                    * En soumettant cette commande, vous simulez un achat réel sur notre passerelle d'accès officielle pour Bazookaland 2026.
                  </div>
                </form>
              )}

              {/* STEP 3: MOCK DIGITAL PASSES */}
              {step === "ticket" && (
                <div className="flex flex-col gap-6 items-center text-center">
                  <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center animate-bounce">
                    <CheckCircle className="w-8 h-8" />
                  </div>

                  <div>
                    <span className="font-mono text-[10px] text-emerald-400 font-black block mb-1 uppercase tracking-widest">
                      COMMANDE CONFIRMÉE
                    </span>
                    <h3 className="font-display text-2xl tracking-wide uppercase">
                      VOS BRACELETS SONT PRÊTS !
                    </h3>
                  </div>

                  {/* High Fidelity Digital Ticket Card */}
                  <div className="w-full bg-cream text-dark p-6 border-2 border-dark flex flex-col gap-5 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 px-2 py-0.5 bg-orange-dark text-dark font-mono text-[9px] font-black tracking-widest uppercase">
                      OFFICIEL
                    </div>

                    <div className="border-b border-dark/10 pb-4 text-left">
                      <span className="font-display text-lg tracking-wide block uppercase leading-none">
                        BAZOOKALAND FESTIVAL
                      </span>
                      <span className="font-mono text-[9px] text-dark/50 tracking-wider">
                        RÉF : {orderNumber}
                      </span>
                    </div>

                    <div className="flex flex-col gap-3 text-left font-sans text-xs">
                      <div>
                        <span className="text-dark/40 font-mono text-[9px] block uppercase font-bold">FESTIVALIER :</span>
                        <span className="font-bold text-sm tracking-wide text-dark uppercase">{formData.name}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-dark/40 font-mono text-[9px] block uppercase font-bold">CONTACT :</span>
                          <span className="font-bold text-dark">{formData.phone}</span>
                        </div>
                        <div>
                          <span className="text-dark/40 font-mono text-[9px] block uppercase font-bold">STATUT :</span>
                          <span className="font-bold text-emerald-600">PAYÉ / ACTIF</span>
                        </div>
                      </div>
                    </div>

                    {/* Styled Barcode/QR Mockup */}
                    <div className="border-t border-dashed border-dark/25 pt-5 flex flex-col items-center gap-3">
                      <div className="w-28 h-28 bg-dark p-2 flex items-center justify-center">
                        {/* Interactive vector barcode */}
                        <div className="w-full h-full flex flex-wrap gap-[2px] items-end justify-center">
                          {Array.from({ length: 32 }).map((_, i) => (
                            <div
                              key={i}
                              className="bg-cream"
                              style={{
                                width: `${(i % 3 === 0 ? 3 : i % 5 === 0 ? 1 : 2)}px`,
                                height: `${(35 + (i * 7) % 45)}%`
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="font-mono text-[9px] tracking-widest text-dark/60">
                        {orderNumber}
                      </span>
                    </div>

                    {/* Wave cut edges left/right */}
                    <div className="absolute left-[-6px] top-1/2 w-3 h-3 bg-dark rounded-full" />
                    <div className="absolute right-[-6px] top-1/2 w-3 h-3 bg-dark rounded-full" />
                  </div>

                  <p className="text-xs text-cream/60 leading-relaxed max-w-xs">
                    Présentez ce QR Code ou votre référence <strong className="text-orange-dark font-mono">{orderNumber}</strong> aux guichets d'entrée pour récupérer vos bracelets d'accès officiels. Un email de confirmation a été envoyé à <strong>{formData.email}</strong>.
                  </p>
                </div>
              )}

            </div>

            {/* Drawer Footer Actions */}
            {activeItems.length > 0 && (
              <div className="p-6 border-t border-cream/10 bg-cream/5">
                {step === "review" && (
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-end">
                      <span className="font-mono text-xs text-cream/40 uppercase tracking-widest">TOTAL</span>
                      <span className="font-display text-2xl text-orange-dark">
                        {calculateTotal()} <span className="font-mono text-sm">FCFA</span>
                      </span>
                    </div>

                    <button
                      onClick={() => setStep("form")}
                      className="w-full py-4 bg-orange-dark hover:bg-cream hover:text-dark text-dark font-mono text-xs font-bold uppercase tracking-widest transition-colors duration-300 rounded-none cursor-pointer"
                    >
                      PASSER LA COMMANDE
                    </button>
                  </div>
                )}

                {step === "form" && (
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setStep("review")}
                      className="flex-1 py-3 border border-cream/10 hover:border-cream/30 text-cream font-mono text-xs font-bold uppercase tracking-widest transition-colors rounded-none cursor-pointer"
                    >
                      RETOUR
                    </button>
                    <button
                      onClick={handleCheckoutSubmit}
                      disabled={!formData.name || !formData.email || !formData.phone}
                      className={`flex-1 py-3 font-mono text-xs font-bold uppercase tracking-widest transition-all rounded-none cursor-pointer ${
                        formData.name && formData.email && formData.phone
                          ? "bg-orange-dark text-dark hover:bg-cream hover:text-dark"
                          : "bg-cream/10 text-cream/30 cursor-not-allowed border border-cream/5"
                      }`}
                    >
                      PAYER MAINTENANT
                    </button>
                  </div>
                )}

                {step === "ticket" && (
                  <button
                    onClick={handleCompleteSuccess}
                    className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-dark font-mono text-xs font-bold uppercase tracking-widest transition-colors rounded-none cursor-pointer"
                  >
                    FERMER & TERMINER
                  </button>
                )}

                {/* Security Tag */}
                {step !== "ticket" && (
                  <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] font-mono text-cream/30">
                    <ShieldCheck className="w-3.5 h-3.5 text-orange-dark" />
                    <span>Transaction 100% Chiffrée & Sécurisée</span>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
