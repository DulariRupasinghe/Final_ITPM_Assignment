import React, { useState } from 'react';
import { 
  Home, 
  Building, 
  MapPin, 
  Globe, 
  AlertCircle,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

const AddressPage = ({ formData, updateFormData, onNext, onPrevious }) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const countries = [
    "United States", "Canada", "United Kingdom", "Australia", 
    "India", "Pakistan", "Bangladesh", "Sri Lanka", 
    "Malaysia", "Singapore", "Germany", "France"
  ];

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
    
    if (!formData.address?.trim()) tempErrors.address = 'Street address is required';
    if (!formData.city?.trim()) tempErrors.city = 'City is required';
    if (!formData.state?.trim()) tempErrors.state = 'State/Province is required';
    if (!formData.zipCode?.trim()) tempErrors.zipCode = 'Zip/Postal code is required';
    if (!formData.country) tempErrors.country = 'Country is required';
    
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
          <Home className="text-green-600" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Address Information</h2>
        <p className="text-gray-600">Please provide your current residential address</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
          <input
            type="text"
            name="address"
            value={formData.address || ''}
            onChange={handleChange}
            onBlur={() => handleBlur('address')}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition
              ${errors.address && touched.address ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="123 Main Street, Apt 4B"
          />
          {errors.address && touched.address && (
            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle size={14} /> {errors.address}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
            <input
              type="text"
              name="city"
              value={formData.city || ''}
              onChange={handleChange}
              onBlur={() => handleBlur('city')}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition
                ${errors.city && touched.city ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="New York"
            />
            {errors.city && touched.city && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle size={14} /> {errors.city}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">State/Province *</label>
            <input
              type="text"
              name="state"
              value={formData.state || ''}
              onChange={handleChange}
              onBlur={() => handleBlur('state')}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition
                ${errors.state && touched.state ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="New York"
            />
            {errors.state && touched.state && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle size={14} /> {errors.state}
              </p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Zip/Postal Code *</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode || ''}
              onChange={handleChange}
              onBlur={() => handleBlur('zipCode')}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition
                ${errors.zipCode && touched.zipCode ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="10001"
            />
            {errors.zipCode && touched.zipCode && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle size={14} /> {errors.zipCode}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
            <select
              name="country"
              value={formData.country || ''}
              onChange={handleChange}
              onBlur={() => handleBlur('country')}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition
                ${errors.country && touched.country ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select your country</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            {errors.country && touched.country && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle size={14} /> {errors.country}
              </p>
            )}
          </div>
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

export default AddressPage;