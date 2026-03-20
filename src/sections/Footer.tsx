import { motion } from 'framer-motion';

// STRICT COLOR: Only #9F81B9 and white allowed
export function Footer() {
  return (
    <footer 
      className="relative py-8 overflow-hidden"
      style={{ backgroundColor: '#9F81B9' }}
    >
      {/* Subtle Background Animation - white with opacity */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-64 h-64 rounded-full blur-3xl"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full blur-3xl"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="section-container relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white/90 text-sm"
          >
            Copyright © 2026 ELEV8 GOD WITHIN MINISTRIES
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-2 text-white/90 text-sm font-semibold tracking-wider"
          >
            <span>POWERED BY : THE WORLD'S GREATEST COIN + ELEV8 INCORPORATION</span>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Line - white */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.3), rgba(255,255,255,0.6), rgba(255,255,255,0.3))' }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />
    </footer>
  );
}
