import React, { useState } from 'react';
import { 
  User, 
  AlertCircle,
  ChevronRight,
  Upload,
  Mail,
  Phone,
  Calendar,
  Globe
} from 'lucide-react';

const PersonalInfoPage = ({ formData, updateFormData, onNext }) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [profileImagePreview, setProfileImagePreview] = useState('');

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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
        updateFormData('profileImage', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    
    if (!formData.fullName?.trim()) {
      tempErrors.fullName = 'Full name is required';
    } else if (formData.fullName.length < 3) {
      tempErrors.fullName = 'Name must be at least 3 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
      tempErrors.fullName = 'Name must contain only letters and spaces';
    }
    
    if (!formData.email?.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone?.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      tempErrors.phone = 'Phone number must be exactly 10 digits';
    }
    
    if (!formData.dateOfBirth) {
      tempErrors.dateOfBirth = 'Date of birth is required';
    }
    
    if (!formData.gender) {
      tempErrors.gender = 'Please select gender';
    }
    
    if (!formData.nationality?.trim()) {
      tempErrors.nationality = 'Nationality is required';
    } else if (!/^[a-zA-Z0-9]{1,15}$/.test(formData.nationality)) {
      tempErrors.nationality = 'Nationality must be alphanumeric and max 15 characters';
    }
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="text-green-600" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Personal Information</h2>
        <p className="text-gray-600">Tell us about yourself</p>
      </div>

      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden border-4 border-green-500">
            {profileImagePreview ? (
              <img src={profileImagePreview} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200">
                <User size={48} className="text-green-600" />
              </div>
            )}
          </div>
          <label className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full cursor-pointer hover:bg-green-700 transition">
            <Upload size={16} />
            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
          </label>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName || ''}
            onChange={handleChange}
            onBlur={() => handleBlur('fullName')}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition
              ${errors.fullName && touched.fullName ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter your full name"
          />
          {errors.fullName && touched.fullName && (
            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle size={14} /> {errors.fullName}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            onBlur={() => handleBlur('email')}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition
              ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="student@example.com"
          />
          {errors.email && touched.email && (
            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle size={14} /> {errors.email}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
            onBlur={() => handleBlur('phone')}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition
              ${errors.phone && touched.phone ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="+1 234 567 8900"
          />
          {errors.phone && touched.phone && (
            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle size={14} /> {errors.phone}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth || ''}
            onChange={handleChange}
            onBlur={() => handleBlur('dateOfBirth')}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition
              ${errors.dateOfBirth && touched.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.dateOfBirth && touched.dateOfBirth && (
            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle size={14} /> {errors.dateOfBirth}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
          <select
            name="gender"
            value={formData.gender || ''}
            onChange={handleChange}
            onBlur={() => handleBlur('gender')}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition
              ${errors.gender && touched.gender ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && touched.gender && (
            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle size={14} /> {errors.gender}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nationality *</label>
          <input
            type="text"
            name="nationality"
            value={formData.nationality || ''}
            onChange={handleChange}
            onBlur={() => handleBlur('nationality')}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition
              ${errors.nationality && touched.nationality ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Your nationality"
          />
          {errors.nationality && touched.nationality && (
            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle size={14} /> {errors.nationality}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-6 mt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={handleNext}
          className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition flex items-center gap-2"
        >
          Next <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default PersonalInfoPage;