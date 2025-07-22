import { motion } from 'framer-motion';

function HeartBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden opacity-10">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.svg
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          viewBox="0 0 32 32"
          className="w-96 h-96 text-red-500"
        >
          <path
            fill="currentColor"
            d="M16 28.72a3 3 0 0 1-2.13-.88l-10.3-10.3a8.72 8.72 0 0 1-2.52-6.25 8.06 8.06 0 0 1 8.14-8A8.06 8.06 0 0 1 16 5.93l.39-.38.13.13a8.15 8.15 0 0 1 6.37-2.4 8.06 8.06 0 0 1 8.14 8 8.72 8.72 0 0 1-2.52 6.25l-10.3 10.3A3 3 0 0 1 16 28.72z"
          />
        </motion.svg>
      </div>
    </div>
  );
}

export default HeartBackground;