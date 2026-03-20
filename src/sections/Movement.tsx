import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ConnectedNodes } from '../components/animations/ParticleField';
import { Heart, Globe, Sparkles } from 'lucide-react';

import innerElevationImg from '../assests/Our Movement/1000077032.jpg';
import globalUnityImg from '../assests/Our Movement/1000077033.jpg';
import consciousCreationImg from '../assests/corporate HQ/1000077339.jpg';

interface MovementItemProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  icon: React.ReactNode;
  delay?: number;
}

// STRICT COLOR: Only #9F81B9 and white allowed
function MovementItem({ title, description, image, imageAlt, icon, delay = 0 }: MovementItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay, ease: [0.4, 0, 0.2, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <motion.div
        className="relative bg-white rounded-2xl overflow-hidden transition-all duration-500"
        animate={{
          y: isHovered ? -10 : 0,
          boxShadow: isHovered
            ? '0 30px 60px -15px rgba(159, 129, 185, 0.35)'
            : '0 10px 30px -10px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <motion.div
            className="w-full h-full"
            animate={{ scale: isHovered ? 1.08 : 1 }}
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
              background: 'linear-gradient(to top, rgba(159, 129, 185, 0.9) 0%, rgba(159, 129, 185, 0.4) 50%, transparent 100%)',
            }}
            animate={{ opacity: isHovered ? 0.9 : 0.7 }}
            transition={{ duration: 0.3 }}
          />

          {/* Icon Badge */}
          <motion.div
            className="absolute top-4 left-4 w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(4px)' }}
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? [0, -10, 10, 0] : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-white">{icon}</div>
          </motion.div>

          {/* Ripple Effect on Hover - #9F81B9 */}
          {isHovered && (
            <motion.div
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 rounded-full"
              style={{
                backgroundColor: 'rgba(159, 129, 185, 0.3)',
                transformOrigin: 'center',
              }}
            />
          )}
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <motion.h3
            className="text-xl lg:text-2xl font-bold text-gray-900 mb-3"
            animate={{ y: isHovered ? -2 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>

          <motion.p
            className="text-gray-600 leading-relaxed"
            animate={{ y: isHovered ? -2 : 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            {description}
          </motion.p>
        </div>

        {/* Bottom Accent Line - #9F81B9 */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{
            background: 'linear-gradient(to right, #9F81B9, rgba(159, 129, 185, 0.7), #9F81B9)',
            transformOrigin: 'left',
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Corner Glow - #9F81B9 */}
        <motion.div
          className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-3xl"
          style={{ backgroundColor: 'rgba(159, 129, 185, 0.2)' }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.2 : 1,
          }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
}

export function Movement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const movementItems = [
    {
      title: 'Inner Elevation',
      description: 'Expand in love and awareness through inner practice.',
      image: innerElevationImg,
      imageAlt: 'Inner Elevation Image',
      icon: <Heart className="w-6 h-6" />,
    },
    {
      title: 'Global Unity',
      description: 'Unify communities and nations through shared purpose.',
      image: globalUnityImg,
      imageAlt: 'Global Unity Image',
      icon: <Globe className="w-6 h-6" />,
    },
    {
      title: 'Conscious Creation',
      description: 'Create with intention, compassion, and inspired action.',
      image: consciousCreationImg,
      imageAlt: 'Conscious Creation Image',
      icon: <Sparkles className="w-6 h-6" />,
    },
  ];

  return (
    <section
      id="movement"
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Connected Nodes Background - for community/unity theme */}
      <ConnectedNodes className="opacity-50" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            {'OUR MOVEMENT'.split(' ').map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '100px' } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-1 rounded-full mx-auto"
            style={{ background: 'linear-gradient(to right, #9F81B9, rgba(159, 129, 185, 0.5))' }}
          />
        </motion.div>

        {/* Movement Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {movementItems.map((item, index) => (
            <MovementItem
              key={item.title}
              {...item}
              delay={0.2 + index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
