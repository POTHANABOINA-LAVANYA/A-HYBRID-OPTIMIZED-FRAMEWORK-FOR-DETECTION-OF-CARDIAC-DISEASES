import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { FaUpload, FaSpinner, FaCheck, FaTimes, FaHeartbeat } from 'react-icons/fa';
import heartBg from '../assets/a11.png';
import defaultEcg from '../assets/image.jpeg';
import toast from 'react-hot-toast'

function Learning() {
  const [selectedImage, setSelectedImage] = useState(defaultEcg);
  const [isProcessing, setIsProcessing] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      await sendImageToBackend(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    multiple: false
  });

  const handleReset = () => {
    setSelectedImage(defaultEcg);
    setPredictionResult(null);
    setIsProcessing(false);
  };

  const sendImageToBackend = async (file) => {
    setIsProcessing(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      setPredictionResult(data);
      toast.success("Prediction Successful")
    } catch (error) {
      console.error('Error processing image:', error);
      setPredictionResult({
        error: 'Server is unreachable or failed to process the image.',
      });
      toast.error("Something went Wrong!")
    } finally {
      setIsProcessing(false);
      // toast.error("Something went Wrong!")
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 relative bg-gray-500">
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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-gray-200">
          <div className="flex items-center justify-center gap-4 mb-8">
            <FaHeartbeat className="text-4xl text-red-500" />
            <h1 className="text-4xl font-bold text-gray-800 text-center drop-shadow-sm">
              Upload ECG Image for Prediction
            </h1>
          </div>
          <div className="space-y-8">
            <div className="flex flex-col items-center space-y-6">
              <div
                {...getRootProps()}
                className={`w-full aspect-[14/10] rounded-lg border-4 border-dashed relative overflow-hidden ${
                  isDragActive ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-400'
                }`}
              >
                <input {...getInputProps()} />
                <div className="absolute inset-0">
                  <img src={selectedImage} alt="ECG" className="w-full h-full object-contain" />
                  {!predictionResult && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 px-8 py-4 rounded-lg backdrop-blur-sm">
                        <p className="text-white text-xl font-semibold text-center">DRAG OR DROP OR UPLOAD IMAGE HERE</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-900 transition-colors flex items-center gap-2 text-lg"
                  disabled={isProcessing}
                >
                  <FaTimes /> Reset
                </button>
              </div>

              {isProcessing ? (
                <p className="text-lg text-blue-600 flex items-center gap-2">
                  <FaSpinner className="animate-spin" /> Processing...
                </p>
              ) : predictionResult && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center p-4 rounded-lg bg-white/50 backdrop-blur-sm w-full">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Prediction Results</h2>

                  {predictionResult.error ? (
                    <p className="text-red-600 font-semibold">{predictionResult.error}</p>
                  ) : (
                    <>
                      {predictionResult.image_url && (
                        <div className="flex flex-col items-center mb-4">
                          <h3 className="text-lg font-medium text-gray-700 mb-2">Predicted ECG Image</h3>
                          <img src={predictionResult.image_url} alt="Predicted ECG" className="w-full max-w-lg rounded-lg border border-gray-300 shadow-lg" />
                        </div>
                      )}

                      <table className="w-full border-collapse border border-gray-300 text-lg">
                        <tbody>
                          <tr className="border-b">
                            <td className="p-2 font-semibold text-gray-700 bg-gray-200">Predicted Class</td>
                            <td className="p-2">{predictionResult.ans || 'N/A'}</td>
                          </tr>
                        
                          <tr className="border-b">
                            <td className="p-2 font-semibold text-gray-700 bg-gray-200">Number of Peaks</td>
                            <td className="p-2">{predictionResult.peaks ? predictionResult.peaks.length : 'N/A'}</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2 font-semibold text-gray-700 bg-gray-200">RR Interval Variability</td>
                            <td className="p-2">{predictionResult.rr_intervals || 'N/A'}</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2 font-semibold text-gray-700 bg-gray-200">Average RR Interval</td>
                            <td className="p-2">{predictionResult.avg_rr || 'N/A'}</td>
                          </tr>
                        </tbody>
                      </table>
                    </>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Learning;
