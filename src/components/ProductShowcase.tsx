import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";

type Product = {
  id: string;
  name: string;
  tagline: string;
  color: string;
  bgGradient: string;
  features: string[];
};

const products: Product[] = [
  {
    id: "regular",
    name: "Classic Drop",
    tagline: "The unapologetic original.",
    color: "#005CB9",
    bgGradient: "from-[#005CB9] to-[#001B3A]",
    features: ["Max Refreshment", "Real Sugar", "Classic Bite"],
  },
  {
    id: "zero",
    name: "Zero Gravity",
    tagline: "Maximum taste, zero compromise.",
    color: "#000000",
    bgGradient: "from-[#222222] to-[#000000]",
    features: ["Zero Sugar", "Bold Flavor", "No Limits"],
  },
  {
    id: "cherry",
    name: "Wild Cherry",
    tagline: "Rule the wild side.",
    color: "#EF3340",
    bgGradient: "from-[#EF3340] to-[#4A000D]",
    features: ["Cherry Blast", "Intense Sweetness", "Iconic Edge"],
  },
];

export function ProductShowcase() {
  const [activeProduct, setActiveProduct] = useState<Product>(products[0]);

  return (
    <section id="showcase" className="relative py-32 overflow-hidden transition-colors duration-700 ease-in-out" style={{ backgroundColor: activeProduct.bgGradient.split(' ')[1].replace('to-[', '').replace(']', '') }}>
      <div 
        className="absolute inset-0 opacity-50 bg-gradient-to-br transition-all duration-700"
        style={{ backgroundImage: `linear-gradient(to bottom right, ${activeProduct.bgGradient.split(' ')[0].replace('from-[', '').replace(']', '')}, ${activeProduct.bgGradient.split(' ')[1].replace('to-[', '').replace(']', '')})` }}
      />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-6xl uppercase text-white mb-4">
            Limited Edition <span className="text-[#EF3340]">Flavors</span>
          </h2>
          <p className="text-blue-100 font-sans max-w-2xl mx-auto text-lg leading-relaxed">
            Select your weapon. These rare drops are engineered for maximum refreshment.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Interaction List */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            {products.map((prod) => (
              <div
                key={prod.id}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveProduct(prod);
                  }
                }}
                onClick={() => setActiveProduct(prod)}
                className={`text-left p-6 rounded-2xl glass transition-all duration-300 cursor-pointer ${
                  activeProduct.id === prod.id 
                    ? "opacity-100 scale-100 shadow-[0_0_30px_rgba(255,255,255,0.1)] border-white/30" 
                    : "opacity-50 scale-95 hover:opacity-80"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-display font-bold text-2xl uppercase text-white flex items-center gap-3">
                    <span className="w-4 h-4 rounded-full shadow-[0_0_10px_currentColor] hidden sm:block" style={{ backgroundColor: prod.color, color: prod.color }} />
                    {prod.name}
                  </h3>
                  <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-transform ${activeProduct.id === prod.id ? "rotate-45 bg-white/20" : ""}`}>
                    <Plus className="w-4 h-4 text-white" />
                  </div>
                </div>
                <p className="text-gray-400 font-sans mb-4">{prod.tagline}</p>
                
                <AnimatePresence>
                  {activeProduct.id === prod.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <ul className="flex flex-wrap gap-2 pt-2 border-t border-white/10 mt-2">
                        {prod.features.map((f, i) => (
                          <li key={i} className="text-xs font-bold text-white uppercase tracking-wider bg-white/10 px-3 py-1.5 rounded-sm">
                            {f}
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-6 flex justify-start">
                         <button 
                            className="relative overflow-hidden bg-[#EF3340] text-white px-8 py-3 rounded-full font-black text-sm cta-glow whitespace-nowrap transition-transform hover:scale-105"
                         >
                            <span className="relative z-10 flex items-center gap-2">Add to Crate</span>
                         </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Visual Display */}
          <div className="w-full lg:w-1/2 flex justify-center h-[500px] relative">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeProduct.id}
                initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.2, rotate: -10 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none"
              >
                 {/* Visual Representation of the Product */}
                 <div
                   className="w-full max-w-[300px] h-full rounded-[40px] can-shadow border-t-4 flex flex-col justify-between py-12 px-6"
                   style={{ backgroundColor: activeProduct.color, borderColor: activeProduct.id === "zero" ? "#333" : "#005CB9" }}
                 >
                    <div className="text-center w-full">
                       <h4 className="font-display font-black text-6xl text-white drop-shadow-xl transform -rotate-90 translate-y-24 scale-150 opacity-90">{activeProduct.name.split(' ')[0]}</h4>
                    </div>
                 </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
