import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ParticleField, FloatingOrbs } from '../components/animations/ParticleField';

import heroImage1 from '../assests/Home_page_silder/1000077035.jpg';
import heroImage2 from '../assests/Home_page_silder/1000077038.jpg';

const sliderImages = [heroImage1, heroImage2];

// STRICT COLOR: Only #9F81B9 and white allowed
export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 2);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image Slider */}
      <div className="absolute inset-0 -z-10">
        {[0, 1].map((index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: currentSlide === index ? 1 : 0,
              scale: currentSlide === index ? 1 : 1.1,
            }}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <img
              src={sliderImages[index]}
              alt={`Hero Background ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Overlay removed for clear pictures as per user request */}
          </motion.div>
        ))}
      </div>

      {/* Animated Background Elements */}
      <motion.div style={{ y }} className="absolute inset-0 z-[1]">
        <ParticleField count={40} color="rgba(255, 255, 255, 0.3)" />
        <FloatingOrbs />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
      >
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 50, filter: 'blur(15px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-2xl"
        >
          {'ELEV8 GOD WITHIN'.split(' ').map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.5 + i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="inline-block mr-4"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-lg sm:text-xl md:text-2xl text-white mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-md font-medium"
        >
          A global spiritual wellness movement for awakening consciousness, inner healing, and unity.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.button
            onClick={() => scrollToSection('#story')}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 60px rgba(138, 90, 185, 0.8)',
            }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-white text-[#9F81B9] text-lg font-bold rounded-full transition-all duration-300 hover-lift glow-purple-strong shadow-xl"
          >
            Join Our Movement
          </motion.button>

          <motion.button
            onClick={() => scrollToSection('#gift')}
            whileHover={{
              scale: 1.05,
              backgroundColor: 'rgba(255, 255, 255, 1)',
              boxShadow: '0 0 40px rgba(255, 255, 255, 0.6)',
            }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 border-2 border-white text-white text-lg font-bold rounded-full transition-all duration-300 hover:text-[#9F81B9] hover-lift shadow-lg"
          >
            Send a Love Gift
          </motion.button>
        </motion.div>

        {/* Slide Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex justify-center gap-3 mt-12"
        >
          {[0, 1].map((index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 ${currentSlide === index
                  ? 'bg-white w-8'
                  : 'bg-white/40 hover:bg-white/60'
                }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom Gradient Fade - white */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [1, 0], y: [0, 12] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
