import { motion } from 'framer-motion';
import { FaHeartbeat } from 'react-icons/fa';

function HeroSection() {
  return (
    <div className="relative bg-[#FF3131] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-24 relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <FaHeartbeat className="text-white/10 text-6xl" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center relative z-10"
        >
          {/* Animated Title Container */}
          <div className="mb-12 relative">
            {/* Main Title with Gradient and Animation */}
            <motion.div
              className="relative inline-block"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Pulse Effect Background */}
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Title with Heart Icon */}
              <div className="relative flex items-center justify-center gap-4">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 2, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <FaHeartbeat className="text-7xl text-white drop-shadow-glow" />
                </motion.div>
                
                <h1 className="text-8xl font-bold bg-gradient-to-r from-white via-red-300 to-white bg-clip-text text-transparent drop-shadow-glow">
                  HearT-GuarD
                </h1>
              </div>

              {/* Animated Underline */}
              <motion.div
                className="h-1 bg-gradient-to-r from-transparent via-white to-transparent mt-2"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </motion.div>
          </div>

          {/* Subtitle with Typing Effect */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-2xl mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            Revolutionizing Cardiac Diagnosis: A Hybrid Framework for Automated Detection of Heart Diseases.
            <br />
            <span className="text-red-200">
              Leveraging Vision Transformers and Stacking for Accurate, Efficient ECG Signal Analysis.
            </span>
            <br />
            Empowering healthcare professionals to swiftly diagnose cardiovascular conditions and improve patient outcomes.
          </motion.p>

          {/* Decorative Elements */}
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" className="text-white/50">
              <motion.path
                d="M12 5v14m-7-7h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Add custom styles for glow effect */}
      <style>{`
        .drop-shadow-glow {
          filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.7));
        }
      `}</style>
    </div>
  );
}

export default HeroSection;