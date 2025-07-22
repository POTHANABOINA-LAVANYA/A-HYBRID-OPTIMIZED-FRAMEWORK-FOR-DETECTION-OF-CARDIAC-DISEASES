import { useState } from 'react';
import { motion } from 'framer-motion';
import heartBg from '../assets/a11.png';

function RiskAndSymptoms() {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    chestPainType: '',
    bloodPressure: '',
    cholesterol: '',
    bloodSugar: '',
    ecgResults: '',
    maxHeartRate: '',
    exerciseAngina: '0',
    exerciseRelative: '',
    slope: '',
    vessels: '',
    thalium: ''
  });

  const [results, setResults] = useState(null);

  // Generate age options from 10 to 100
  const ageOptions = Array.from({ length: 91 }, (_, i) => i + 10);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReset = () => {
    setFormData({
      age: '',
      sex: '',
      chestPainType: '',
      bloodPressure: '',
      cholesterol: '',
      bloodSugar: '',
      ecgResults: '',
      maxHeartRate: '',
      exerciseAngina: '0',
      exerciseRelative: '',
      slope: '',
      vessels: '',
      thalium: ''
    });
    setResults(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResults("Based on the provided metrics, your heart disease risk analysis indicates moderate risk. Please consult with a healthcare professional for a comprehensive evaluation.");
  };

  return (
    <div 
      className="min-h-screen py-8 px-4 relative"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto relative z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Heart Disease Risk Assessment
          </h1>
          <p className="text-gray-300">
            Complete all fields below for a comprehensive heart health evaluation
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-white text-sm mb-2">Age:</label>
                <select
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/30 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                >
                  <option value="">Select Age</option>
                  {ageOptions.map(age => (
                    <option key={age} value={age}>{age}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white text-sm mb-2">Gender:</label>
                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/30 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-sm mb-2">Blood Sugar Level:</label>
                <select
                  name="bloodSugar"
                  value={formData.bloodSugar}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/30 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                >
                  <option value="">Select Blood Sugar Level</option>
                  <option value="normal">Normal (70-99 mg/dL)</option>
                  <option value="prediabetes">Prediabetes (100-125 mg/dL)</option>
                  <option value="diabetes">Diabetes (126+ mg/dL)</option>
                  <option value="high">High (180-250 mg/dL)</option>
                  <option value="very-high">Very High (250+ mg/dL)</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-sm mb-2">Chest Pain Type (between 0 & 3):</label>
                <input
                  type="number"
                  name="chestPainType"
                  value={formData.chestPainType}
                  onChange={handleInputChange}
                  min="0"
                  max="3"
                  className="w-full bg-white/10 border border-white/30 rounded px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-2">Resting Blood Pressure (between 94 & 200):</label>
                <input
                  type="number"
                  name="bloodPressure"
                  value={formData.bloodPressure}
                  onChange={handleInputChange}
                  min="94"
                  max="200"
                  className="w-full bg-white/10 border border-white/30 rounded px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-2">Serum Cholesterol (between 126 & 564):</label>
                <input
                  type="number"
                  name="cholesterol"
                  value={formData.cholesterol}
                  onChange={handleInputChange}
                  min="126"
                  max="564"
                  className="w-full bg-white/10 border border-white/30 rounded px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
            </div>
          </motion.div>

          {/* Advanced Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">Advanced Metrics</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-white text-sm mb-2">Resting Electrocardiographic Results (between 0 & 2):</label>
                <input
                  type="number"
                  name="ecgResults"
                  value={formData.ecgResults}
                  onChange={handleInputChange}
                  min="0"
                  max="2"
                  className="w-full bg-white/10 border border-white/30 rounded px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-2">Maximum Heart Rate (between 71 & 202):</label>
                <input
                  type="number"
                  name="maxHeartRate"
                  value={formData.maxHeartRate}
                  onChange={handleInputChange}
                  min="71"
                  max="202"
                  className="w-full bg-white/10 border border-white/30 rounded px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-2">Exercise Induced Angina (0 or 1):</label>
                <select
                  name="exerciseAngina"
                  value={formData.exerciseAngina}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/30 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="0">0 (No)</option>
                  <option value="1">1 (Yes)</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-sm mb-2">ST Depression Induced by Exercise (between 0 & 6.2):</label>
                <input
                  type="number"
                  name="exerciseRelative"
                  value={formData.exerciseRelative}
                  onChange={handleInputChange}
                  min="0"
                  max="6.2"
                  step="0.1"
                  className="w-full bg-white/10 border border-white/30 rounded px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-2">Slope (between 0 & 2):</label>
                <input
                  type="number"
                  name="slope"
                  value={formData.slope}
                  onChange={handleInputChange}
                  min="0"
                  max="2"
                  className="w-full bg-white/10 border border-white/30 rounded px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-2">Number of Major Vessels (between 0 & 3):</label>
                <input
                  type="number"
                  name="vessels"
                  value={formData.vessels}
                  onChange={handleInputChange}
                  min="0"
                  max="3"
                  className="w-full bg-white/10 border border-white/30 rounded px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-2">Thalium Stress Test (between 1 & 3):</label>
                <input
                  type="number"
                  name="thalium"
                  value={formData.thalium}
                  onChange={handleInputChange}
                  min="1"
                  max="3"
                  className="w-full bg-white/10 border border-white/30 rounded px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
            </div>
          </motion.div>
        </form>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={handleReset}
            className="px-8 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Analyze Risk
          </button>
        </div>

        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white/10 backdrop-blur-md rounded-lg p-6 text-white border border-white/20"
          >
            <h2 className="text-2xl font-semibold mb-4">Analysis Results</h2>
            <p className="text-lg">{results}</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default RiskAndSymptoms;