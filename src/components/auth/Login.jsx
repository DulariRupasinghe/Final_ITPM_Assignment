import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  GraduationCap,
  User,
  Lock,
  AlertCircle,
  Eye,
  EyeOff,
  LogIn,
  Shield,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ itNumber: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username: formData.itNumber,
        password: formData.password
      });

      if (res.data.success) {
        localStorage.setItem('user', JSON.stringify(res.data));
        setShowPopup(true);
        setTimeout(() => {
          if (res.data.role === 'admin') navigate('/admin-console');
          else navigate('/dashboard', { state: { studentId: res.data._id } });
        }, 1200);
      }
    } catch (err) {
      setErrors({ login: err.response?.data?.message || 'Authentication Failed' });
      setTimeout(() => setErrors({}), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Success Notification */}
      {showPopup && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] animate-fadeIn">
          <div className="bg-green-500/90 backdrop-blur-xl text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/20">
            <ShieldCheck size={24} className="animate-bounce" />
            <span className="font-bold tracking-tight">Identity Verified! Entering Portal...</span>
          </div>
        </div>
      )}

      <div className="max-w-5xl w-full grid lg:grid-cols-2 bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden relative z-10">
        {/* Left Side: Branding */}
        <div className="hidden lg:flex flex-col justify-between p-16 bg-gradient-to-br from-green-600/20 to-emerald-800/40 border-r border-white/10">
          <div className="flex items-center gap-3">
            <div className="bg-green-500 p-3 rounded-2xl shadow-xl">
              <GraduationCap className="text-white" size={32} />
            </div>
            <span className="text-2xl font-black text-white tracking-tighter uppercase">STUDENT<span className="text-green-400">HUB</span></span>
          </div>
          
          <div>
            <h2 className="text-5xl font-black text-white leading-tight mb-6">Elevating Your <br/>Academic <br/><span className="text-green-400">Experience.</span></h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-sm">Access your personalized dashboard, track attendance, and manage your academic growth with our state-of-the-art portal.</p>
          </div>

          <div className="flex items-center gap-4 text-gray-500 text-sm font-bold tracking-widest uppercase">
            <Shield size={20} className="text-green-500" />
            SECURED BY UNIMANAGE PROTOCOLS
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-12 lg:p-20 flex flex-col justify-center">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl font-black text-white mb-2">Login</h1>
            <p className="text-gray-400 font-medium">Enter your credentials to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.login && (
              <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 text-rose-400 text-sm flex items-center gap-3 animate-headShake">
                <AlertCircle size={20} />
                <span className="font-bold">{errors.login}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Identity ID</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-green-500 transition-colors" size={20} />
                <input
                  type="text"
                  name="itNumber"
                  value={formData.itNumber}
                  onChange={handleChange}
                  placeholder="e.g. IT2024001"
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-gray-600 outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Secure Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-green-500 transition-colors" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-gray-600 outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 rounded-lg border-white/10 bg-white/5 checked:bg-green-600 transition-all" />
                <span className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">Keep me signed in</span>
              </label>
              <button type="button" className="text-sm text-green-500 font-bold hover:text-green-400 transition-colors">Recover</button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-green-600 hover:bg-green-500 text-white rounded-2xl font-black text-lg shadow-2xl shadow-green-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 group"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  SIGN IN <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-gray-500 font-medium">
              Don't have an account?{' '}
              <button onClick={() => navigate('/register')} className="text-white font-black hover:text-green-400 transition-colors">Join Now</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;