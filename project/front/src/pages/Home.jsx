import { motion } from 'framer-motion';
import { FaHeartbeat } from 'react-icons/fa';
import heartVideo from '../assets/a1.mp4';
import heartStructureImage from '../assets/b.png';
import heartBg from '../assets/a11.png';
import sloganImage from '../assets/b2.png';
import ecgImage from '../assets/h.png';
import HeroSection from '../components/home/HeroSection';

function Home() {
  return (
    <div className="relative">
      {/* Background Pattern */}
      <div 
        className="fixed inset-0 min-h-screen py-50 px-50 bg-gradient-to-br from-gray-500 to-gray-500"
        style={{
          backgroundImage: `url(${heartBg})`,
          backgroundSize: '600px',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
          filter: 'blur(0.5px)',
          opacity: 0.05
        }}
      />

      <div className="relative z-10">
        <HeroSection />
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Heart Information Section */}
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-200"
          >
            <div className="grid md:grid-cols-2 gap-8 p-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative rounded-xl overflow-hidden shadow-lg"
              >
                <video
                  className="w-full h-full object-cover rounded-xl"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={heartVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <FaHeartbeat className="text-3xl text-red-600" />
                  <h2 className="text-3xl font-bold text-gray-800">The Heart</h2>
                </div>

                <div className="prose max-w-none text-gray-600 space-y-4">
                  <p className="leading-relaxed">
                    The heart is a highly specialized, muscular organ that is central to the circulatory system, 
                    playing a pivotal role in maintaining life by ensuring that blood is continuously pumped 
                    throughout the body. Its primary function is to circulate blood, which delivers essential 
                    nutrients, oxygen, and hormones to cells while removing metabolic waste products, such as 
                    carbon dioxide and urea.
                  </p>

                  <p className="leading-relaxed">
                    The heart is not only responsible for pumping blood but also plays a key role in the overall homeostasis of the body. 
                    Keeping the heart healthy through a balanced lifestyle is essential for maintaining both short- and long-term health.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mt-6">
                    Circulatory System and Blood Circulation
                  </h3>
                  
                  <div className="space-y-4 pl-6">
                    <div className="border-l-4 border-red-500 pl-4">
                      <h4 className="font-semibold text-gray-800">Pulmonary Circulation</h4>
                      <p className="text-gray-600">
                        The right side of the heart pumps deoxygenated blood to the lungs, where carbon dioxide 
                        is exchanged for oxygen. This oxygen-rich blood then returns to the heart to be 
                        distributed throughout the body.
                      </p>
                    </div>

                    <div className="border-l-4 border-red-500 pl-4">
                      <h4 className="font-semibold text-gray-800">Systemic Circulation</h4>
                      <p className="text-gray-600">
                        The left side pumps oxygenated blood to the rest of the body, delivering oxygen, 
                        nutrients, and hormones to all cells, tissues, and organs. The blood also collects 
                        waste products like carbon dioxide and urea, which are then transported to the lungs 
                        and kidneys for removal.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* Heart Structure Section */}
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-200"
          >
            <div className="grid md:grid-cols-2 gap-8 p-8">
              {/* Structure Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                  <FaHeartbeat className="text-red-600" />
                  Structure of the Heart
                </h2>

                <div className="space-y-6">
                  {/* External Structure */}
                  <div className="bg-white/90 rounded-lg p-6 shadow-md">
                    <h3 className="text-xl font-semibold text-red-700 mb-4">External Structure</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Size: ~5 inches long, 3.5 inches wide, 2.5 inches deep</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Located in chest cavity, slightly left of sternum</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Three layers: Epicardium, Myocardium, Endocardium</span>
                      </li>
                    </ul>
                  </div>

                  {/* Internal Structure */}
                  <div className="bg-white/90 rounded-lg p-6 shadow-md">
                    <h3 className="text-xl font-semibold text-red-700 mb-4">Internal Structure</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Four chambers: Right & Left Atria and Ventricles</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Four valves: Tricuspid, Pulmonary, Mitral, Aortic</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Septum divides right and left sides</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Heart Structure Image */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative flex items-center justify-center"
              >
                <img
                  src={heartStructureImage}
                  alt="Heart Structure Diagram"
                  className="w-full h-auto max-h-[600px] object-contain rounded-lg shadow-lg"
                />
              </motion.div>
            </div>

            {/* Additional Heart Components */}
            <div className="grid md:grid-cols-3 gap-6 p-8 bg-white/50">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg p-6 shadow-md"
              >
                <h4 className="text-lg font-semibold text-red-700 mb-3">Blood Vessels</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Superior/Inferior Vena Cava</li>
                  <li>• Pulmonary Artery</li>
                  <li>• Aorta</li>
                  <li>• Coronary Arteries</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg p-6 shadow-md"
              >
                <h4 className="text-lg font-semibold text-red-700 mb-3">Electrical System</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• SA Node (Pacemaker)</li>
                  <li>• AV Node</li>
                  <li>• Bundle of His</li>
                  <li>• Purkinje Fibers</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg p-6 shadow-md"
              >
                <h4 className="text-lg font-semibold text-red-700 mb-3">Protective Layers</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Pericardium</li>
                  <li>• Epicardium</li>
                  <li>• Myocardium</li>
                  <li>• Endocardium</li>
                </ul>
              </motion.div>
            </div>
          </motion.section>

          {/* New ECG Information Section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-200"
          >
            <div className="grid md:grid-cols-2 gap-8 p-8">
              {/* ECG Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                  <FaHeartbeat className="text-red-600" />
                  Electrocardiogram (ECG)
                </h2>

                <p className="text-gray-700 leading-relaxed">
                  An Electrocardiogram (ECG) is a test that records the electrical activity of the heart. It measures heart rhythms, electrical impulses, and can identify various heart conditions.
                </p>

                <div className="space-y-6">
                  {/* Key Components */}
                  <div className="bg-white/90 rounded-lg p-6 shadow-md">
                    <h3 className="text-xl font-semibold text-red-700 mb-4">Key Components</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>P wave: Atrial depolarization (contraction of the atria)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>QRS Complex: Ventricular depolarization (contraction of the ventricles)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>T wave: Ventricular repolarization (recovery of ventricles)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>PR interval: Time for electrical impulse travel from atria to ventricles</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>QT interval: Time for ventricular depolarization and repolarization</span>
                      </li>
                    </ul>
                  </div>

                  {/* Diseases Detected */}
                  <div className="bg-white/90 rounded-lg p-6 shadow-md">
                    <h3 className="text-xl font-semibold text-red-700 mb-4">Diseases Detected by ECG</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Arrhythmias: Irregular heart rhythms</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Myocardial Infarction (Heart Attack)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Heart Block: Delays in electrical signals</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Ischemia: Reduced blood flow to the heart</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Heart Hypertrophy: Enlargement of heart chambers</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* ECG Image */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative flex items-center justify-center"
              >
                <img
                  src={ecgImage}
                  alt="ECG Diagram"
                  className="w-full h-auto max-h-[600px] object-contain rounded-lg shadow-lg"
                />
              </motion.div>
            </div>

            {/* Disease Prediction Information */}
            <div className="bg-white/50 p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg p-6 shadow-md"
              >
                <h3 className="text-xl font-semibold text-red-700 mb-4">How ECG Predicts Disease</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Identifies risk factors for arrhythmias, heart attacks, and heart failure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Monitors treatment effectiveness for heart conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Early detection of ischemia and other issues, even before symptoms show</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.section>

          {/* Simplified Slogan Card Section */}
          {/* <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 bg-gradient-to-r from-green-50 to-yellow-50 rounded-2xl shadow-xl overflow-hidden border border-green-200"
          >
            <div className="grid md:grid-cols-2 items-center">
              {/* Slogan Side */}
              {/* <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="p-12"
              > */}
                {/* <motion.div
                  animate={{
                    scale: [1, 1.02, 1],
                    opacity: [0.9, 1, 0.9]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative"
                >
                  <h2 className="text-8xl font-family: 'italian',  font-bold bg-gradient-to-r from-green-500 to-yellow-800 bg-clip-text text-transparent">
                    Assess Today,
                  </h2>
                  <h2 className="text-8xl font-bold bg-gradient-to-r from-green-600 to-yellow-900 bg-clip-text text-transparent mt-2">
                    Protect Tomorrow!
                  </h2>
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-green-400 to-yellow-400 opacity-20 blur-lg rounded-lg"
                    animate={{
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div> */}
              {/* </motion.div> */}

              {/* Image Side */}
              {/* <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="relative h-full"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.02, 1],
                    rotate: [0, 1, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="p-8"
                >
                  <img
                    src={sloganImage}
                    alt="Heart Health Assessment"
                    className="w-full h-auto max-h-[400px] object-contain rounded-lg shadow-2xl"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-yellow-500/10 rounded-lg"
                    animate={{
                      opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </motion.div> */}
            </div>
          {/* </motion.section> */} 
        {/* </div> */}
      </div>
    </div>
  );
}

export default Home;