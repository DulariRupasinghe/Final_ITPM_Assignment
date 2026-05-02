import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Menu, 
  X, 
  BarChart3, 
  MessageCircle, 
  QrCode, 
  LayoutDashboard, 
  ArrowRight,
  ClipboardList,
  CheckCircle,
  TrendingUp,
  AlertCircle,
  User,
  Users,
  BookOpen,
  Mail,
  Calendar,
  CreditCard,
  UserPlus,
  ChevronRight,
  Search
} from 'lucide-react';
import studyingGirl from '../assets/studentlife/pexels-olly-3776190.jpg';


const Home = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Programs', path: '#' },
    { label: 'Admissions', path: '#' },
    { label: 'Student Life', path: '#' },
    { label: 'Contact', path: '#' },
    { label: 'IR Dashboard', path: '/attendance' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation - Original Green/White Theme */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-xl py-3' : 'bg-green-700 py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
             <GraduationCap className={`${scrolled ? 'text-green-600' : 'text-white'}`} size={32} />
             <span className={`text-xl font-bold tracking-tight ${scrolled ? 'text-green-700' : 'text-white'}`}>
               University Management
             </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`text-sm font-semibold transition-all hover:text-green-300 ${
                  scrolled ? 'text-gray-700 hover:text-green-600' : 'text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <button 
              onClick={() => navigate('/login')}
              className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${
                scrolled 
                  ? 'bg-green-700 text-white hover:bg-green-800 shadow-md' 
                  : 'bg-white text-green-700 hover:bg-green-50'
              }`}
            >
              Login
            </button>
          </div>

          <button className={`${scrolled ? 'text-gray-900' : 'text-white'} lg:hidden`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Hero Section - Redesigned to match request */}
      <section className="relative pt-32 pb-48 md:pt-48 md:pb-96 bg-gradient-to-r from-green-700 to-green-900 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08759df9a73?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover"
            alt="Campus"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-green-800/80 to-green-900/60"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-left space-y-8 animate-in fade-in slide-in-from-left duration-700">
              <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight tracking-tighter">
                Shape Your Future at <br/>
                <span className="text-green-400">University of Excellence</span>
              </h1>
              <p className="text-xl text-white/90 max-w-xl leading-relaxed font-medium">
                Join a community of innovators, thinkers, and leaders. Experience world-class education with state-of-the-art facilities.
              </p>
              <button className="bg-white text-green-700 px-8 py-4 rounded-full flex items-center gap-3 font-bold hover:bg-green-50 transition-all shadow-2xl group active:scale-95">
                Apply Now <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </div>
            
            <div className="flex-1 relative">
              <div className="relative z-20 animate-in zoom-in duration-1000">
                <img 
                  src={studyingGirl} 
                  className="rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] w-full object-cover h-[500px] border-[12px] border-white/10 backdrop-blur-xl"
                  alt="Student"
                />
              </div>
              {/* Background Glow */}
              <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-green-400/20 rounded-full blur-[120px]"></div>
            </div>
          </div>
        </div>
        
        {/* Wavy bottom divider */}
        <div className="absolute bottom-0 left-0 right-0 leading-[0]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,160L60,176C120,192,240,224,360,213.3C480,203,600,149,720,133.3C840,117,960,139,1080,160C1200,181,1320,203,1380,213.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
        </div>
      </section>


      {/* Feature Grid */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-gray-900">Academic Core Functions</h2>
            <p className="text-gray-600">Streamlining your university experience with modern digital solutions.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: CheckCircle, title: 'Eligibility Check', desc: 'Real-time monitoring of your 80% attendance requirement for final exams.' },
              { icon: TrendingUp, title: 'Performance Trends', desc: 'Visual analytics to help you track your progress across different modules.' },
              { icon: Search, title: 'Instant Support', desc: 'A comprehensive FAQ hub and lecturer feedback system at your fingertips.' }
            ].map((f, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                <div className="bg-green-100 text-green-700 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <f.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Footer */}
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-2">
             <GraduationCap className="text-green-600" size={24} />
             <span className="text-lg font-bold text-green-800">University Management System</span>
           </div>
           <div className="flex gap-6 text-sm font-medium text-gray-500">
             <a href="#" className="hover:text-green-600">Privacy Policy</a>
             <a href="#" className="hover:text-green-600">Terms of Service</a>
             <a href="#" className="hover:text-green-600">Help Center</a>
           </div>
           <p className="text-gray-400 text-xs uppercase tracking-widest">&copy; 2024 Academic Solutions</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;