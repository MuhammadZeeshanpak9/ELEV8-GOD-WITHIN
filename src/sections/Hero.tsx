import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, Sparkles } from 'lucide-react';

import heroImage1 from '../assests/Home_page_silder/1000077035.jpg';
import heroImage2 from '../assests/Home_page_silder/1000077038.jpg';

const sliderImages = [heroImage1, heroImage2];

const stats = [
  { value: '10K+', label: 'Souls Elevated' },
  { value: '50+', label: 'Countries Reached' },
  { value: '∞', label: 'Love Given' },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 2);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex overflow-hidden"
    >
      {/* ---- LEFT HALF: Full bleed image ---- */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ scale }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide}
            src={sliderImages[currentSlide]}
            alt="Hero"
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1] }}
          />
        </AnimatePresence>

        {/* Dark-to-right gradient so right side text is legible */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(0,0,0,0.55) 0%, rgba(138,90,185,0.45) 50%, rgba(159,129,185,0.85) 100%)',
          }}
        />
      </motion.div>

      {/* ---- CONTENT: two-column layout ---- */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full flex flex-col lg:flex-row items-stretch min-h-screen"
      >
        {/* Left column: floating badge + big heading */}
        <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 pt-24 lg:pt-0 pb-12 lg:pb-0">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-flex items-center gap-2 mb-8 self-start"
          >
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest text-white uppercase"
              style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              <Sparkles className="w-3 h-3" />
              Spiritual Wellness Movement
            </div>
          </motion.div>

          {/* Main heading — word-by-word stagger */}
          <div className="overflow-hidden mb-6">
            {['ELEV8', 'GOD', 'WITHIN'].map((word, i) => (
              <motion.div
                key={word}
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.4 + i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                className="block"
              >
                <span
                  className={`block font-black leading-none tracking-tight drop-shadow-2xl ${
                    i === 1
                      ? 'text-6xl sm:text-7xl lg:text-8xl xl:text-9xl text-white/30 -my-2'
                      : 'text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white'
                  }`}
                  style={i === 1 ? { WebkitTextStroke: '2px rgba(255,255,255,0.7)' } : {}}
                >
                  {word}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-white/80 text-base sm:text-lg max-w-md leading-relaxed mb-10"
          >
            A global movement for awakening consciousness, inner healing, and unity across all nations.
          </motion.p>

          {/* CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <motion.button
              onClick={() => scrollToSection('#story')}
              whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(255,255,255,0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-4 bg-white text-[#8A5AB9] font-bold rounded-full text-sm shadow-2xl"
            >
              Join Our Movement
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              onClick={() => scrollToSection('#gift')}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-4 border-2 border-white/60 text-white font-bold rounded-full text-sm transition-all"
            >
              Send a Love Gift
            </motion.button>
          </motion.div>
        </div>

        {/* Right column: slide indicators + stats panel */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="lg:w-72 xl:w-80 flex flex-col justify-end pb-16 lg:pb-24 px-8 lg:px-10"
        >
          {/* Stats cards */}
          <div className="space-y-4 mb-10">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.15 }}
                className="flex items-center gap-4 px-5 py-4 rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <span className="text-3xl font-black text-white">{stat.value}</span>
                <span className="text-white/70 text-sm font-medium">{stat.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Slide indicators */}
          <div className="flex gap-3">
            {[0, 1].map((index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  currentSlide === index ? 'bg-white w-10' : 'bg-white/30 w-4 hover:bg-white/60'
                }`}
                whileHover={{ scale: 1.2 }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent z-10" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => scrollToSection('#story')}
      >
        <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
