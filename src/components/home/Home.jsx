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
    { label: 'Attendance', path: '/attendance' },
    { label: 'Analysis', path: '/analytics' },
    { label: 'FAQ & Support', path: '/feedback' },
    { label: 'Scan QR', path: '/scan' },
    { label: 'Portal', path: '/dashboard' },
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
                className={`text-sm font-bold transition-all hover:text-green-300 ${
                  scrolled ? 'text-gray-700 hover:text-green-600' : 'text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="h-6 w-[1px] bg-white/20 mx-2"></div>
            
            <button 
              onClick={() => navigate('/admin-console')}
              className={`flex items-center gap-2 text-sm font-black uppercase tracking-wider ${
                scrolled ? 'text-green-700' : 'text-white hover:text-green-300'
              }`}
            >
              <LayoutDashboard size={18} />
              ADMIN
            </button>
          </div>

          <button className={`${scrolled ? 'text-gray-900' : 'text-white'} lg:hidden`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Hero Section - Professional & Academic */}
      <section className="relative pt-24 pb-48 md:pt-32 md:pb-80 bg-gradient-to-r from-green-600 to-green-800 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08759df9a73?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover"
            alt="Campus"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-green-800/90 to-green-900/70"></div>


        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-start gap-12">
            <div className="flex-1 text-center md:text-left space-y-5">
              <div className="inline-block px-4 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-widest border border-white/20">
                Official University Portal
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                Empowering the <span className="text-green-300">Next Generation</span> of Leaders
              </h1>
              <p className="text-xl text-green-50/80 max-w-2xl leading-relaxed">
                Welcome to our unified academic ecosystem. Access your essential student services, track your progress, and manage your campus life with ease.
              </p>
              <button className="bg-white text-green-700 px-8 py-3 rounded-full flex items-center gap-3 font-bold hover:bg-green-50 transition-all shadow-xl group active:scale-95 w-fit">
                Apply Now <ChevronRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </button>
            </div>
            
            <div className="flex-1"></div>
            
            <div className="flex-1 relative h-[600px]">
              <div className="absolute top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:left-auto md:right-[-25%] w-[160%] md:w-[230%] z-20">
                <img 
                  src={studyingGirl} 
                  className="rounded-[5.5rem] shadow-[0_80px_160px_-40px_rgba(0,0,0,0.8)] w-full border-none"
                  alt="Student Life"
                />
              </div>
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-400/40 rounded-full blur-[200px]"></div>
            </div>
          </div>
        </div>
        
        {/* Wavy bottom divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#f9fafb" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
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