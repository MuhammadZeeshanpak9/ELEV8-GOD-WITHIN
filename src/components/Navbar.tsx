import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, Sparkles, BookOpen, LayoutGrid, Globe, Gift, MessageCircle, type LucideIcon } from 'lucide-react';

type NavLink = { name: string; href: string; Icon: LucideIcon };

const navLinks: NavLink[] = [
  { name: 'Hi You',           href: '#hero',      Icon: Sparkles       },
  { name: 'Our Story',        href: '#story',     Icon: BookOpen       },
  { name: 'Our Creations',    href: '#creations', Icon: LayoutGrid     },
  { name: 'Our Movement',     href: '#movement',  Icon: Globe          },
  { name: 'Send a Love Gift', href: '#gift',      Icon: Gift           },
  { name: 'Say Hello',        href: '#contact',   Icon: MessageCircle  },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#hero');

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveLink(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* ===================== DESKTOP LEFT SIDEBAR ===================== */}
      <motion.aside
        initial={{ x: -220, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed left-0 top-0 h-screen w-52 z-50 hidden lg:flex flex-col"
        style={{
          background: 'linear-gradient(180deg, #8A5AB9 0%, #9F81B9 50%, #b59fd4 100%)',
          boxShadow: '4px 0 40px rgba(138, 90, 185, 0.4)',
        }}
      >
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />

        {/* Top glow accent */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
          }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Logo */}
        <motion.a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
          className="relative z-10 flex flex-col items-center pt-10 pb-8 px-6 text-center border-b border-white/20 cursor-pointer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {/* Logo Icon */}
          <motion.div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
            style={{
              background: 'rgba(255,255,255,0.2)',
              boxShadow: '0 0 20px rgba(255,255,255,0.3), inset 0 0 10px rgba(255,255,255,0.1)',
            }}
            animate={{
              boxShadow: [
                '0 0 20px rgba(255,255,255,0.3)',
                '0 0 40px rgba(255,255,255,0.6)',
                '0 0 20px rgba(255,255,255,0.3)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-2xl">✦</span>
          </motion.div>
          <span className="text-white font-bold text-base tracking-wider leading-tight">
            ELEV8 GOD WITHIN
          </span>
          <span className="text-white/70 text-xs tracking-[0.2em] mt-1 uppercase">
            Ministries
          </span>
        </motion.a>

        {/* Nav Links */}
        <nav className="relative z-10 flex-1 flex flex-col justify-center px-4 py-6 gap-1">
          {navLinks.map((link, index) => {
            const isActive = activeLink === link.href;
            return (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 + 0.4 }}
                whileHover={{ x: 6 }}
                className="relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer group"
                style={{
                  backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'transparent',
                  color: isActive ? 'white' : 'rgba(255,255,255,0.8)',
                }}
              >
                {/* Active indicator bar */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="activeBar"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 rounded-full bg-white"
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      exit={{ opacity: 0, scaleY: 0 }}
                    />
                  )}
                </AnimatePresence>

                {/* Hover background */}
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                />

                <link.Icon
                  className="w-4 h-4 relative z-10 flex-shrink-0"
                  style={{
                    filter: isActive ? 'drop-shadow(0 0 6px rgba(255,255,255,0.9))' : 'none',
                    opacity: isActive ? 1 : 0.75,
                  }}
                />
                <span className="relative z-10">{link.name}</span>
              </motion.a>
            );
          })}
        </nav>

        {/* Donate CTA at bottom */}
        <div className="relative z-10 px-4 pb-8">
          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
            whileHover={{
              scale: 1.04,
              boxShadow: '0 0 30px rgba(255,255,255,0.5)',
            }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center justify-center gap-2 w-full py-3 bg-white text-[#8A5AB9] font-bold text-sm rounded-full cursor-pointer"
            style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
          >
            <Heart className="w-4 h-4" fill="currentColor" />
            Donate Now
          </motion.a>

          {/* Version tag */}
          <p className="text-center text-white/40 text-xs mt-4">
            © 2025 ELEV8 GOD WITHIN
          </p>
        </div>
      </motion.aside>

      {/* ===================== MOBILE TOP BAR ===================== */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-16 lg:hidden"
        style={{
          background: 'linear-gradient(135deg, #8A5AB9, #9F81B9)',
          boxShadow: '0 4px 20px rgba(138,90,185,0.4)',
        }}
      >
        <motion.a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
          className="flex flex-col"
          whileTap={{ scale: 0.97 }}
        >
          <span className="text-white font-bold text-sm tracking-wider">ELEV8 GOD WITHIN</span>
          <span className="text-white/70 text-xs tracking-widest">MINISTRIES</span>
        </motion.a>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-white"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </motion.header>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-16 z-40 lg:hidden"
            style={{
              background: 'linear-gradient(180deg, #8A5AB9, #9F81B9)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 10px 40px rgba(138,90,185,0.5)',
            }}
          >
            <nav className="flex flex-col py-4">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 px-6 py-3 text-white/90 text-base font-medium hover:text-white hover:bg-white/10 transition-colors"
                >
                  <link.Icon className="w-4 h-4 opacity-80" />
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="mx-6 mt-4 px-6 py-3 bg-white text-center font-bold rounded-full flex items-center justify-center gap-2"
                style={{ color: '#8A5AB9' }}
              >
                <Heart className="w-4 h-4" fill="currentColor" />
                Donate Now
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
