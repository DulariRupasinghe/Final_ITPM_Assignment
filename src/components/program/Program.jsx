import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  GraduationCap, 
  BookOpen, 
  Clock, 
  DollarSign,
  Award,
  Users,
  Globe,
  Laptop,
  Heart,
  Star,
  Calendar,
  ChevronRight,
  CheckCircle,
  Sparkles,
  TrendingUp,
  Briefcase,
  Code,
  Database,
  Shield,
  Brain,
  Microscope,
  PenTool,
  Zap,
  Target,
  Rocket,
  Loader,
  AlertCircle
} from 'lucide-react';

// Import the image
import heroBackground from '../assets/pexels-mart-production-7251091.jpg';

const Program = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredProgram, setHoveredProgram] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Program Categories
  const categories = [
    { id: 'all', name: 'All Programs', icon: GraduationCap },
    { id: 'engineering', name: 'Engineering', icon: Code },
    { id: 'business', name: 'Business', icon: TrendingUp },
    { id: 'science', name: 'Science', icon: Microscope },
    { id: 'arts', name: 'Arts & Humanities', icon: PenTool },
    { id: 'technology', name: 'Technology', icon: Laptop },
    { id: 'healthcare', name: 'Healthcare', icon: Heart }
  ];

  // Fetch courses from API
  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/courses');
      if (response.data.success) {
        setCourses(response.data.courses);
      } else {
        setError('Failed to load courses');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError('Unable to connect to server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Filter programs based on category
  const filteredPrograms = selectedCategory === 'all' 
    ? courses 
    : courses.filter(program => program.category === selectedCategory);

  // Get color classes based on program color
  const getColorClasses = (color) => {
    const colors = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', hover: 'hover:border-blue-400' },
      green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200', hover: 'hover:border-green-400' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', hover: 'hover:border-purple-400' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', hover: 'hover:border-orange-400' },
      pink: { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-200', hover: 'hover:border-pink-400' },
      red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', hover: 'hover:border-red-400' }
    };
    return colors[color] || colors.blue;
  };

  // Navigation handlers
  const handleViewDetails = (program) => {
    navigate('/details', { state: { course: program } });
  };

  const handleApplyNow = (program) => {
    navigate('/details', { state: { course: program } });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader size={48} className="animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading amazing programs...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={40} className="text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={fetchCourses}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with Background Image */}
      <div className="relative bg-gradient-to-r from-green-600 to-green-800 pt-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src={heroBackground} 
            alt="University Campus" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        {/* Green Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-green-800/20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-60 relative z-10">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5">
              World-Class Academic Programs
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Discover our diverse range of programs designed to prepare you for a successful future
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => navigate('/register')}
                className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition shadow-lg"
              >
                Apply Now
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#f9fafb" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <GraduationCap className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-800">50+</div>
              <div className="text-gray-600">Academic Programs</div>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-800">15,000+</div>
              <div className="text-gray-600">Active Students</div>
            </div>
            <div className="text-center">
              <Award className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-800">95%</div>
              <div className="text-gray-600">Employment Rate</div>
            </div>
            <div className="text-center">
              <Globe className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-800">100+</div>
              <div className="text-gray-600">Global Partners</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="bg-white py-8 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-5 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                    isActive 
                      ? 'bg-green-600 text-white shadow-lg scale-105' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon size={18} />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPrograms.length === 0 ? (
            <div className="text-center py-16">
              <GraduationCap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600">No programs found</h3>
              <p className="text-gray-500">Try selecting a different category or check back later for new programs.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPrograms.map((program) => {
                const colors = getColorClasses(program.color);
                const isHovered = hoveredProgram === program.id;
                
                return (
                  <div
                    key={program._id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2"
                    onMouseEnter={() => setHoveredProgram(program.id)}
                    onMouseLeave={() => setHoveredProgram(null)}
                  >
                    {/* Program Header */}
                    <div className={`${colors.bg} p-6 border-b border-gray-100`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-5xl">{program.image || '📚'}</div>
                        <div className="text-right">
                          <span className={`inline-block px-3 py-1 ${colors.text} bg-white rounded-full text-xs font-semibold`}>
                            {program.ranking || 'Top Program'}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{program.name}</h3>
                      <p className="text-sm text-gray-500">{program.code}</p>
                      <p className="text-sm text-green-600 font-semibold mt-2">{program.degree}</p>
                    </div>

                    {/* Program Details */}
                    <div className="p-6">
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{program.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
                        <div className="flex items-center gap-1">
                          <Clock size={16} />
                          <span>{program.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign size={16} />
                          <span>${program.fee}/year</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={16} />
                          <span>{program.seats} seats</span>
                        </div>
                      </div>

                      {/* Special Features */}
                      <div className={`space-y-3 transition-all duration-300 ${isHovered ? 'block' : 'hidden md:block'}`}>
                        <h4 className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                          <Sparkles size={14} className="text-green-600" />
                          Special Features
                        </h4>
                        <ul className="space-y-2">
                          {program.specialFeatures?.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                              <CheckCircle size={12} className="text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                          {program.specialFeatures?.length > 3 && (
                            <li className="text-xs text-green-600">+{program.specialFeatures.length - 3} more features</li>
                          )}
                        </ul>
                      </div>

                      {/* Career Stats */}
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="grid grid-cols-2 gap-3 text-center">
                          <div>
                            <p className="text-xs text-gray-500">Placement Rate</p>
                            <p className="font-bold text-green-600">{program.jobPlacement || '95%'}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Avg. Salary</p>
                            <p className="font-bold text-green-600">{program.averageSalary || '$85,000'}</p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-4 flex gap-2">
                        <button 
                          onClick={() => handleApplyNow(program)}
                          className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition text-sm"
                        >
                          Apply Now
                        </button>
                        <button 
                          onClick={() => handleViewDetails(program)}
                          className="px-4 py-2 border border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition text-sm"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Special Features Section */}
      <div className="bg-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose Our <span className="text-green-600">Programs?</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience world-class education with unique features that set us apart
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Rocket className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Industry Integrated</h3>
              <p className="text-sm text-gray-600">Curriculum designed with industry experts</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Target className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">100% Placement Support</h3>
              <p className="text-sm text-gray-600">Dedicated career services team</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Globe className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Global Opportunities</h3>
              <p className="text-sm text-gray-600">International exchange programs</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Zap className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Cutting-edge Labs</h3>
              <p className="text-sm text-gray-600">State-of-the-art facilities</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-green-700 to-green-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Join our diverse community of learners and take the first step toward your dream career
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => navigate('/register')}
              className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition shadow-lg"
            >
              Apply Now
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition">
              Request Information
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Program;