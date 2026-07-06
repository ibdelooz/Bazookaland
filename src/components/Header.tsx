import { useState, useEffect } from "react";
import { Instagram, ShoppingBag, Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export default function Header({ cartCount, onOpenCart }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
          isScrolled
            ? "py-3 bg-dark/95 backdrop-blur-md border-orange-dark/10 h-16"
            : "py-6 bg-transparent border-transparent h-24"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo with festival vibe */}
          <a
            href="#"
            className="flex items-center gap-2 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="font-display text-2xl md:text-3xl tracking-wider text-cream group-hover:text-orange-dark transition-colors duration-300">
              BAZOOKA<span className="text-orange-dark group-hover:text-cream">LAND</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {["PROGRAMME", "DESCRIPTION", "BILLETTERIE", "FAQ"].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item.toLowerCase())}
                className="font-mono text-xs tracking-widest text-cream/70 hover:text-orange-dark hover:translate-y-[-1px] transition-all duration-300 uppercase cursor-pointer relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-orange-dark after:transition-all after:duration-300 hover:after:w-full"
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Action icons & Mobile toggle */}
          <div className="flex items-center gap-5">
            {/* Instagram Link */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-cream/80 hover:text-orange-dark hover:scale-110 transition-all duration-300 hidden sm:flex"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>

            {/* Shopping Cart Indicator */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full border border-cream/10 hover:border-orange-dark/50 hover:bg-orange-dark/10 text-cream hover:text-orange-dark transition-all duration-300 flex items-center justify-center cursor-pointer group"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-dark text-dark font-mono text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger for mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-cream hover:text-orange-dark transition-colors duration-300 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[64px] z-40 bg-dark/98 backdrop-blur-lg flex flex-col justify-between p-8 md:hidden"
          >
            <div className="flex flex-col gap-6 pt-8">
              {["PROGRAMME", "DESCRIPTION", "BILLETTERIE", "FAQ"].map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item.toLowerCase())}
                  className="font-display text-4xl text-left tracking-wide text-cream hover:text-orange-dark transition-colors py-2 border-b border-cream/5"
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-6">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-cream/70 hover:text-orange-dark text-sm font-mono tracking-widest uppercase"
                >
                  <Instagram className="w-5 h-5" /> INSTAGRAM
                </a>
              </div>

              <div className="text-cream/40 text-xs font-mono">
                BAZOOKALAND FESTIVAL — LOMÉ, TOGO
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
