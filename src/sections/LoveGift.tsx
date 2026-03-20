import { useRef, useState, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import { FloatingOrbs, EnergyBeams } from '../components/animations/ParticleField';
import { Heart, BookOpen, Palette } from 'lucide-react';

import meditationImg from '../assests/send a love gift/1000077052.jpg';
import booksImg from '../assests/send a love gift/1000077054.jpg';
import artImg from '../assests/send a love gift/1000077056.jpg';

interface GiftItemProps {
  title: string;
  image: string;
  imageAlt: string;
  icon: ReactNode;
  delay?: number;
}

// STRICT COLOR: Only #9F81B9 and white allowed
function GiftItem({ title, image, imageAlt, icon, delay = 0 }: GiftItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay, ease: [0.4, 0, 0.2, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <motion.div
        className="relative rounded-2xl overflow-hidden transition-all duration-500"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: isHovered ? '1px solid rgba(255, 255, 255, 0.5)' : '1px solid rgba(255, 255, 255, 0.2)',
        }}
        animate={{
          y: isHovered ? -8 : 0,
          boxShadow: isHovered
            ? '0 25px 60px -10px rgba(0, 0, 0, 0.4), 0 0 50px rgba(138, 90, 185, 0.6)'
            : '0 10px 30px -10px rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.div
            className="w-full h-full"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={image}
              alt={imageAlt}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Gradient Overlay - #9F81B9 */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(159, 129, 185, 0.6) 0%, transparent 100%)',
            }}
            animate={{ opacity: isHovered ? 0.8 : 0.5 }}
            transition={{ duration: 0.3 }}
          />

          {/* Icon */}
          <motion.div
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(4px)' }}
            animate={{
              scale: isHovered ? 1.15 : 1,
              rotate: isHovered ? [0, -15, 15, 0] : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-white">{icon}</div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-5 text-center">
          <motion.h4
            className="text-lg font-semibold text-white mb-4"
            animate={{ y: isHovered ? -2 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h4>

          {/* Donate Button */}
          <motion.button
            onClick={scrollToContact}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-5 py-2.5 bg-white text-sm font-semibold rounded-full transition-all duration-300 hover:shadow-lg"
            style={{ color: '#9F81B9' }}
          >
            Donate to This Project
            <motion.svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: isHovered ? 3 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </motion.button>
        </div>

        {/* Glowing Border Animation - Royal Purple */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            boxShadow: isHovered
              ? 'inset 0 0 30px rgba(138, 90, 185, 0.5)'
              : 'inset 0 0 0px rgba(138, 90, 185, 0)',
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}

export function LoveGift() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const giftItems = [
    {
      title: 'Meditation App Programs',
      image: meditationImg,
      imageAlt: 'Meditation App Image',
      icon: <Heart className="w-5 h-5" />,
    },
    {
      title: 'Books, Music, & Gifts',
      image: booksImg,
      imageAlt: 'Books and Music Image',
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      title: 'Art & Community Programs',
      image: artImg,
      imageAlt: 'Art Programs Image',
      icon: <Palette className="w-5 h-5" />,
    },
  ];

  return (
    <section
      id="gift"
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden"
      style={{ backgroundColor: '#9F81B9' }}
    >
      {/* Animated Background Elements */}
      <FloatingOrbs className="opacity-30" />
      <EnergyBeams className="opacity-20" />

      {/* Decorative Shapes - white with opacity */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="section-container relative z-10">
        {/* Main Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          className="relative rounded-3xl p-8 lg:p-12"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              {'SEND A LOVE GIFT'.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
                  animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="inline-block mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, filter: 'blur(5px)' }}
              animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg text-white/80 max-w-2xl mx-auto"
            >
              Support the movement with a love gift to elevate hearts worldwide.
            </motion.p>

            {/* Decorative Line */}
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: '80px' } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="h-0.5 rounded-full mx-auto mt-6"
              style={{ background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.5), transparent)' }}
            />
          </motion.div>

          {/* Gift Items Grid */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {giftItems.map((item, index) => (
              <GiftItem
                key={item.title}
                {...item}
                delay={0.4 + index * 0.15}
              />
            ))}
          </div>

          {/* Bottom Glow */}
          <motion.div
            className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-96 h-20 rounded-full blur-3xl"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
}
