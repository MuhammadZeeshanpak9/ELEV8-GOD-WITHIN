import { useRef, useState, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import { ConnectedNodes, FloatingOrbs } from '../components/animations/ParticleField';
import { Send, User, Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

interface FormInputProps {
  type?: string;
  placeholder: string;
  icon: ReactNode;
  delay?: number;
  isTextarea?: boolean;
}

// STRICT COLOR: Only #9F81B9 and white allowed
function FormInput({ type = 'text', placeholder, icon, delay = 0, isTextarea = false }: FormInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const InputComponent = isTextarea ? 'textarea' : 'input';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative"
    >
      <motion.div
        className={`relative flex items-start ${isTextarea ? 'h-32' : 'h-14'} bg-white rounded-xl border-2 transition-all duration-300 overflow-hidden`}
        animate={{
          borderColor: isFocused ? '#8A5AB9' : '#e5e7eb',
          boxShadow: isFocused
            ? '0 0 20px rgba(138, 90, 185, 0.4)'
            : '0 0 0px rgba(138, 90, 185, 0)',
        }}
      >
        {/* Icon */}
        <motion.div
          className="flex items-center justify-center w-12 h-full"
          animate={{
            color: isFocused ? '#9F81B9' : '#9ca3af',
          }}
        >
          {icon}
        </motion.div>

        {/* Input */}
        <InputComponent
          type={type}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            setHasValue(e.target.value.length > 0);
          }}
          onChange={(e) => setHasValue(e.target.value.length > 0)}
          className={`flex-1 bg-transparent text-gray-800 placeholder-gray-400 outline-none ${isTextarea ? 'pt-4 resize-none' : ''
            }`}
        />

        {/* Focus Glow Effect - Royal Purple */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-xl"
          animate={{
            boxShadow: isFocused
              ? 'inset 0 0 0 2px rgba(138, 90, 185, 0.5)'
              : 'inset 0 0 0 0px rgba(138, 90, 185, 0)',
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Bottom Line Animation - #9F81B9 */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5"
          style={{ background: 'linear-gradient(to right, #9F81B9, rgba(159, 129, 185, 0.7))' }}
          initial={{ width: '0%' }}
          animate={{ width: isFocused ? '100%' : hasValue ? '100%' : '0%' }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>

      {/* Floating Label - #9F81B9 */}
      <motion.label
        className="absolute left-12 text-sm font-medium pointer-events-none bg-white px-1"
        style={{ color: '#9F81B9' }}
        initial={{ y: 0, opacity: 0, scale: 0.8 }}
        animate={{
          y: isFocused || hasValue ? -28 : 0,
          opacity: isFocused || hasValue ? 1 : 0,
          scale: isFocused || hasValue ? 1 : 0.8,
        }}
        transition={{ duration: 0.2 }}
      >
        {placeholder}
      </motion.label>
    </motion.div>
  );
}

export function JoinCreators() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <ConnectedNodes className="opacity-30" />
      <FloatingOrbs className="opacity-20" />

      {/* Decorative Blobs - #9F81B9 */}
      <motion.div
        className="absolute top-20 right-0 w-96 h-96 rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(159, 129, 185, 0.08)' }}
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-0 w-80 h-80 rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(159, 129, 185, 0.05)' }}
        animate={{
          scale: [1.1, 1, 1.1],
          x: [0, -20, 0],
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            >
              {'JOIN OUR GLOBAL CREATORS'.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
                  animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  className="inline-block mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>

            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: '100px' } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="h-1 rounded-full mx-auto"
              style={{ background: 'linear-gradient(to right, #9F81B9, rgba(159, 129, 185, 0.5))' }}
            />
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative bg-white rounded-3xl p-8 lg:p-12 border"
            style={{
              boxShadow: '0 20px 60px -15px rgba(159, 129, 185, 0.2)',
              borderColor: 'rgba(159, 129, 185, 0.1)',
            }}
          >
            {/* Decorative Corner - #9F81B9 */}
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 rounded-full -z-10"
              style={{ backgroundColor: 'rgba(159, 129, 185, 0.1)' }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full -z-10"
              style={{ backgroundColor: 'rgba(159, 129, 185, 0.05)' }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Email Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <FormInput
                  type="text"
                  placeholder="Name"
                  icon={<User className="w-5 h-5" />}
                  delay={0.4}
                />
                <FormInput
                  type="email"
                  placeholder="Email"
                  icon={<Mail className="w-5 h-5" />}
                  delay={0.5}
                />
              </div>

              {/* Phone & City Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <FormInput
                  type="tel"
                  placeholder="Phone"
                  icon={<Phone className="w-5 h-5" />}
                  delay={0.6}
                />
                <FormInput
                  type="text"
                  placeholder="City"
                  icon={<MapPin className="w-5 h-5" />}
                  delay={0.7}
                />
              </div>

              {/* Message */}
              <FormInput
                placeholder="Message"
                icon={<MessageSquare className="w-5 h-5" />}
                delay={0.8}
                isTextarea
              />

              {/* Submit Button - #9F81B9 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 hover-lift shadow-xl glow-purple-strong ${isSubmitted
                      ? 'text-white'
                      : 'text-white hover:shadow-2xl'
                    }`}
                  style={{
                    backgroundColor: isSubmitted ? '#22c55e' : '#8A5AB9',
                  }}
                >
                  {isSubmitting ? (
                    <motion.div
                      className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                  ) : isSubmitted ? (
                    <>
                      <motion.svg
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </motion.svg>
                      Submitted Successfully!
                    </>
                  ) : (
                    <>
                      Submit
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>

            {/* Success Message */}
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-xl text-center"
                style={{
                  backgroundColor: 'rgba(159, 129, 185, 0.1)',
                  color: '#9F81B9',
                }}
              >
                Thank you for joining our global creators community!
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
