import React, { useState } from 'react';
import { 
  BookOpen, 
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Award,
  Calendar,
  School
} from 'lucide-react';

const AcademicPage = ({ formData, updateFormData, onNext, onPrevious }) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const programs = [
    "Computer Science (B.Sc.)",
    "Software Engineering (B.Eng.)",
    "Data Science (B.Sc.)",
    "Business Administration (BBA)",
    "Information Technology (B.Sc.)",
    "Cyber Security (B.Sc.)",
    "Artificial Intelligence (M.Sc.)",
    "MBA - Technology Management"
  ];

  const intakes = [
    "Spring 2026 (January 2026)",
    "Summer 2026 (May 2026)",
    "Fall 2026 (September 2026)"
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
    
    if (!formData.program) tempErrors.program = 'Please select a program';
    if (!formData.intake) tempErrors.intake = 'Please select intake';
    if (!formData.previousEducation) tempErrors.previousEducation = 'Previous education is required';
    if (!formData.institution?.trim()) tempErrors.institution = 'Institution name is required';
    if (!formData.graduationYear) tempErrors.graduationYear = 'Graduation year is required';
    
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
          <BookOpen className="text-green-600" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Academic Information</h2>
        <p className="text-gray-600">Tell us about your educational background</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Program of Study *</label>
          <select
            name="program"
            value={formData.program || ''}
            onChange={handleChange}
            onBlur={() => handleBlur('program')}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition
              ${errors.program && touched.program ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select program</option>
            {programs.map(program => (
              <option key={program} value={program}>{program}</option>
            ))}
          </select>
          {errors.program && touched.program && (
            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle size={14} /> {errors.program}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Intake *</label>
          <select
            name="intake"
            value={formData.intake || ''}
            onChange={handleChange}
            onBlur={() => handleBlur('intake')}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition
              ${errors.intake && touched.intake ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select intake</option>
            {intakes.map(intake => (
              <option key={intake} value={intake}>{intake}</option>
            ))}
          </select>
          {errors.intake && touched.intake && (
            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle size={14} /> {errors.intake}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Previous Education *</label>
          <select
            name="previousEducation"
            value={formData.previousEducation || ''}
            onChange={handleChange}
            onBlur={() => handleBlur('previousEducation')}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition
              ${errors.previousEducation && touched.previousEducation ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select education level</option>
            <option value="high_school">High School</option>
            <option value="bachelor">Bachelor's Degree</option>
            <option value="master">Master's Degree</option>
            <option value="other">Other</option>
          </select>
          {errors.previousEducation && touched.previousEducation && (
            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle size={14} /> {errors.previousEducation}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Institution Name *</label>
          <input
            type="text"
            name="institution"
            value={formData.institution || ''}
            onChange={handleChange}
            onBlur={() => handleBlur('institution')}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition
              ${errors.institution && touched.institution ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Previous institution"
          />
          {errors.institution && touched.institution && (
            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle size={14} /> {errors.institution}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year *</label>
          <input
            type="number"
            name="graduationYear"
            value={formData.graduationYear || ''}
            onChange={handleChange}
            onBlur={() => handleBlur('graduationYear')}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition
              ${errors.graduationYear && touched.graduationYear ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="YYYY"
            min="1990"
            max="2026"
          />
          {errors.graduationYear && touched.graduationYear && (
            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle size={14} /> {errors.graduationYear}
            </p>
          )}
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

export default AcademicPage;