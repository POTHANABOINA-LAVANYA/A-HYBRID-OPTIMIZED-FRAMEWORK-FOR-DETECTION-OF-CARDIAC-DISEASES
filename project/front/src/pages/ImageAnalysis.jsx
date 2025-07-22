import { useState } from 'react';
import { motion } from 'framer-motion';

function ImageAnalysis() {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: ''
  });
  const [errors, setErrors] = useState({});
  const [riskResult, setRiskResult] = useState(null);

  // Define limits for each input
  const limits = {
    age: { min: 1, max: 120, label: "Age (1-120)" },
    sex: { min: 0, max: 1, label: "Sex (0: Female, 1: Male)" },
    cp: { min: 0, max: 3, label: "Chest Pain Type (0-3)" },
    trestbps: { min: 90, max: 200, label: "Resting Blood Pressure (90-200 mmHg)" },
    chol: { min: 100, max: 600, label: "Cholesterol (100-600 mg/dL)" },
    fbs: { min: 0, max: 1, label: "Fasting Blood Sugar (0: <120mg/dL, 1: >120mg/dL)" },
    restecg: { min: 0, max: 2, label: "Resting ECG (0-2)" },
    thalach: { min: 60, max: 220, label: "Max Heart Rate (60-220 bpm)" },
    exang: { min: 0, max: 1, label: "Exercise-induced Angina (0: No, 1: Yes)" },
    oldpeak: { min: 0, max: 6, label: "ST Depression (0-6)" },
    slope: { min: 0, max: 2, label: "Slope of ST Segment (0-2)" },
    ca: { min: 0, max: 4, label: "Major Vessels (0-4)" },
    thal: { min: 0, max: 3, label: "Thalassemia (0-3)" }
  };

  // Background animation configuration
  const backgroundElements = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 40 + 20,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
    initialX: Math.random() * window.innerWidth,
    initialY: Math.random() * window.innerHeight,
  }));

  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      const value = parseFloat(formData[key]);
      if (isNaN(value) || value < limits[key].min || value > limits[key].max) {
        newErrors[key] = `Value must be between ${limits[key].min} and ${limits[key].max}`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:5000/api/risk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setRiskResult(data.prediction === 1 ? { level: 'high' } : { level: 'low' });
      } else {
        alert('Error calculating risk');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting the form');
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-purple-900 to-blue-900 overflow-hidden">
      {backgroundElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full bg-white/5 backdrop-blur-sm"
          style={{ width: element.size, height: element.size }}
          initial={{ x: element.initialX, y: element.initialY, opacity: 0.3 }}
          animate={{
            x: [element.initialX, element.initialX + 100, element.initialX - 100, element.initialX],
            y: [element.initialY, element.initialY - 100, element.initialY + 100, element.initialY],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: element.duration, repeat: Infinity, delay: element.delay, ease: "linear" }}
        />
      ))}

      <div className="max-w-3xl mx-auto px-4 py-12 relative z-10">
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-xl border border-white/20 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="space-y-6">
            {Object.keys(formData).map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium text-white">
                  {limits[key].label}
                </label>
                <input
                  type="number"
                  value={formData[key]}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  placeholder={`Enter ${limits[key].label}`}
                  className={`mt-1 block w-full rounded-md bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-purple-500 focus:ring-purple-500 ${
                    errors[key] ? 'border-red-500' : ''
                  }`}
                  required
                />
                {errors[key] && <p className="text-red-400 text-sm mt-1">{errors[key]}</p>}
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
            >
              Calculate Risk
            </button>
          </div>
        </motion.form>

        {riskResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-xl border border-white/20"
          >
            <div
              className={`mb-6 p-4 rounded-lg ${
                riskResult.level === 'high' ? 'bg-red-500/20 text-red-100' : 'bg-green-500/20 text-green-100'
              }`}
            >
              <h2 className="text-xl font-semibold mb-2">Risk Level: {riskResult.level.toUpperCase()}</h2>
              <p>Based on your health data, here are personalized recommendations:</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default ImageAnalysis;
