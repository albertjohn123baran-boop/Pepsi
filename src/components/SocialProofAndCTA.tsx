import { useState, useEffect } from "react";
import { Star, ShieldCheck, Clock } from "lucide-react";
import { motion } from "motion/react";

const testimonials = [
  { id: 1, name: "Jessica R.", handle: "@jess_refresh", text: "The Wild Cherry drop is insane. Tastes like pure nostalgia but better.", rating: 5 },
  { id: 2, name: "Marcus T.", handle: "@marcus_t", text: "Copped the classic drop. The packaging is fire, shipped fast.", rating: 5 },
  { id: 3, name: "Elena V.", handle: "@elevates", text: "Zero Gravity hits different. I need a whole case before it's gone.", rating: 4 },
];

export function SocialProofAndCTA() {
  const [timeLeft, setTimeLeft] = useState({ hours: 48, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Simple mock countdown
    const targetDate = new Date().getTime() + 48 * 60 * 60 * 1000;
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="social" className="py-32 bg-[#001B3A] relative border-t border-white/5">
      {/* Testimonials Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-32">
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-4xl md:text-5xl uppercase text-white mb-4">
            Don't Just Take <span className="text-transparent text-stroke">Our Word For It.</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
             <motion.div 
               key={t.id}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="glass rounded-[32px] p-8 hover:bg-white/10 transition-colors"
             >
               <div className="flex gap-1 text-[#EF3340] mb-4">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className={`w-5 h-5 ${idx < t.rating ? "fill-current" : "text-gray-600"}`} />
                  ))}
               </div>
               <p className="text-lg text-gray-200 font-sans mb-6 leading-relaxed">"{t.text}"</p>
               <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <div>
                    <h4 className="font-bold text-white font-sans">{t.name}</h4>
                    <p className="text-gray-500 text-sm">{t.handle}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#005CB9]/20 flex items-center justify-center">
                    <span className="font-display font-black text-xl text-[#005CB9]">P</span>
                  </div>
               </div>
             </motion.div>
          ))}
        </div>
      </div>

      {/* Final CTA Block */}
      <div id="checkout" className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="relative rounded-[40px] bg-gradient-to-br from-[#005CB9] to-[#001B3A] p-1 shadow-[0_0_80px_rgba(0,92,230,0.3)] overflow-hidden"
         >
            {/* Inner background to create border effect */}
            <div className="bg-[#001B3A] rounded-[38px] p-8 md:p-16 text-center relative overflow-hidden">
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#EF3340]/20 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
               <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#005CB9]/20 blur-[100px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/4" />
               
               <div className="relative z-10">
                  <div className="inline-block px-3 py-1 bg-[#EF3340]/20 text-[#EF3340] border border-[#EF3340]/30 text-xs font-black rounded mb-6 w-fit tracking-widest uppercase">
                    Limited Time Summer Drop
                  </div>

                  <h2 className="font-display text-5xl md:text-7xl uppercase text-white mb-8 whitespace-pre-line leading-[0.9]">
                    Skip The Line.<br/>
                    <span className="text-[#005CB9]">Grab The Drop.</span>
                  </h2>

                  {/* Countdown Timer */}
                  <div className="flex items-center justify-center gap-4 mb-10">
                     <div className="flex flex-col items-center">
                        <div className="w-20 h-24 glass text-4xl md:text-5xl font-mono text-white flex items-center justify-center rounded-2xl shadow-inner font-bold">
                          {String(timeLeft.hours).padStart(2, '0')}
                        </div>
                        <span className="text-xs uppercase text-gray-400 mt-2 font-bold tracking-widest">Hours</span>
                     </div>
                     <span className="text-4xl text-[#005CB9] font-bold pb-6">:</span>
                     <div className="flex flex-col items-center">
                        <div className="w-20 h-24 glass text-4xl md:text-5xl font-mono text-white flex items-center justify-center rounded-2xl shadow-inner font-bold">
                          {String(timeLeft.minutes).padStart(2, '0')}
                        </div>
                        <span className="text-xs uppercase text-gray-400 mt-2 font-bold tracking-widest">Mins</span>
                     </div>
                     <span className="text-4xl text-[#005CB9] font-bold pb-6">:</span>
                     <div className="flex flex-col items-center">
                        <div className="w-20 h-24 glass text-4xl md:text-5xl font-mono text-[#EF3340] flex items-center justify-center rounded-2xl shadow-inner font-bold">
                          {String(timeLeft.seconds).padStart(2, '0')}
                        </div>
                        <span className="text-xs uppercase text-gray-400 mt-2 font-bold tracking-widest">Secs</span>
                     </div>
                  </div>

                  {/* Checkout Button */}
                  <button className="w-full md:w-auto bg-[#EF3340] hover:bg-white text-white hover:text-black text-xl font-display uppercase tracking-widest px-12 py-6 rounded-full transition-all duration-300 cta-glow hover:-translate-y-1 flex items-center justify-center gap-4 mx-auto group">
                    Instant Checkout
                    <ShieldCheck className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                  </button>
                  <p className="text-gray-500 text-sm mt-6 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Secure encrypted checkout
                  </p>
               </div>
            </div>
         </motion.div>
      </div>

      {/* Footer */}
      <footer className="mt-32 border-t border-white/10 pt-10 pb-20 text-center bg-[#001B3A] relative z-10 px-6">
        <div className="font-display text-4xl tracking-tight text-white mb-6 uppercase opacity-20">Pepsi Drop</div>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 font-sans font-medium hover:*:text-white *:transition-colors mb-6">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookie Policy</a>
          <a href="#">Do Not Sell My Info</a>
        </div>
        <p className="text-xs text-gray-600 max-w-2xl mx-auto">
           *15% off applies to first-time email subscribers only. Limited time offer. Pepsi and the Pepsi Globe are registered trademarks of PepsiCo, Inc.<br/>
           This site is a promotional demo created for internal guidelines.
        </p>
      </footer>
    </section>
  );
}
