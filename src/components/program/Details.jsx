import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  GraduationCap,
  BookOpen,
  Clock,
  DollarSign,
  Award,
  Users,
  Calendar,
  MapPin,
  ChevronRight,
  CheckCircle,
  Sparkles,
  TrendingUp,
  Briefcase,
  Target,
  Star,
  Heart,
  Download,
  Share2,
  ArrowLeft,
  CreditCard,
  Globe,
  Shield,
  Zap,
  Rocket,
  Trophy,
  Brain,
  Code,
  Database,
  Cloud,
  Shield as ShieldIcon,
  BarChart,
  LineChart,
  PieChart,
  ExternalLink,
  Play,
  Video,
  FileText,
  MessageCircle,
  ThumbsUp,
  Eye,
  Bookmark,
  Flag
} from 'lucide-react';

// Import hero background image
import heroBackground from '../assets/studentlife/pexels-roman-odintsov-6898853.jpg';

const Details = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [activeInfoTab, setActiveInfoTab] = useState('overview');
  const [requirements, setRequirements] = useState([]);
  const [loadingReqs, setLoadingReqs] = useState(true);

  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/requirements');
        if (res.data.success) {
          // If we want only undergraduate/relevant we could filter, but let's grab active ones 
          // or filter by category if needed. For now just get all active requirements fetched via GET.
          setRequirements(res.data.requirements);
        }
      } catch(err) {
        console.error('Failed to load requirements');
      } finally {
        setLoadingReqs(false);
      }
    };
    fetchRequirements();
  }, []);

  // Get course data from location state or use default
  const course = location.state?.course || {
    id: 1,
    name: "Artificial Intelligence & Machine Learning",
    code: "AIML-101",
    category: "technology",
    degree: "B.Sc. in AI & ML",
    duration: "4 Years",
    credits: 128,
    fee: 8500,
    seats: 60,
    ranking: "#1 in Innovation",
    description: "Cutting-edge program focusing on AI algorithms, neural networks, and deep learning. Students work on real-world AI projects with industry partners.",
    specialFeatures: [
      "Industry-sponsored capstone projects",
      "AI Research Lab access",
      "Internship with tech giants (Google, Microsoft, Amazon)",
      "Specialization in Computer Vision, NLP, or Robotics",
      "AI Ethics and Responsible AI certification"
    ],
    careerPaths: [
      "AI/Machine Learning Engineer",
      "Data Scientist",
      "AI Research Scientist",
      "Computer Vision Engineer",
      "NLP Specialist"
    ],
    requirements: "High School Diploma with Mathematics, Minimum 85%",
    image: "🤖",
    color: "blue",
    jobPlacement: "98%",
    averageSalary: "$95,000",
    scholarships: "Merit-based up to $10,000"
  };

  // Semester details
  const semesters = [
    {
      id: 1,
      name: "Semester 1 - Foundation",
      courses: [
        "Mathematics for AI",
        "Introduction to Programming (Python)",
        "Data Structures & Algorithms",
        "Probability & Statistics",
        "Digital Logic Design"
      ],
      credits: 16,
      description: "Build strong foundation in mathematics and programming"
    },
    {
      id: 2,
      name: "Semester 2 - Core Concepts",
      courses: [
        "Object-Oriented Programming",
        "Database Management Systems",
        "Linear Algebra",
        "Discrete Mathematics",
        "Computer Architecture"
      ],
      credits: 17,
      description: "Deep dive into core computer science concepts"
    },
    {
      id: 3,
      name: "Semester 3 - AI Fundamentals",
      courses: [
        "Introduction to AI",
        "Machine Learning Fundamentals",
        "Neural Networks & Deep Learning",
        "Natural Language Processing",
        "Computer Vision Basics"
      ],
      credits: 18,
      description: "Learn fundamental AI and ML algorithms"
    },
    {
      id: 4,
      name: "Semester 4 - Advanced AI",
      courses: [
        "Advanced Machine Learning",
        "Reinforcement Learning",
        "Generative AI",
        "AI Ethics & Governance",
        "Big Data Analytics"
      ],
      credits: 18,
      description: "Advanced topics in AI and specialized applications"
    },
    {
      id: 5,
      name: "Semester 5 - Specialization",
      courses: [
        "Computer Vision & Image Processing",
        "Speech Recognition Systems",
        "AI in Healthcare",
        "Robotics & Automation",
        "Cloud Computing for AI"
      ],
      credits: 17,
      description: "Choose specialization and work on advanced projects"
    },
    {
      id: 6,
      name: "Semester 6 - Industry Projects",
      courses: [
        "Industry Capstone Project",
        "Research Methodology",
        "AI Product Management",
        "Entrepreneurship in AI",
        "Professional Development"
      ],
      credits: 16,
      description: "Real-world industry projects and research"
    },
    {
      id: 7,
      name: "Semester 7 - Internship",
      courses: [
        "Industrial Internship",
        "Industry Seminar Series",
        "Professional Ethics",
        "Technical Writing"
      ],
      credits: 12,
      description: "Hands-on industry experience"
    },
    {
      id: 8,
      name: "Semester 8 - Final Year Project",
      courses: [
        "Final Year Project",
        "Research Paper Writing",
        "Startup Incubation",
        "Career Preparation"
      ],
      credits: 14,
      description: "Complete major project and prepare for career"
    }
  ];

  // Calculate total credits
  const totalCredits = semesters.reduce((sum, sem) => sum + sem.credits, 0);

  // Navigation handlers
  const handleBackToPrograms = () => {
    navigate('/programs');
  };

  const handleApplyNow = () => {
    navigate('/admissions');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Modern Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroBackground}
            alt="Course Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-green-800/80"></div>
        </div>

        {/* Navigation Bar */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-6">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={handleBackToPrograms}
              className="text-white/80 hover:text-white transition flex items-center gap-2 backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full"
            >
              <ArrowLeft size={18} />
              Back to Programs
            </button>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-4">
                <span className="text-2xl">{course.image}</span>
                <span className="text-white text-sm font-medium">{course.code}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {course.name}
              </h1>
              <p className="text-green-100 text-lg mb-6 max-w-2xl">
                {course.degree} • {course.duration} Program
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleApplyNow}
                  className="bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition shadow-lg flex items-center gap-2"
                >
                  Apply Now <ChevronRight size={18} />
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-700 transition flex items-center gap-2">
                  <Download size={18} />
                  Brochure
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-700 transition flex items-center gap-2">
                  <Share2 size={18} />
                  Share
                </button>
              </div>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-2 gap-4 min-w-[280px]">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20">
                <Trophy className="text-yellow-400 mx-auto mb-2" size={24} />
                <p className="text-2xl font-bold text-white">{course.ranking}</p>
                <p className="text-xs text-green-200">University Ranking</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20">
                <Briefcase className="text-blue-400 mx-auto mb-2" size={24} />
                <p className="text-2xl font-bold text-white">{course.jobPlacement}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20">
                <DollarSign className="text-green-400 mx-auto mb-2" size={24} />
                <p className="text-2xl font-bold text-white">{course.averageSalary}</p>
                <p className="text-xs text-green-200">Avg Starting Salary</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20">
                <Users className="text-purple-400 mx-auto mb-2" size={24} />
                <p className="text-2xl font-bold text-white">{course.seats}</p>
                <p className="text-xs text-green-200">Available Seats</p>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#f9fafb" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Info Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveInfoTab('overview')}
            className={`px-6 py-3 font-medium transition flex items-center gap-2 rounded-t-lg ${activeInfoTab === 'overview'
                ? 'bg-white text-green-600 border-b-2 border-green-600'
                : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            <Eye size={18} />
            Overview
          </button>
          <button
            onClick={() => setActiveInfoTab('curriculum')}
            className={`px-6 py-3 font-medium transition flex items-center gap-2 rounded-t-lg ${activeInfoTab === 'curriculum'
                ? 'bg-white text-green-600 border-b-2 border-green-600'
                : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            <BookOpen size={18} />
            Curriculum
          </button>
          <button
            onClick={() => setActiveInfoTab('careers')}
            className={`px-6 py-3 font-medium transition flex items-center gap-2 rounded-t-lg ${activeInfoTab === 'careers'
                ? 'bg-white text-green-600 border-b-2 border-green-600'
                : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            <Briefcase size={18} />
            Careers
          </button>
          <button
            onClick={() => setActiveInfoTab('features')}
            className={`px-6 py-3 font-medium transition flex items-center gap-2 rounded-t-lg ${activeInfoTab === 'features'
                ? 'bg-white text-green-600 border-b-2 border-green-600'
                : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            <Sparkles size={18} />
            Features
          </button>
          <button
            onClick={() => setActiveInfoTab('admission')}
            className={`px-6 py-3 font-medium transition flex items-center gap-2 rounded-t-lg ${activeInfoTab === 'admission'
                ? 'bg-white text-green-600 border-b-2 border-green-600'
                : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            <Target size={18} />
            Admission
          </button>
        </div>

        {/* Overview Tab */}
        {activeInfoTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Description Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <BookOpen size={24} className="text-green-600" />
                  Program Overview
                </h2>
                <p className="text-gray-600 leading-relaxed">{course.description}</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
                  <Clock className="text-blue-600 mx-auto mb-2" size={24} />
                  <p className="text-2xl font-bold text-gray-800">{course.duration}</p>
                  <p className="text-xs text-gray-500">Duration</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center">
                  <Award className="text-green-600 mx-auto mb-2" size={24} />
                  <p className="text-2xl font-bold text-gray-800">{course.credits}</p>
                  <p className="text-xs text-gray-500">Total Credits</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center">
                  <DollarSign className="text-purple-600 mx-auto mb-2" size={24} />
                  <p className="text-2xl font-bold text-gray-800">${course.fee}</p>
                  <p className="text-xs text-gray-500">Annual Fee</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 text-center">
                  <Users className="text-orange-600 mx-auto mb-2" size={24} />
                  <p className="text-2xl font-bold text-gray-800">{course.seats}</p>
                  <p className="text-xs text-gray-500">Seats Available</p>
                </div>
              </div>

              {/* Special Features Preview */}
              <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                  <Sparkles size={20} />
                  What Makes This Program Special?
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {course.specialFeatures.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Application Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 sticky top-24">
                <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 rounded-t-2xl">
                  <h3 className="text-xl font-bold text-white mb-2">Ready to Apply?</h3>
                  <p className="text-green-100 text-sm">Secure your seat in this program</p>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="text-gray-600">Annual Tuition</span>
                    <span className="font-bold text-gray-800">${course.fee}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="text-gray-600">Application Fee</span>
                    <span className="font-bold text-gray-800">$50</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="text-gray-600">Total Credits</span>
                    <span className="font-bold text-gray-800">{course.credits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-semibold">Total (First Year)</span>
                    <span className="text-xl font-bold text-green-600">${course.fee + 50}</span>
                  </div>

                  <button
                    onClick={handleApplyNow}
                    className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2 mt-4"
                  >
                    <CreditCard size={18} />
                    Apply Now
                  </button>

                  <button className="w-full border-2 border-green-600 text-green-600 py-3 rounded-xl font-semibold hover:bg-green-50 transition flex items-center justify-center gap-2">
                    <Download size={18} />
                    Download Brochure
                  </button>
                </div>

                <div className="bg-green-50 p-4 rounded-b-2xl">
                  <p className="text-xs text-green-800 text-center">
                    🎓 Early application deadline: May 15, 2026
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Curriculum Tab */}
        {activeInfoTab === 'curriculum' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Calendar size={24} className="text-green-600" />
              Program Curriculum - 8 Semesters
            </h2>

            {/* Semester Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setSelectedSemester('all')}
                className={`px-4 py-2 rounded-full text-sm transition ${selectedSemester === 'all'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                All Semesters
              </button>
              {semesters.map(sem => (
                <button
                  key={sem.id}
                  onClick={() => setSelectedSemester(sem.id)}
                  className={`px-4 py-2 rounded-full text-sm transition ${selectedSemester === sem.id
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  Sem {sem.id}
                </button>
              ))}
            </div>

            {/* Semester Cards */}
            <div className="space-y-4">
              {semesters
                .filter(sem => selectedSemester === 'all' || selectedSemester === sem.id)
                .map(sem => (
                  <div key={sem.id} className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition group">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 font-bold text-sm">{sem.id}</span>
                          </div>
                          <h3 className="font-bold text-gray-800 text-lg">{sem.name}</h3>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{sem.description}</p>
                      </div>
                      <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
                        {sem.credits} Credits
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2 mt-3">
                      {sem.courses.map((courseItem, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-600 p-2 bg-gray-50 rounded-lg group-hover:bg-green-50 transition">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          {courseItem}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 bg-gray-50 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Total Credits:</span>
                <span className="text-2xl font-bold text-green-600">{totalCredits} Credits</span>
              </div>
            </div>
          </div>
        )}

        {/* Careers Tab */}
        {activeInfoTab === 'careers' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Briefcase size={24} className="text-green-600" />
                Career Opportunities
              </h2>
              <div className="space-y-3">
                {course.careerPaths.map((career, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition">
                    <TrendingUp size={18} className="text-green-500" />
                    <span className="text-gray-700">{career}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
                <h3 className="font-bold text-green-800 mb-3 text-lg">Employment Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center bg-white rounded-xl p-4">
                    <p className="text-3xl font-bold text-green-600">{course.jobPlacement}</p>
                    <p className="text-sm text-gray-600">Placement Rate</p>
                  </div>
                  <div className="text-center bg-white rounded-xl p-4">
                    <p className="text-3xl font-bold text-green-600">{course.averageSalary}</p>
                    <p className="text-sm text-gray-600">Average Salary</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Globe size={18} className="text-green-600" />
                  Top Hiring Companies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'IBM'].map(company => (
                    <span key={company} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                      {company}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Tab */}
        {activeInfoTab === 'features' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Sparkles size={24} className="text-green-600" />
                Special Features
              </h2>
              <div className="space-y-3">
                {course.specialFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle size={18} className="text-green-500 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Star size={18} className="text-yellow-500" />
                  Scholarships Available
                </h3>
                <p className="text-gray-600">{course.scholarships}</p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Shield size={18} className="text-green-600" />
                  Industry Certifications
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['AWS Certified', 'Google Cloud', 'Azure', 'TensorFlow', 'PyTorch'].map(cert => (
                    <span key={cert} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Admission Tab */}
        {activeInfoTab === 'admission' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Target size={24} className="text-green-600" />
                Admission Requirements
              </h2>
              <div className="space-y-4">
                {/* Always show course base requirement as summary if there is one */}
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                  <span className="text-green-800 font-semibold">{course.requirements || "Standard admissions criteria applies."}</span>
                </div>
                
                {loadingReqs ? (
                  <p className="text-sm text-gray-500">Loading requirements...</p>
                ) : (
                  requirements.map((req, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <h3 className="font-bold text-gray-800 mb-1">{req.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{req.description}</p>
                      <div className="space-y-2">
                        {req.items.map((item, j) => (
                          <div key={j} className="flex items-start gap-2">
                            <CheckCircle size={16} className={`mt-0.5 ${item.required ? 'text-red-500' : 'text-blue-500'}`} />
                            <span className="text-gray-700 text-sm">
                              {item.text} {item.required && <span className="text-red-500 text-xs font-bold">(Required)</span>}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6">
                <h3 className="font-bold text-blue-800 mb-3 text-lg">Application Deadlines</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Early Decision</span>
                    <span className="font-semibold">March 1, 2026</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Regular Decision</span>
                    <span className="font-semibold text-green-600">May 15, 2026</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Document Submission</span>
                    <span className="font-semibold">May 30, 2026</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-800 mb-3">Application Process</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold">1</span>
                    </div>
                    <span>Submit online application form</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold">2</span>
                    </div>
                    <span>Upload required documents</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold">3</span>
                    </div>
                    <span>Pay application fee ($50)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold">4</span>
                    </div>
                    <span>Wait for admission decision</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleApplyNow}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                Start Your Application <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleApplyNow}
          className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition transform hover:scale-105 duration-300"
        >
          <CreditCard size={24} />
        </button>
      </div>
    </div>
  );
};

export default Details;