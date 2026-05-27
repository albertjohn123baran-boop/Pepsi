import { motion } from "motion/react";
import React, { useState } from "react";
import { ArrowRight, CheckCircle, Zap } from "lucide-react";

export function Hero() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErrorMessage("Enter a valid email, fam.");
      return;
    }
    
    setStatus("loading");
    
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      if (!res.ok) {
        throw new Error("Failed to subscribe");
      }
      
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMessage("Something went wrong. Try again.");
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-[#001B3A]">
      {/* Background Graphic Elements */}
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-[#005CB9] opacity-20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] bg-[#EF3340] opacity-10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Copy Column */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <div className="inline-block px-3 py-1 bg-[#EF3340] text-xs font-black rounded mb-4 w-fit tracking-widest text-white">LIMITED EDITION</div>
          
          <h1 className="font-display text-[72px] md:text-[92px] leading-[0.9] mb-6 uppercase text-white">
            Taste The <br />
            <span className="text-transparent text-stroke">
              Unstoppable
            </span>
          </h1>
          
          <p className="text-lg text-blue-100 max-w-md mb-8 leading-relaxed font-sans">
            The Summer Drop is here. Experience the bold, crisp refreshment of our latest infusion. Grab your pack before it's gone.
          </p>

          <div className="w-full max-w-[440px]">
            
            {status === "success" ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 text-green-400 bg-green-400/10 p-4 rounded-xl border border-green-400/20"
              >
                <CheckCircle className="w-6 h-6" />
                <span className="font-medium">You're in! Check your inbox for the code.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex items-center p-1 glass rounded-full w-full">
                  <input
                    type="email"
                    placeholder="Enter email for 15% off..."
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if(status === "error") setStatus("idle");
                    }}
                    className="bg-transparent border-none outline-none px-6 text-sm flex-grow text-white placeholder:text-blue-200"
                  />
                <button 
                  type="submit" 
                  disabled={status === "loading"}
                  className="px-8 py-3 bg-[#EF3340] text-white rounded-full font-black text-sm cta-glow whitespace-nowrap transition-transform hover:scale-105 disabled:opacity-70"
                >
                  {status === "loading" ? "WAIT..." : "CLAIM MY DROP"}
                </button>
              </form>
            )}
            <p className="text-xs text-blue-300/60 mt-4 uppercase tracking-wider font-semibold px-4">{status === "error" ? errorMessage : "Strictly no spam. Unsubscribe anytime."}</p>
          </div>
        </motion.div>

        {/* Image / 3D Can Element Column */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative lg:h-[700px] flex items-center justify-center pointer-events-none"
        >
           {/* Abstract Floating Can Representation */}
           <motion.div
             animate={{ 
               y: [-15, 15, -15],
               rotateZ: [0, -2, 0],
             }}
             transition={{ 
               duration: 6, 
               repeat: Infinity, 
               ease: "easeInOut" 
             }}
             className="relative z-20 w-64 h-96 bg-[#005CB9] rounded-[40px] can-shadow border-t-4 border-blue-400 overflow-hidden"
           >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col w-full h-full items-center justify-center rotate-[-10deg]">
                 <div className="w-full h-32 bg-white flex flex-col justify-center overflow-hidden">
                    <div className="w-full h-1/2 bg-[#EF3340]"></div>
                    <div className="w-full h-1/2 bg-[#005CB9]"></div>
                 </div>
                 <span className="font-display text-4xl mt-4 italic text-white">PEPSI</span>
              </div>
           </motion.div>

           {/* Floating elements behind */}
           <motion.div 
             animate={{ y: [0, -20, 0] }} 
             transition={{ duration: 4, repeat: Infinity }}
             className="absolute top-10 right-10 w-12 h-12 bg-white opacity-40 rounded-full blur-md"
           />
           <motion.div 
             animate={{ x: [0, 20, 0] }} 
             transition={{ duration: 5, repeat: Infinity }}
             className="absolute bottom-20 left-10 w-16 h-16 bg-blue-400 opacity-20 rounded-full blur-xl"
           />
        </motion.div>

      </div>
    </section>
  );
}
