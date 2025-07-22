import { useState } from 'react';
import FormInput from './FormInput';
import PasswordInput from './PasswordInput';

function SignUpForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.includes('@')) {
      newErrors.email = 'Email must contain @ symbol';
    }

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormInput
        label="Full Name"
        value={formData.fullName}
        onChange={handleInputChange('fullName')}
        placeholder="Enter your full name"
        required
      />

      <FormInput
        label="Email ID"
        type="email"
        value={formData.email}
        onChange={handleInputChange('email')}
        placeholder="Enter your email"
        required
        error={errors.email}
      />

      <div className="grid grid-cols-2 gap-4">
        <PasswordInput
          label="Password"
          value={formData.password}
          onChange={handleInputChange('password')}
          placeholder="Enter password"
        />

        <PasswordInput
          label="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange('confirmPassword')}
          placeholder="Confirm password"
          error={errors.confirmPassword}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
      >
        Sign Up
      </button>
    </form>
  );
}

export default SignUpForm;