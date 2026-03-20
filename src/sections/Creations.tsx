import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { AnimatedSection } from '../components/animations/AnimatedSection';
import { ArrowUpRight } from 'lucide-react';

import auditoriumImg from '../assests/Auditorium/1000076591.jpg';
import corporateHqImg from '../assests/corporate HQ/1000077339.jpg';

interface CreationCardProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  tag?: string;
  isLarge?: boolean;
  delay?: number;
}

function CreationCard({ title, description, image, imageAlt, tag = 'Coming Soon', isLarge = false, delay = 0 }: CreationCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`relative group cursor-pointer ${isLarge ? 'lg:col-span-2' : ''}`}
    >
      {/* Card shell */}
      <motion.div
        className="relative overflow-hidden rounded-3xl"
        animate={{
          boxShadow: isHovered
            ? '0 30px 80px -10px rgba(138,90,185,0.6)'
            : '0 8px 30px -8px rgba(0,0,0,0.12)',
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Image */}
        <div className={`relative overflow-hidden ${isLarge ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
          <motion.img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.7 }}
          />

          {/* Overlay gradient */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(138,90,185,0.85) 0%, rgba(138,90,185,0.2) 40%, transparent 70%)',
            }}
            animate={{ opacity: isHovered ? 1 : 0.75 }}
            transition={{ duration: 0.4 }}
          />

          {/* Tag badge */}
          <div
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-bold tracking-widest uppercase"
            style={{ background: 'rgba(138,90,185,0.7)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.3)' }}
          >
            {tag}
          </div>

          {/* Arrow icon */}
          <motion.div
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
            animate={{ scale: isHovered ? 1.2 : 1, rotate: isHovered ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpRight className="w-5 h-5 text-white" />
          </motion.div>

          {/* Title overlay at bottom of image */}
          <div className="absolute bottom-0 left-0 right-0 p-6" style={{ transform: 'translateZ(20px)' }}>
            <h3 className={`font-black text-white leading-tight mb-1 ${isLarge ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>
              {title}
            </h3>
            <p className="text-white/70 text-sm leading-relaxed line-clamp-2">{description}</p>
          </div>
        </div>

        {/* Footer strip */}
        <div className="bg-white px-6 py-4 flex items-center justify-between">
          <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">ELEV8 God Within Ministries</span>
          <motion.button
            onClick={scrollToContact}
            whileHover={{ scale: 1.06, boxShadow: '0 0 20px rgba(138,90,185,0.4)' }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 text-white text-xs font-bold rounded-full"
            style={{ background: 'linear-gradient(135deg, #8A5AB9, #9F81B9)' }}
          >
            Donate →
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Creations() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="creations"
      ref={sectionRef}
      className="relative py-24 lg:py-36 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #faf8fb 0%, white 100%)' }}
    >
      {/* Decorative large circle background */}
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(159,129,185,0.12) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="section-container relative z-10">
        <AnimatedSection>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
            <div>
              {/* Label */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 rounded-full" style={{ background: '#8A5AB9' }} />
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#8A5AB9' }}>What We Build</span>
              </div>
              {/* Title */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-none tracking-tight">
                Our{' '}
                <span
                  className="relative inline-block"
                  style={{ color: 'transparent', WebkitTextStroke: '2px #8A5AB9' }}
                >
                  Creations
                </span>
              </h2>
            </div>
            <p className="text-gray-500 max-w-xs text-sm leading-relaxed lg:text-right">
              Sacred spaces designed to elevate consciousness, foster unity, and serve communities worldwide.
            </p>
          </div>
        </AnimatedSection>

        {/* Grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          <CreationCard
            title="Upcoming Auditorium"
            description="Future home for immersive gatherings and spiritual elevation — a venue built for awakening."
            image={auditoriumImg}
            imageAlt="Auditorium"
            tag="Upcoming"
            isLarge={true}
            delay={0.1}
          />
          <CreationCard
            title="Corporate HQ"
            description="A global headquarters for unity, creativity, and service — where vision becomes reality."
            image={corporateHqImg}
            imageAlt="Corporate HQ"
            tag="In Progress"
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}
