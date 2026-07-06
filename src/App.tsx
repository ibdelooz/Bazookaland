import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Programme from "./components/Programme";
import Description from "./components/Description";
import Billetterie from "./components/Billetterie";
import Faq from "./components/Faq";
import Sponsors from "./components/Sponsors";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";

export default function App() {
  const [cartQuantities, setCartQuantities] = useState<{ [key: string]: number }>({
    pass_1j: 0,
    pass_2j: 0,
    pass_vip_1j: 0,
    pass_vip_2j: 0,
    culture_support: 0,
  });

  const [customPrices, setCustomPrices] = useState<{ [key: string]: number }>({
    pass_1j: 5000,
    pass_2j: 8000,
    pass_vip_1j: 15000,
    pass_vip_2j: 25000,
    culture_support: 3000,
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add selected tickets from Billetterie selector widget
  const handleAddTickets = (
    quantities: Record<string, number>,
    prices: Record<string, number>
  ) => {
    setCartQuantities((prev) => {
      const updated: Record<string, number> = { ...prev };
      Object.keys(quantities).forEach((key) => {
        updated[key] = (updated[key] || 0) + quantities[key];
      });
      return updated;
    });

    setCustomPrices((prev) => ({
      ...prev,
      ...prices,
    }));
  };

  // Update specific cart item from within the Cart Drawer
  const handleUpdateCart = (id: string, qty: number) => {
    setCartQuantities((prev) => ({
      ...prev,
      [id]: qty,
    }));
  };

  // Clear cart completely upon successful checkout
  const handleClearCart = () => {
    setCartQuantities({
      pass_1j: 0,
      pass_2j: 0,
      pass_vip_1j: 0,
      pass_vip_2j: 0,
      culture_support: 0,
    });
  };

  // Compute total selected items count for sticky Header shopping bag
  const cartCount = (Object.values(cartQuantities) as number[]).reduce((a, b) => a + b, 0);

  return (
    <div className="relative min-h-screen bg-dark text-cream selection:bg-orange-dark selection:text-dark">
      {/* Sticky Header */}
      <Header cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />

      {/* Main Layout Stack */}
      <main>
        {/* Full-screen Hero Section */}
        <Hero />

        {/* Dates & Line-up Programme Section */}
        <Programme />

        {/* Liquid Gradient Description Section */}
        <Description />

        {/* Interactive Billetterie Section */}
        <Billetterie onAddTickets={handleAddTickets} />

        {/* Accordion FAQ Section */}
        <Faq />

        {/* Sponsors Logo Grid */}
        <Sponsors />
      </main>

      {/* Footer and interactive Map */}
      <Footer />

      {/* Sliding shopping cart drawer and mock checkout system */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartQuantities={cartQuantities}
        customPrices={customPrices}
        onUpdateCart={handleUpdateCart}
        onClearCart={handleClearCart}
      />
    </div>
  );
}

