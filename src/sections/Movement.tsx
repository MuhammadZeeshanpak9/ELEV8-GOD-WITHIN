import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, Globe, Sparkles, ArrowRight } from 'lucide-react';

import innerElevationImg from '../assests/Our Movement/1000077032.jpg';
import globalUnityImg from '../assests/Our Movement/1000077033.jpg';
import consciousCreationImg from '../assests/corporate HQ/1000077339.jpg';

const movementItems = [
  {
    title: 'Inner Elevation',
    description: 'Expand in love and awareness through transformative inner practice and deep consciousness work.',
    image: innerElevationImg,
    imageAlt: 'Inner Elevation',
    icon: Heart,
    accent: '#8A5AB9',
  },
  {
    title: 'Global Unity',
    description: 'Unify communities and nations through shared purpose, love, and collective awakening.',
    image: globalUnityImg,
    imageAlt: 'Global Unity',
    icon: Globe,
    accent: '#9F81B9',
  },
  {
    title: 'Conscious Creation',
    description: 'Create with intention, compassion, and inspired divine action toward a better world.',
    image: consciousCreationImg,
    imageAlt: 'Conscious Creation',
    icon: Sparkles,
    accent: '#b59fd4',
  },
];

function MovementCard({ item, index }: { item: typeof movementItems[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group cursor-pointer"
    >
      {/* Number label */}
      <div
        className="absolute -top-4 -left-2 z-20 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black"
        style={{ background: 'linear-gradient(135deg, #8A5AB9, #9F81B9)' }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      <motion.div
        className="relative bg-white rounded-3xl overflow-hidden"
        animate={{
          y: isHovered ? -8 : 0,
          boxShadow: isHovered
            ? '0 30px 70px -15px rgba(138,90,185,0.55)'
            : '0 8px 24px -8px rgba(0,0,0,0.1)',
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
          <motion.img
            src={item.image}
            alt={item.imageAlt}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.07 : 1 }}
            transition={{ duration: 0.7 }}
          />
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${item.accent}dd 0%, ${item.accent}44 50%, transparent 100%)`,
            }}
            animate={{ opacity: isHovered ? 1 : 0.7 }}
            transition={{ duration: 0.4 }}
          />

          {/* Ripple on hover */}
          {isHovered && (
            <motion.div
              initial={{ scale: 0, opacity: 0.4 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: item.accent, transformOrigin: 'center' }}
            />
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Icon chip */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
            style={{ background: `${item.accent}18` }}
          >
            <Icon className="w-5 h-5" style={{ color: item.accent }} />
          </div>

          <h3 className="text-xl font-black text-gray-900 mb-2">{item.title}</h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-5">{item.description}</p>

          {/* Bottom accent bar */}
          <motion.div
            className="h-0.5 rounded-full"
            style={{ background: `linear-gradient(to right, ${item.accent}, transparent)`, transformOrigin: 'left' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Movement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="movement"
      ref={sectionRef}
      className="relative py-24 lg:py-36 overflow-hidden bg-white"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 0% 50%, rgba(159,129,185,0.07) 0%, transparent 60%)',
        }}
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 rounded-full" style={{ background: '#8A5AB9' }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#8A5AB9' }}>What We Stand For</span>
            </div>
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-none tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="text-gray-900">Our </span>
              <span
                className="italic"
                style={{ color: 'transparent', WebkitTextStroke: '2px #8A5AB9' }}
              >
                Movement
              </span>
            </motion.h2>
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 px-6 py-3 text-white font-bold text-sm rounded-full self-start lg:self-auto"
            style={{ background: 'linear-gradient(135deg, #8A5AB9, #9F81B9)' }}
          >
            Join the Movement
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {movementItems.map((item, i) => (
            <MovementCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
