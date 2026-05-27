import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 relative z-50">
          {/* Faux Logo using shapes, or simple text for now */}
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
            <div className="flex flex-col w-full h-full">
              <div className="w-full h-1/2 bg-[#EF3340]" />
              <div className="w-full h-1/2 bg-[#005CB9]" />
            </div>
          </div>
          <span className="font-display font-black text-xl tracking-tighter text-white uppercase">
            Pepsi
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-sans font-bold uppercase tracking-widest text-sm text-gray-200">
          <a href="#hero" className="hover:text-white transition-colors">The Drop</a>
          <a href="#showcase" className="hover:text-white transition-colors">Flavors</a>
          <a href="#social" className="hover:text-white transition-colors">Community</a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button className="text-white hover:text-pepsi-light-blue transition-colors p-2">
            <ShoppingCart className="w-5 h-5" />
          </button>
          <a
            href="#checkout"
            className="bg-white text-[#001B3A] px-6 py-2.5 rounded-full font-black text-xs transition-all cta-glow hover:scale-105"
          >
            SHOP NOW
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2 relative z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-pepsi-black border-b border-white/10 shadow-2xl p-6 flex flex-col gap-6 md:hidden"
          >
            <a href="#hero" className="text-lg font-bold font-display uppercase hover:text-pepsi-light-blue" onClick={() => setMobileMenuOpen(false)}>The Drop</a>
            <a href="#showcase" className="text-lg font-bold font-display uppercase hover:text-pepsi-light-blue" onClick={() => setMobileMenuOpen(false)}>Flavors</a>
            <a href="#social" className="text-lg font-bold font-display uppercase hover:text-pepsi-light-blue" onClick={() => setMobileMenuOpen(false)}>Community</a>
            <a href="#checkout" className="bg-pepsi-red text-center py-3 rounded-full font-bold uppercase tracking-widest text-sm" onClick={() => setMobileMenuOpen(false)}>Shop Now</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
