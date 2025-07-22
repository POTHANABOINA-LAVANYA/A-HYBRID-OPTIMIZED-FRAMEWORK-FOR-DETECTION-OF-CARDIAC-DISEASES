import { motion } from 'framer-motion';
import { FaHeartbeat } from 'react-icons/fa';
import heartBg from '../assets/a11.png';
import xaiImage1 from '../assets/c1.png';
import xaiImage2 from '../assets/c2.png';

function PatientStories() {
  const xaiCards = [
    {
      title: "Arrhythmias",
      description: "",
      image: xaiImage1
    },
    {
      title: "Myocardial Infarction and Ischemia",
      description: "",
      image: xaiImage2
    }
  ];

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-800 to-gray-900">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url(${heartBg})`,
          backgroundSize: '600px',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
          filter: 'blur(0.5px)'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center items-center gap-4 mb-6">
            <FaHeartbeat className="text-5xl text-red-500" />
            <h1 className="text-4xl font-bold text-white">
             Detects 20+ Cardiac Abnormalities
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
           Identify Over 20 Heart Abnormalities With The ECG 
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-20">
          {xaiCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:transform hover:scale-105 transition-transform duration-300"
            >
              {/* Image Container - Increased height and adjusted padding */}
              <div className="relative h-[1000px] overflow-hidden bg-white/5">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-contain p-18"
                  style={{
                    maxHeight: '46%',
                    width: '98%',
                    margin: '0 auto'
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-4 bg-black/30">
                <h3 className="text-4xl font-bold text-white mb-4 flex items-center gap-2">
                  <FaHeartbeat className="text-red-500" />
                  {card.title}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500/20 to-transparent rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-red-500/20 to-transparent rounded-tr-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PatientStories;