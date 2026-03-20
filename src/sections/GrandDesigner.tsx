import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ExternalLink } from 'lucide-react';
import { RisingLines } from '../components/animations/ParticleField';

import storyImage from '../assests/Our_Story/1000077031.jpg';

const textContent = [
  'The GRAND DESIGNER is the creator of this grand design called LIFE.',
  'The GRAND DESIGNER is experiencing itself through a series of imaginations manifesting in the now of no name or time only through its desires to enjoy its creativity.',
  'The GRAND DESIGNER sees all, knows all because it is the ALL and the only 1 of its design created in the NOW of its imagination to experience a THOUGHT created in the dream of eternity',
  'THE I of YOU of the I AM',
  'The EXPERIENCER OF THE EXPERIENCE',
  'THE ONE AND ONLY VERSION OF MYSELF.',
  'THE ONE WHO HAVE TO MOVE BEFORE AN EXPERIENCE BECOMES AN EXPERIENCE.',
  'THE ONLY UNIVERSE THAT SEE\'S IN THE NOW.',
  'THE GRAND DESIGNER OF THE DESIGN.',
  'YOU KNOW I KNOW YOU',
  'AND YOU KNOW I AM YOU.',
  'CONNECT WITH THE GRAND DESIGNER TO ELEV8 YOUR LIFE.',
  'I WILL GUARANTEE TO SHOW YOU THE MIRACLE IN YOU.',
];

// STRICT COLOR: Only #9F81B9 and white allowed
export function GrandDesigner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Background Animation - Rising Lines for elevation/growth theme */}
      <RisingLines className="opacity-30" />

      {/* Floating Sparkles - #9F81B9 only */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          >
            <Sparkles className="w-4 h-4" style={{ color: 'rgba(159, 129, 185, 0.4)' }} />
          </motion.div>
        ))}
      </div>

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="relative"
          >
            <motion.div
              style={{
                y: imageY,
                boxShadow: '0 25px 50px -12px rgba(159, 129, 185, 0.25)',
              }}
              className="relative rounded-2xl overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={storyImage}
                  alt="Our Story"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Glowing Border Effect - Royal Purple */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                animate={{
                  boxShadow: [
                    'inset 0 0 0 2px rgba(138, 90, 185, 0.3)',
                    'inset 0 0 0 2px rgba(138, 90, 185, 0.8)',
                    'inset 0 0 0 2px rgba(138, 90, 185, 0.3)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>

            {/* Decorative Elements - #9F81B9 only */}
            <motion.div
              className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full -z-10"
              style={{ backgroundColor: 'rgba(159, 129, 185, 0.1)' }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute -top-4 -left-4 w-20 h-20 rounded-full -z-10"
              style={{ border: '2px solid rgba(159, 129, 185, 0.2)' }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>

          {/* Content Column */}
          <div className="lg:pl-8">
            {/* Section Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <motion.h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
              >
                {'THE GRAND DESIGNER'.split(' ').map((word, i) => (
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

              {/* Animated Underline - #9F81B9 */}
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: '120px' } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="h-1 rounded-full"
                style={{ background: 'linear-gradient(to right, #9F81B9, rgba(159, 129, 185, 0.5))' }}
              />
            </motion.div>

            {/* Text Content */}
            <div className="space-y-4">
              {textContent.map((text, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.4 + index * 0.08,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className={`text-base lg:text-lg leading-relaxed ${text.startsWith('THE') || text.startsWith('YOU') || text.startsWith('AND') || text.startsWith('I WILL')
                    ? 'font-semibold'
                    : 'text-gray-600'
                    }`}
                  style={{
                    color: text.startsWith('THE') || text.startsWith('YOU') || text.startsWith('AND') || text.startsWith('I WILL')
                      ? '#9F81B9'
                      : undefined,
                  }}
                >
                  {text}
                </motion.p>
              ))}
            </div>

            {/* CTA Link - Hover Lift and Strong Glow */}
            <motion.a
              href="https://www.thegranddesigner.com"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
              animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.6, delay: 1.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 mt-8 px-8 py-4 text-white font-bold rounded-full transition-all duration-300 group glow-purple-strong hover-lift shadow-xl"
              style={{
                backgroundColor: '#8A5AB9',
              }}
            >
              CONNECT WITH THE GRAND DESIGNER
              <ExternalLink className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
