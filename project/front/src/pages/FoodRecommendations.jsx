import { motion } from 'framer-motion';
import { FaHeartbeat, FaAppleAlt, FaBan, FaRunning, FaClock } from 'react-icons/fa';
import heartBg from '../assets/a11.png';
import heartImage from '../assets/b1.png';

function FoodRecommendations() {
  const dietaryGuidelines = [
    {
      title: "Heart-Healthy Foods",
      icon: FaHeartbeat,
      items: [
        "Leafy green vegetables (spinach, kale)",
        "Whole grains (oats, quinoa, brown rice)",
        "Berries (strawberries, blueberries)",
        "Fatty fish (salmon, mackerel)",
        "Nuts and seeds (walnuts, flaxseeds)"
      ],
      benefits: "Rich in omega-3, fiber, and antioxidants"
    },
    {
      title: "Foods to Limit",
      icon: FaBan,
      items: [
        "Processed and red meats",
        "Sugary beverages and snacks",
        "Trans fats and saturated fats",
        "High-sodium foods",
        "Refined carbohydrates"
      ],
      benefits: "Reduces risk of heart disease and high blood pressure"
    }
  ];

  const lifestyleRecommendations = [
    {
      title: "Exercise Routine",
      icon: FaRunning,
      items: [
        "30 minutes of moderate exercise daily",
        "Regular cardio activities",
        "Strength training twice a week",
        "Walking after meals",
        "Active lifestyle habits"
      ],
      benefits: "Improves heart health and circulation"
    },
    {
      title: "Meal Timing",
      icon: FaClock,
      items: [
        "Regular meal schedule",
        "Avoid late-night eating",
        "Portion control",
        "Mindful eating practices",
        "Balanced meal planning"
      ],
      benefits: "Supports healthy weight and metabolism"
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 relative bg-gradient-to-br from-gray-500 to-gray-500">
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

      <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center text-white-800 mb-8"
        >
          Heart Disease Prevention Guide
        </motion.h1>

        {/* Animated Heart Logo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-48 h-48 mx-auto mb-12"
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

        <div className="space-y-12">
          {/* Dietary Guidelines Section */}
          <div className="bg-gradient-to-r from-red-50 to-pink-50 p-8 rounded-xl">
            <h2 className="text-3xl font-semibold text-center mb-8">Dietary Guidelines</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {dietaryGuidelines.map((guideline, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <guideline.icon className="text-2xl text-red-600" />
                    <h3 className="text-xl font-semibold">{guideline.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {guideline.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <span className="text-red-600">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-gray-600 italic">
                    <strong>Benefits:</strong> {guideline.benefits}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Lifestyle Recommendations Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl">
            <h2 className="text-3xl font-semibold text-center mb-8">Lifestyle Recommendations</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {lifestyleRecommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <rec.icon className="text-2xl text-blue-600" />
                    <h3 className="text-xl font-semibold">{rec.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {rec.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-gray-600 italic">
                    <strong>Benefits:</strong> {rec.benefits}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Additional Tips Section */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 p-8 rounded-xl">
            <h2 className="text-3xl font-semibold text-center mb-8">Heart Health Tips</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-4 text-green-700">Stress Management</h3>
                <ul className="space-y-2">
                  <li>Practice meditation</li>
                  <li>Get adequate sleep</li>
                  <li>Try deep breathing exercises</li>
                  <li>Maintain work-life balance</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-4 text-green-700">Regular Monitoring</h3>
                <ul className="space-y-2">
                  <li>Check blood pressure</li>
                  <li>Monitor cholesterol levels</li>
                  <li>Track heart rate</li>
                  <li>Regular health check-ups</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-4 text-green-700">Lifestyle Changes</h3>
                <ul className="space-y-2">
                  <li>Quit smoking</li>
                  <li>Limit alcohol intake</li>
                  <li>Stay hydrated</li>
                  <li>Maintain healthy weight</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodRecommendations;