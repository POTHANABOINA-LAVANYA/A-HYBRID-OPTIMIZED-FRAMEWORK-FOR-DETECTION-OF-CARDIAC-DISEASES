import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import SignUpForm from '../../components/auth/SignUpForm';
import SuccessMessage from '../../components/auth/SuccessMessage';
import { FaHeartbeat } from 'react-icons/fa';
import logo from '../../assets/logo1.jpg';

function SignUp() {
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    // Store user data in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate('/signin');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-red-200 to-red-100 py-12">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden relative">
        {/* Left Side - Info */}
        <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-red-600 to-red-800 text-white p-12">
          <div className="mb-8">
            <div className="flex items-center justify-center gap-6 mb-6">
              <FaHeartbeat className="text-7xl animate-pulse" />
              <img 
                src={logo} 
                alt="HearT-GuarD Logo" 
                className="w-24 h-24 object-contain"
              />
            </div>
            <h2 className="text-3xl font-bold text-center mb-4">HearT-GuarD</h2>
            <p className="text-center mb-8">KNOW YOUR RISK</p>
          </div>
          <Link
            to="/signin"
            className="px-8 py-2 border-2 border-white rounded-lg hover:bg-white hover:text-red-700 transition-colors"
          >
            Sign In
          </Link>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 md:p-12 bg-white relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="flex items-center gap-4 mb-4">
                <FaHeartbeat className="text-5xl text-red-600" />
                <img 
                  src={logo} 
                  alt="HearT-GuarD Logo" 
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h1 className="text-3xl font-bold">Join HearT-GuarD</h1>
            </div>
            <p className="text-center text-gray-600 mb-8">Create an account to access heart health assessment tools and personalized recommendations</p>
            
            <SignUpForm onSubmit={handleSubmit} />
          </motion.div>
        </div>

        <AnimatePresence>
          {showSuccess && (
            <SuccessMessage message="Welcome to HearT-GuarD!" />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SignUp;