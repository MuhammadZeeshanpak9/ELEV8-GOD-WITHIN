import { motion } from 'framer-motion';
import { Heart, Mail, ExternalLink, ArrowUp } from 'lucide-react';

const quickLinks = [
  { name: 'Hi You', href: '#hero' },
  { name: 'Our Story', href: '#story' },
  { name: 'Our Creations', href: '#creations' },
  { name: 'Our Movement', href: '#movement' },
  { name: 'Love Gift', href: '#gift' },
  { name: 'Say Hello', href: '#contact' },
];

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollToSection = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #6B3FA0 0%, #8A5AB9 50%, #9F81B9 100%)' }}
    >
      {/* Decorative orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-80 h-80 rounded-full pointer-events-none blur-3xl"
        style={{ background: 'rgba(255,255,255,0.06)' }}
        animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-64 h-64 rounded-full pointer-events-none blur-3xl"
        style={{ background: 'rgba(255,255,255,0.05)' }}
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="section-container relative z-10 py-16 lg:py-20">
        {/* Top row */}
        <div className="grid lg:grid-cols-3 gap-12 mb-12">
          {/* Brand block */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {/* Logo */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}
                >
                  ✦
                </div>
                <div>
                  <p className="text-white font-black text-sm tracking-wider">ELEV8 GOD WITHIN</p>
                  <p className="text-white/60 text-xs tracking-widest">MINISTRIES</p>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                A global spiritual wellness movement for awakening consciousness, inner healing, and unity.
              </p>

              {/* Social / contact row */}
              <div className="flex items-center gap-3 mt-6">
                <motion.a
                  whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.3)' }}
                  className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all"
                  style={{ background: 'rgba(255,255,255,0.15)' }}
                  href="mailto:info@elev8godwithin.com"
                >
                  <Mail className="w-4 h-4 text-white" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.3)' }}
                  className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all"
                  style={{ background: 'rgba(255,255,255,0.15)' }}
                  href="https://www.thegranddesigner.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink className="w-4 h-4 text-white" />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Quick links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <p className="text-white/50 text-xs font-bold tracking-widest uppercase mb-5">Quick Links</p>
              <ul className="space-y-3">
                {quickLinks.map((link, i) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-white/70 hover:text-white text-sm font-medium transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-3 h-0.5 bg-white/30 group-hover:bg-white group-hover:w-5 transition-all rounded-full" />
                      {link.name}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Donate CTA block */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="rounded-2xl p-6"
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <Heart className="w-6 h-6 text-white/80 mb-3" fill="rgba(255,255,255,0.3)" />
              <p className="text-white font-bold text-base mb-2">Send a Love Gift</p>
              <p className="text-white/60 text-xs mb-5 leading-relaxed">
                Support the movement and help elevate hearts worldwide.
              </p>
              <motion.button
                onClick={() => scrollToSection('#gift')}
                whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(255,255,255,0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-white font-bold text-sm rounded-xl"
                style={{ color: '#8A5AB9' }}
              >
                Donate Now ✦
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <motion.div
          className="h-px mb-8"
          style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)' }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-xs">
            © 2026 ELEV8 GOD WITHIN MINISTRIES — All rights reserved
          </p>
          <p className="text-white/40 text-xs text-center">
            POWERED BY: THE WORLD'S GREATEST COIN + ELEV8 INCORPORATION
          </p>
          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 text-white/50 text-xs hover:text-white transition-colors"
          >
            <ArrowUp className="w-3 h-3" />
            Back to top
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
