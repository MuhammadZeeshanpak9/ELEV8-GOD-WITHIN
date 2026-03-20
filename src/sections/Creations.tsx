import { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { BlueprintGrid } from '../components/animations/ParticleField';
import { AnimatedSection } from '../components/animations/AnimatedSection';

import auditoriumImg from '../assests/Auditorium/1000076591.jpg';
import corporateHqImg from '../assests/corporate HQ/1000076581.jpg';

interface CreationCardProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  isLarge?: boolean;
  delay?: number;
}

// STRICT COLOR: Only #9F81B9 and white allowed
function CreationCard({ title, description, image, imageAlt, isLarge = false, delay = 0 }: CreationCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position for 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for tilt
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay, ease: [0.4, 0, 0.2, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative group ${isLarge ? 'lg:col-span-2' : ''}`}
    >
      <motion.div
        className="relative bg-white rounded-2xl overflow-hidden transition-shadow duration-500"
        animate={{
          boxShadow: isHovered
            ? '0 25px 60px -10px rgba(138, 90, 185, 0.6)'
            : '0 10px 30px -10px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Image Container */}
        <div className={`relative overflow-hidden ${isLarge ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
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

          {/* Gradient Overlay - Royal Purple */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(138, 90, 185, 0.8) 0%, rgba(138, 90, 185, 0.2) 50%, transparent 100%)',
            }}
            animate={{ opacity: isHovered ? 1 : 0.7 }}
            transition={{ duration: 0.3 }}
          />

          {/* Animated Border Glow - Royal Purple */}
          <motion.div
            className="absolute inset-0 rounded-t-2xl pointer-events-none"
            animate={{
              boxShadow: isHovered
                ? 'inset 0 0 40px rgba(138, 90, 185, 0.7)'
                : 'inset 0 0 0px rgba(138, 90, 185, 0)',
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8">
          <motion.h3
            className={`font-bold text-gray-900 mb-3 ${isLarge ? 'text-2xl lg:text-3xl' : 'text-xl lg:text-2xl'}`}
            style={{ transform: 'translateZ(30px)' }}
          >
            {title}
          </motion.h3>

          <motion.p
            className="text-gray-600 mb-6 leading-relaxed"
            style={{ transform: 'translateZ(20px)' }}
          >
            {description}
          </motion.p>

          {/* Donate Button - Royal Purple */}
          <motion.button
            onClick={scrollToContact}
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(138, 90, 185, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 text-white font-bold rounded-full transition-all duration-300"
            style={{
              backgroundColor: '#8A5AB9', // Royal purple variant
              transform: 'translateZ(40px)',
            }}
          >
            Donate to This Project
            <motion.svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </motion.button>
        </div>

        {/* Corner Accent - #9F81B9 */}
        <motion.div
          className="absolute top-4 right-4 w-12 h-12 rounded-full"
          style={{ backgroundColor: 'rgba(159, 129, 185, 0.2)', backdropFilter: 'blur(4px)' }}
          animate={{
            scale: isHovered ? [1, 1.2, 1] : 1,
            rotate: isHovered ? [0, 180] : 0,
          }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
}

export function Creations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="creations"
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden"
      style={{ backgroundColor: '#faf8fb' }}
    >
      {/* Blueprint Grid Background - for architecture/building theme */}
      <BlueprintGrid className="opacity-40" />

      <div className="section-container relative z-10">
        <AnimatedSection>
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
          >
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            >
              {'OUR CREATIONS'.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="inline-block mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100px' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-1 rounded-full mx-auto"
              style={{ background: 'linear-gradient(to right, #8A5AB9, rgba(138, 90, 185, 0.5))' }}
            />
          </motion.div>
        </AnimatedSection>

        {/* Creations Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          <CreationCard
            title="Upcoming Auditorium (ELEV8 GOD WITHIN MINISTRIES)"
            description="Future home for immersive gatherings and spiritual elevation."
            image={auditoriumImg}
            imageAlt="Auditorium Image"
            isLarge={true}
            delay={0.2}
          />

          <CreationCard
            title="Corporate HQ"
            description="A global headquarters for unity, creativity, and service."
            image={corporateHqImg}
            imageAlt="Corporate HQ Image"
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
}
