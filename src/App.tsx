import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Chatbot from './components/Chatbot';
import { Sparkles, Gem, Crown, Wand2, Brush, Palette, Rocket } from 'lucide-react';

function App() {
  const { scrollY } = useScroll();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Prevent automatic scrolling by setting scroll-behavior to auto
    document.documentElement.style.scrollBehavior = 'auto';
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 640px)');
    
    setPrefersReducedMotion(mediaQuery.matches);
    setIsMobile(mobileQuery.matches);

    const handleMotionChange = () => setPrefersReducedMotion(mediaQuery.matches);
    const handleMobileChange = () => setIsMobile(mobileQuery.matches);
    
    mediaQuery.addEventListener('change', handleMotionChange);
    mobileQuery.addEventListener('change', handleMobileChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      mobileQuery.removeEventListener('change', handleMobileChange);
      // Reset scroll behavior on cleanup
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  const y1 = useTransform(scrollY, [0, 300], [0, isMobile ? 50 : 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, isMobile ? -75 : -150]);

  const features = [
    {
      icon: <Sparkles className="w-5 h-5" />,
      text: "AI-Powered Styling",
      bgColor: "bg-mauve-400/90",
      textColor: "text-white",
      delay: 0
    },
    {
      icon: <Gem className="w-5 h-5" />,
      text: "Personalized Advice",
      bgColor: "bg-rose-400/90",
      textColor: "text-white",
      delay: 0.15
    },
    {
      icon: <Wand2 className="w-5 h-5" />,
      text: "Smart Color Matching",
      bgColor: "bg-mauve-500/90",
      textColor: "text-white",
      delay: 0.25
    },
    {
      icon: <Brush className="w-5 h-5" />,
      text: "Makeup Artistry",
      bgColor: "bg-rose-500/90",
      textColor: "text-white",
      delay: 0.35
    },
    {
      icon: <Palette className="w-5 h-5" />,
      text: "Beauty Tips",
      bgColor: "bg-mauve-600/90",
      textColor: "text-white",
      delay: 0.45
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-cream-50 via-cream-100 to-mauve-50 relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 filigree-pattern" />
        
        <AnimatePresence>
          {!prefersReducedMotion && !isMobile && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 traveling-light"
                style={{ transform: 'rotate(45deg)' }}
              />
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 traveling-light"
                style={{ 
                  transform: 'rotate(-45deg)',
                  animationDelay: '-5s'
                }}
              />
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 filigree-depth"
              />
              
              <motion.div
                style={{ y: y1 }}
                className="absolute inset-0 bg-gradient-to-br from-cream-50/5 to-mauve-50/5"
              />
              <motion.div
                style={{ y: y2 }}
                className="absolute inset-0 bg-gradient-to-tl from-rose-50/5 to-gold-50/5"
              />
            </>
          )}
        </AnimatePresence>
      </div>

      <Header />
      
      <main className="flex-1">
        <section className="relative py-8 sm:py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="lg:col-span-5 lg:sticky lg:top-8"
              >
                <div className="text-center lg:text-left max-w-xl mx-auto lg:mx-0">
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                    <span className="text-gold-500">
                      <Crown className="w-6 h-6 sm:w-8 sm:h-8" />
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold premium-text-gradient leading-none">
                      Elevate Your Style
                    </h1>
                  </div>
                  <p className="mt-6 sm:mt-8 text-lg sm:text-xl text-mauve-900/80 leading-relaxed font-light">
                    Experience personalized fashion, makeup, and beauty advice crafted just for you. Let our AI stylist guide you to your perfect look. ✨
                  </p>
                  
                  <div className="mt-12 sm:mt-16 space-y-4">
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.6,
                          delay: isMobile ? 0 : feature.delay,
                          type: "spring",
                          stiffness: 400,
                          damping: 25
                        }}
                        viewport={{ once: true }}
                        whileHover={!isMobile ? { 
                          scale: 1.02,
                          transition: { type: "spring", stiffness: 400, damping: 17 }
                        } : {}}
                        className="relative mx-auto lg:mx-0"
                      >
                        <div className={`
                          flex items-center ${feature.bgColor} rounded-xl ${feature.textColor} relative py-3 px-4
                          w-full sm:w-[280px] shadow-lg
                        `}>
                          <div className="absolute inset-0 rounded-xl border-2 border-gold-600/60" />
                          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-gold-600/80 rounded-tl-lg" />
                          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-gold-600/80 rounded-tr-lg" />
                          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-gold-600/80 rounded-bl-lg" />
                          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-gold-600/80 rounded-br-lg" />
                          <motion.div
                            animate={!isMobile ? { 
                              rotate: [0, 10, -10, 0],
                              scale: [1, 1.1, 1.1, 1]
                            } : {}}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 3 + index
                            }}
                            className="relative z-10"
                          >
                            {feature.icon}
                          </motion.div>
                          <span className="ml-3 font-medium relative z-10 text-base">
                            {feature.text}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="lg:col-span-7 grid grid-cols-12 gap-4"
              >
                <div className="col-span-12">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <div className="aspect-[16/9] w-full">
                      <img
                        src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1600&q=80"
                        alt="Fashion showcase"
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block col-span-7">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl">
                    <div className="aspect-[3/4] w-full">
                      <img
                        src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80"
                        alt="Style inspiration"
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block col-span-5">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl">
                    <div className="aspect-[4/5] w-full">
                      <img
                        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80"
                        alt="Beauty close-up"
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="bg-white/90 backdrop-blur-xl p-4 sm:p-6 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.05)] border border-cream-200/50">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="divider flex-1" />
              <h2 className="text-xl sm:text-2xl font-bold premium-text-gradient">
                Your Personal Stylist
              </h2>
              <div className="divider flex-1" />
            </div>
            <Chatbot />
          </div>
        </section>
      </main>

      <footer className="mt-auto py-6 sm:py-8 text-center">
        <p className="text-sm sm:text-base text-mauve-900/60 font-light">
          © 2025 Atelier Style • Your personal style companion{' '}
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 inline-block text-gold-500" />
        </p>
        <div className="mt-2">
          <p className="text-xs sm:text-sm text-mauve-900/50">
            Created with ❤️ by{' '}
            <a 
              href="https://oguzasan.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-mauve-600 hover:text-mauve-700 transition-colors font-medium"
            >
              Oğuz Asan
            </a>
          </p>
          <p className="text-xs sm:text-sm mt-1">
            <span className="text-mauve-900/50">Stay tuned for more AI Solutions from the </span>
            <span className="premium-text-gradient font-semibold">
              Rising Star <Rocket className="w-3 h-3 sm:w-4 sm:h-4 inline-block mb-1 text-gold-500" />
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;