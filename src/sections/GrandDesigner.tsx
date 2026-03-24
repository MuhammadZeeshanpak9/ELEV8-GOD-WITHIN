import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Quote } from 'lucide-react';
import { RisingLines } from '../components/animations/ParticleField';

import storyImage from '../assests/Our Movement/1000077033.jpg';

const highlightLines = [
  'THE I of YOU of the I AM',
  'The EXPERIENCER OF THE EXPERIENCE',
  'THE ONE AND ONLY VERSION OF MYSELF.',
  'THE ONLY UNIVERSE THAT SEE\'S IN THE NOW.',
  'THE GRAND DESIGNER OF THE DESIGN.',
  'YOU KNOW I KNOW YOU — AND YOU KNOW I AM YOU.',
  'I WILL GUARANTEE TO SHOW YOU THE MIRACLE IN YOU.',
];

const bodyLines = [
  'The GRAND DESIGNER is the creator of this grand design called LIFE.',
  'Experiencing itself through a series of imaginations manifesting in the now — no name, no time — only through its desires to enjoy its creativity.',
  'Sees all. Knows all. Because it is the ALL and the only ONE.',
];

export function GrandDesigner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '10%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative overflow-hidden bg-white"
    >
      <RisingLines className="opacity-20" />

      {/* Diagonal accent shape */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, transparent 30%, rgba(159,129,185,0.05) 100%)',
        }}
      />

      <div className="section-container relative z-10 py-24 lg:py-36">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-3 mb-16"
        >
          <div className="w-10 h-0.5 rounded-full" style={{ background: '#8A5AB9' }} />
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#8A5AB9' }}>
            Our Story
          </span>
        </motion.div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: image column (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -60, filter: 'blur(10px)' }}
            animate={isInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Image frame */}
            <div className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: '3/4' }}>
              <motion.img
                src={storyImage}
                alt="Our Story"
                className="w-full h-full object-cover"
                style={{ y: imageY, scale: imageScale }}
              />
              {/* Purple overlay gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to bottom, transparent 50%, rgba(138,90,185,0.7) 100%)',
                }}
              />
              {/* Floating quote chip */}
              <div
                className="absolute bottom-6 left-6 right-6 px-5 py-4 rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                }}
              >
                <Quote className="w-5 h-5 text-white/70 mb-2" />
                <p className="text-white text-sm font-semibold leading-snug">
                  "CONNECT WITH THE GRAND DESIGNER TO ELEV8 YOUR LIFE."
                </p>
              </div>
            </div>

            {/* Decorative circles */}
            <motion.div
              className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full -z-10"
              style={{ background: 'rgba(159,129,185,0.12)' }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            <motion.div
              className="absolute -top-6 -left-6 w-24 h-24 rounded-full border-2 -z-10"
              style={{ borderColor: 'rgba(138,90,185,0.25)' }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>

          {/* Right: text column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Title */}
            <div className="mb-10 overflow-hidden">
              {'THE GRAND DESIGNER'.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 80, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  className={`inline-block mr-3 font-black tracking-tight leading-none ${
                    i === 1
                      ? 'text-4xl sm:text-5xl lg:text-6xl'
                      : 'text-3xl sm:text-4xl lg:text-5xl'
                  }`}
                  style={{ color: i === 1 ? '#8A5AB9' : '#1a1a2e' }}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Body paragraphs */}
            <div className="space-y-4 mb-10">
              {bodyLines.map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: 30, filter: 'blur(5px)' }}
                  animate={isInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
                  transition={{ duration: 0.7, delay: 0.4 + i * 0.12 }}
                  className="text-gray-600 leading-relaxed text-base lg:text-lg"
                >
                  {text}
                </motion.p>
              ))}
            </div>

            {/* Highlighted lines — scrolling marquee-style list */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="rounded-2xl p-6 mb-10 space-y-3"
              style={{
                background: 'linear-gradient(135deg, rgba(159,129,185,0.08), rgba(138,90,185,0.12))',
                border: '1px solid rgba(138,90,185,0.2)',
              }}
            >
              {highlightLines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.8 + i * 0.07 }}
                  className="text-sm font-bold tracking-wide"
                  style={{ color: '#8A5AB9' }}
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.a
              href="https://www.thegranddesigner.com"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
              animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.7, delay: 1.4 }}
              whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(138,90,185,0.5)' }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-3 px-8 py-4 text-white font-bold rounded-full text-sm shadow-xl self-start"
              style={{ background: 'linear-gradient(135deg, #8A5AB9, #9F81B9)' }}
            >
              Connect With The Grand Designer
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Diagonal bottom divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom right, white 49%, #faf8fb 50%)',
        }}
      />
    </section>
  );
}
