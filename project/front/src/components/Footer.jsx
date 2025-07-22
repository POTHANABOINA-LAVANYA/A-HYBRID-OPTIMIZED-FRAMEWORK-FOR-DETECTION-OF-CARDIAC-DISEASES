import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section with Enhanced Heart Animation */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
              {/* Animated Heart SVG */}
              <motion.div
                className="relative w-12 h-12"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <svg 
                  viewBox="0 0 100 100" 
                  className="w-full h-full"
                >
                  {/* Heart Shape */}
                  <motion.path
                    d="M50 88.9L15.5 54.4c-4.8-4.8-7.4-11.1-7.4-17.8c0-13.9 11.3-25.2 25.2-25.2c7.5 0 14.5 3.4 19.2 8.9c4.7-5.5 11.7-8.9 19.2-8.9c13.9 0 25.2 11.3 25.2 25.2c0 6.7-2.6 13-7.4 17.8L50 88.9z"
                    fill="#ef4444"
                    stroke="#ef4444"
                    strokeWidth="2"
                    animate={{
                      scale: [1, 1.1, 1],
                      fill: ["#ef4444", "#dc2626", "#ef4444"]
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />

                  {/* ECG Line */}
                  <motion.path
                    d="M10 75 L25 75 L30 65 L35 85 L40 75 L45 75 L50 75 L55 45 L60 95 L65 75 L90 75"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: 1,
                      opacity: [0, 1, 1, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />

                  {/* Lub-Dub Text */}
                  <motion.text
                    x="50"
                    y="110"
                    textAnchor="middle"
                    className="text-xs fill-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 0.5
                    }}
                  >
                    lub-dub
                  </motion.text>
                </svg>
              </motion.div>

              <div className="flex flex-col">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                  HearT-GuarD
                </h3>
                <span className="text-xs text-red-400">K N O W - Y O U R - R I S K</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm"></p>
          </div>

          {/* Quick Links Section */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/analysis" className="text-gray-300 hover:text-white transition-colors">
                  Image Analysis
                </Link>
              </li>
              <li>
                <Link to="/analysis" className="text-gray-300 hover:text-white transition-colors">
                  Risk Assessment
                </Link>
              </li>
              <li>
                <Link to="/risk-and-symptoms" className="text-gray-300 hover:text-white transition-colors">
                  Health Guide
                </Link>
              </li>
              <li>
                <Link to="/food-recommendations" className="text-gray-300 hover:text-white transition-colors">
                  ECG's
                </Link>
              </li>
              <li>
                <Link to="/stories" className="text-gray-300 hover:text-white transition-colors">
                  
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <FaEnvelope className="text-gray-300" />
              <a href="mailto:heartguard@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                heartguard@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section with Heartbeat Line */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center relative">
          <motion.div
            className="absolute left-0 right-0 top-0 h-0.5 bg-red-500"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <p className="text-gray-300">&copy; {new Date().getFullYear()} HearT-GuarD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;