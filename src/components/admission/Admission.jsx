import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, CheckCircle, Upload, FileText } from 'lucide-react';
import heroBackground from '../assets/pexels-mikhail-nilov-7777128.jpg';

const Admission = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    program: '',
    olResultSheet: null,
    alResultSheet: null
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Example programs
  const programs = [
    { id: 1, name: "Computer Science", degree: "B.Sc." },
    { id: 2, name: "Business Administration", degree: "BBA" },
    { id: 3, name: "Software Engineering", degree: "B.Eng." },
    { id: 4, name: "Data Science", degree: "B.Sc." },
    { id: 5, name: "Artificial Intelligence", degree: "M.Sc." },
    { id: 6, name: "MBA", degree: "MBA" }
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.fullName.trim()) tempErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) tempErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) tempErrors.email = 'Email is invalid';
    if (!formData.program) tempErrors.program = 'Please select a program';
    if (!formData.olResultSheet) tempErrors.olResultSheet = 'O/L Result Sheet is required';
    if (!formData.alResultSheet) tempErrors.alResultSheet = 'A/L Result Sheet is required';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      
      const submitData = new FormData();
      submitData.append('fullName', formData.fullName);
      submitData.append('email', formData.email);
      submitData.append('program', formData.program);
      submitData.append('olResultSheet', formData.olResultSheet);
      submitData.append('alResultSheet', formData.alResultSheet);

      try {
        const response = await axios.post('http://localhost:5000/api/admissions/apply', submitData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (response.data.success) {
          setSubmitSuccess(true);
          setTimeout(() => {
            navigate('/');
          }, 4000);
        }
      } catch (error) {
        console.error('Application error:', error);
        setErrors({ submit: error.response?.data?.message || 'Application failed. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Application Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Your application and result sheets have been uploaded securely. Our admissions team will review your qualifications and notify you via email.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition w-full"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-green-800 pt-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBackground} alt="University Campus" className="w-full h-full object-cover opacity-30" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/70 to-green-800/70"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <button onClick={() => navigate('/')} className="text-white hover:text-green-200 transition flex items-center gap-2 mb-6">
            <ArrowLeft size={20} /> Back to Home
          </button>
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Submit Your Academic Results</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Fast-track your admission by uploading your O/L and A/L result sheets.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-12 md:h-24 object-cover" preserveAspectRatio="none">
            <path fill="#f9fafb" fillOpacity="1" d="M0,60L1440,0L1440,120L0,120Z"></path>
          </svg>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-16 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FileText className="text-green-600" />
            Application Form
          </h2>
          
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input 
                  type="text" 
                  name="fullName" 
                  value={formData.fullName} 
                  onChange={handleChange} 
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`} 
                  placeholder="Enter your full name"
                />
                {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition ${errors.email ? 'border-red-500' : 'border-gray-300'}`} 
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>
            </div>

            {/* Program Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Program of Interest *</label>
              <select 
                name="program" 
                value={formData.program} 
                onChange={handleChange} 
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition ${errors.program ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select a program</option>
                {programs.map(p => <option key={p.id} value={p.name}>{p.name} - {p.degree}</option>)}
              </select>
              {errors.program && <p className="mt-1 text-sm text-red-500">{errors.program}</p>}
            </div>

            <div className="border-t border-gray-100 pt-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Academic Qualifications</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* O/L Upload */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 border-dashed">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ordinary Level (O/L) Result Sheet *</label>
                  <div className="flex items-center space-x-2">
                    <div className="shrink-0">
                      <Upload className="text-green-600" size={24} />
                    </div>
                    <input 
                      type="file" 
                      name="olResultSheet" 
                      onChange={handleChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    />
                  </div>
                  {errors.olResultSheet && <p className="mt-2 text-sm text-red-500">{errors.olResultSheet}</p>}
                </div>

                {/* A/L Upload */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 border-dashed">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Advanced Level (A/L) Result Sheet *</label>
                  <div className="flex items-center space-x-2">
                    <div className="shrink-0">
                      <Upload className="text-green-600" size={24} />
                    </div>
                    <input 
                      type="file" 
                      name="alResultSheet" 
                      onChange={handleChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    />
                  </div>
                  {errors.alResultSheet && <p className="mt-2 text-sm text-red-500">{errors.alResultSheet}</p>}
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full bg-green-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-green-700 transition shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Uploading & Submitting...' : 'Submit Qualifications'}
                {!isSubmitting && <CheckCircle size={20} />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admission;