import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  User, 
  Lock,
  Phone,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Loader,
  Heart,
  CheckCircle
} from 'lucide-react';

const AccountPage = ({ formData, updateFormData, onSubmit, onPrevious, isSubmitting }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
    setTouched(prev => ({ ...prev, [name]: true }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const validateForm = () => {
    let tempErrors = {};
    
    if (!formData.username?.trim()) {
      tempErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      tempErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.password) {
      tempErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      tempErrors.confirmPassword = 'Please confirm password';
    } else if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.emergencyContact?.trim()) {
      tempErrors.emergencyContact = 'Emergency contact name is required';
    }
    
    if (!formData.emergencyPhone?.trim()) {
      tempErrors.emergencyPhone = 'Emergency phone is required';
    }
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowSuccessPopup(true);
      const result = await onSubmit();
      if (result && result.success) {
        setRegistrationComplete(true);
      }
    }
  };

  const handleNext = () => {
    navigate('/programs');
  };

  // Success Popup Component
  if (showSuccessPopup) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center transform animate-scaleIn">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600" size={48} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Registration Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your account has been created successfully. You can now explore our programs and start your journey with us.
          </p>
          <div className="space-y-3">
            <button
              onClick={handleNext}
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
            >
              Next <ChevronRight size={18} />
            </button>
            <p className="text-xs text-gray-500">
              You will be redirected to explore our academic programs
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <GraduationCap className="text-green-600" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Account Setup</h2>
        <p className="text-gray-600">Create your account credentials</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Username *</label>
          <input
            type="text"
            name="username"
            value={formData.username || ''}
            onChange={handleChange}
            onBlur={() => handleBlur('username')}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition
              ${errors.username && touched.username ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Choose a username"
          />
          {errors.username && touched.username && (
            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle size={14} /> {errors.username}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password || ''}
              onChange={handleChange}
              onBlur={() => handleBlur('password')}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition
                ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Create a password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && touched.password && (
            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle size={14} /> {errors.password}
            </p>
          )}
          <p className="mt-1 text-xs text-gray-500">Password must be at least 6 characters</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword || ''}
              onChange={handleChange}
              onBlur={() => handleBlur('confirmPassword')}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition
                ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle size={14} /> {errors.confirmPassword}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Name *</label>
          <input
            type="text"
            name="emergencyContact"
            value={formData.emergencyContact || ''}
            onChange={handleChange}
            onBlur={() => handleBlur('emergencyContact')}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition
              ${errors.emergencyContact && touched.emergencyContact ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Emergency contact person"
          />
          {errors.emergencyContact && touched.emergencyContact && (
            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle size={14} /> {errors.emergencyContact}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Phone *</label>
          <input
            type="tel"
            name="emergencyPhone"
            value={formData.emergencyPhone || ''}
            onChange={handleChange}
            onBlur={() => handleBlur('emergencyPhone')}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition
              ${errors.emergencyPhone && touched.emergencyPhone ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Emergency contact number"
          />
          {errors.emergencyPhone && touched.emergencyPhone && (
            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle size={14} /> {errors.emergencyPhone}
            </p>
          )}
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">How did you hear about us?</label>
          <select
            name="howDidYouHear"
            value={formData.howDidYouHear || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          >
            <option value="">Select an option</option>
            <option value="social_media">Social Media</option>
            <option value="friend">Friend/Family</option>
            <option value="advertisement">Advertisement</option>
            <option value="school">School/College</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between pt-6 mt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onPrevious}
          className="px-6 py-2 rounded-lg font-semibold transition bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center gap-2"
        >
          <ChevronLeft size={18} /> Previous
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader size={18} className="animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Complete Registration <ChevronRight size={18} />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default AccountPage;