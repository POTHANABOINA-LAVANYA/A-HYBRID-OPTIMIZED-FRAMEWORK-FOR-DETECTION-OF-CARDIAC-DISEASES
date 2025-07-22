import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import heartImage from '../assets/b1.png';

function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/learning', label: 'Image Analysis', protected: true },
    { path: '/analysis', label: 'Risk Assessment', protected: true },
    { path: '/food-recommendations', label: 'Health Guide', protected: true },
    { path: '/stories', label: 'ECGs', protected: true }
  ];

  const handleNavClick = (path, isProtected) => {
    if (isProtected && !user) {
      navigate('/signin');
      return;
    }
    navigate(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-12 h-12"
            >
              <motion.div
                className="relative w-full h-full"
                animate={{
                  scale: [1, 1.05, 1],
                  filter: [
                    'drop-shadow(0 0 0px rgba(239, 68, 68, 0.5))',
                    'drop-shadow(0 0 4px rgba(239, 68, 68, 0.5))',
                    'drop-shadow(0 0 0px rgba(239, 68, 68, 0.5))'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <img 
                  src={heartImage} 
                  alt="Heart Care"
                  className="w-full h-full object-contain"
                />
                {/* Pulse Effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-red-500 -z-10"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.1, 0.2]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                {/* ECG Line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-red-500"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                HearT-GuarD
              </span>
              <span className="text-xs text-red-500 font-medium">K N O W - Y O U R - R I S K</span>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <motion.button
                key={item.path}
                onClick={() => handleNavClick(item.path, item.protected)}
                className="text-gray-700 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium transition-colors relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                  initial={false}
                />
              </motion.button>
            ))}
            {user ? (
              <motion.button
                onClick={signOut}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-md hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Log OUT
              </motion.button>
            ) : (
              <motion.button
                onClick={() => navigate('/signin')}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-md hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Log IN
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;