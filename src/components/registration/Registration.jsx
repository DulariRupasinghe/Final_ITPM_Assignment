import React, { useState } from 'react';
import axios from 'axios';
import { 
  GraduationCap, 
  User, 
  Home,
  CheckCircle,
  AlertCircle,
  Shield,
  ArrowRight,
  ArrowLeft,
  Briefcase,
  Lock
} from 'lucide-react';
import PersonalInfoPage from './PersonalInfoPage';
import AddressPage from './AddressPage';
import AcademicPage from './AcademicPage';
import AccountPage from './AccountPage';

const Registration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', dateOfBirth: '', gender: '', nationality: '', profileImage: '',
    address: '', city: '', state: '', zipCode: '', country: '',
    program: '', intake: '', previousEducation: '', institution: '', graduationYear: '',
    username: '', password: '', confirmPassword: '', emergencyContact: '', emergencyPhone: '', howDidYouHear: ''
  });

  const updateFormData = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
  const nextStep = () => { setCurrentStep(prev => prev + 1); window.scrollTo(0, 0); };
  const prevStep = () => { setCurrentStep(prev => prev - 1); window.scrollTo(0, 0); };

  const validateForm = () => {
    if (!formData.fullName || formData.fullName.length < 3) return "Full Name is too short";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return "Invalid email address";
    if (formData.password !== formData.confirmPassword) return "Passwords do not match";
    return null;
  };

  const handleSubmit = async () => {
    const error = validateForm();
    if (error) { setSubmitError(error); return { success: false, error }; }
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      if (response.data.success) return { success: true, data: response.data };
    } catch (error) {
      setSubmitError(error.response?.data?.message || 'Registration failed.');
      return { success: false, error: error.response?.data?.message };
    } finally { setIsSubmitting(false); }
  };

  const steps = [
    { number: 1, title: "Personal", icon: User },
    { number: 2, title: "Location", icon: Home },
    { number: 3, title: "Academic", icon: GraduationCap },
    { number: 4, title: "Security", icon: Lock }
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-20 px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-600/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-green-600 p-3 rounded-2xl shadow-xl">
              <GraduationCap size={32} />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase">STUDENT<span className="text-green-500">REGISTRY</span></span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Start Your Excellence Journey</h1>
          <p className="text-gray-400 font-medium max-w-lg mx-auto">Complete the multi-step registration to join the University Management System portal.</p>
        </div>

        {/* Stepper */}
        <div className="mb-12 flex justify-between relative px-4">
          <div className="absolute top-6 left-0 w-full h-[2px] bg-white/5 z-0"></div>
          {steps.map((step) => {
            const Icon = step.icon;
            const active = currentStep === step.number;
            const done = currentStep > step.number;
            return (
              <div key={step.number} className="relative z-10 flex flex-col items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 ${
                  active ? 'bg-green-600 border-green-400 shadow-xl shadow-green-600/20 scale-110' : 
                  done ? 'bg-white text-green-600 border-white' : 'bg-[#1e293b] border-white/10 text-gray-500'
                }`}>
                  {done ? <CheckCircle size={24} /> : <Icon size={24} />}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${active ? 'text-green-500' : 'text-gray-500'}`}>{step.title}</span>
              </div>
            );
          })}
        </div>

        {submitError && (
          <div className="mb-8 bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 text-rose-400 flex items-center gap-3 animate-headShake">
            <AlertCircle size={20} />
            <p className="text-sm font-bold">{submitError}</p>
          </div>
        )}

        <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden p-8 md:p-12">
          {currentStep === 1 && <PersonalInfoPage formData={formData} updateFormData={updateFormData} onNext={nextStep} />}
          {currentStep === 2 && <AddressPage formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrevious={prevStep} />}
          {currentStep === 3 && <AcademicPage formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrevious={prevStep} />}
          {currentStep === 4 && <AccountPage formData={formData} updateFormData={updateFormData} onSubmit={handleSubmit} onPrevious={prevStep} isSubmitting={isSubmitting} />}
        </div>

        <div className="mt-12 flex justify-center items-center gap-4 text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">
          <Shield size={16} className="text-green-500" />
          Secured University Registration Protocol
        </div>
      </div>

      <style>{`
        input, select, textarea {
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: white !important;
          border-radius: 1rem !important;
          padding: 1rem !important;
          outline: none !important;
          transition: all 0.3s !important;
        }
        input:focus, select:focus, textarea:focus {
          border-color: #16a34a !important;
          box-shadow: 0 0 0 4px rgba(22, 163, 74, 0.1) !important;
        }
        label {
          color: #94a3b8 !important;
          font-size: 0.75rem !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.1em !important;
          margin-bottom: 0.5rem !important;
          display: block !important;
        }
        button.bg-green-600 {
          font-weight: 900 !important;
          letter-spacing: 0.05em !important;
          border-radius: 1rem !important;
          padding: 1rem 2rem !important;
        }
      `}</style>
    </div>
  );
};

export default Registration;