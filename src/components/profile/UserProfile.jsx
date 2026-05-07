import React from 'react';
import { 
  GraduationCap, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  BookOpen, 
  DollarSign,
  Clock,
  CheckCircle,
  Home,
  Building,
  Globe,
  Award,
  CreditCard,
  Download,
  Printer,
  ArrowLeft,
  Users,
  BookMarked,
  Trophy,
  Heart,
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserProfile = ({ userData }) => {
  const navigate = useNavigate();

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Handle print
  const handlePrint = () => {
    window.print();
  };

  // Handle download as JSON
  const handleDownload = () => {
    const dataStr = JSON.stringify(userData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `${userData.fullName || 'student'}_registration_details.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Handle back to home
  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-8 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="px-6 py-8 md:px-8 md:py-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                  {userData.profileImage ? (
                    <img src={userData.profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <GraduationCap className="text-green-600" size={40} />
                  )}
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white">Welcome, {userData.fullName || 'Student'}!</h1>
                  <p className="text-green-100 mt-1">Your registration is successfully completed</p>
                  <div className="flex items-center gap-2 mt-2">
                    <CheckCircle size={16} className="text-green-200" />
                    <span className="text-green-100 text-sm">Registration ID: UNI-{Math.floor(Math.random() * 1000000)}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleBackToHome}
                  className="bg-white text-green-700 px-5 py-2 rounded-lg font-semibold hover:bg-green-50 transition flex items-center gap-2"
                >
                  <ArrowLeft size={18} />
                  Back to Home
                </button>
                <button
                  onClick={handlePrint}
                  className="bg-green-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-400 transition flex items-center gap-2"
                >
                  <Printer size={18} />
                  Print
                </button>
                <button
                  onClick={handleDownload}
                  className="bg-green-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-400 transition flex items-center gap-2"
                >
                  <Download size={18} />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <BookMarked className="text-green-600" size={24} />
              <span className="text-2xl font-bold text-gray-800">{userData.selectedCourses?.length || 0}</span>
            </div>
            <p className="text-sm text-gray-600">Courses Enrolled</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <Clock className="text-green-600" size={24} />
              <span className="text-2xl font-bold text-gray-800">{userData.totalCredits || 0}</span>
            </div>
            <p className="text-sm text-gray-600">Total Credits</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="text-green-600" size={24} />
              <span className="text-2xl font-bold text-gray-800">${userData.totalFee || 0}</span>
            </div>
            <p className="text-sm text-gray-600">Total Fee</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <Trophy className="text-green-600" size={24} />
              <span className="text-2xl font-bold text-gray-800">2026</span>
            </div>
            <p className="text-sm text-gray-600">Academic Year</p>
          </div>
        </div>

        {/* Personal Information Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6 border border-gray-100">
          <div className="bg-green-50 px-6 py-4 border-b border-green-100">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <User size={20} className="text-green-600" />
              Personal Information
            </h2>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <User size={18} className="text-green-600 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Full Name</p>
                  <p className="text-gray-800 font-medium">{userData.fullName || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-green-600 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Email Address</p>
                  <p className="text-gray-800 font-medium">{userData.email || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-green-600 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Phone Number</p>
                  <p className="text-gray-800 font-medium">{userData.phone || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar size={18} className="text-green-600 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Date of Birth</p>
                  <p className="text-gray-800 font-medium">{formatDate(userData.dateOfBirth)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users size={18} className="text-green-600 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Gender</p>
                  <p className="text-gray-800 font-medium capitalize">{userData.gender || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe size={18} className="text-green-600 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Nationality</p>
                  <p className="text-gray-800 font-medium">{userData.nationality || 'Not provided'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Address Information Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6 border border-gray-100">
          <div className="bg-green-50 px-6 py-4 border-b border-green-100">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <MapPin size={20} className="text-green-600" />
              Address Information
            </h2>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Home size={18} className="text-green-600 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Street Address</p>
                  <p className="text-gray-800 font-medium">{userData.address || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Building size={18} className="text-green-600 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">City</p>
                  <p className="text-gray-800 font-medium">{userData.city || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-green-600 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">State/Province</p>
                  <p className="text-gray-800 font-medium">{userData.state || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-green-600 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Zip/Postal Code</p>
                  <p className="text-gray-800 font-medium">{userData.zipCode || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 md:col-span-2">
                <Globe size={18} className="text-green-600 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Country</p>
                  <p className="text-gray-800 font-medium">{userData.country || 'Not provided'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Courses Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6 border border-gray-100">
          <div className="bg-green-50 px-6 py-4 border-b border-green-100">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <BookOpen size={20} className="text-green-600" />
              Enrolled Courses
            </h2>
          </div>
          <div className="p-6">
            {userData.selectedCourses && userData.selectedCourses.length > 0 ? (
              <>
                <div className="space-y-3 mb-4">
                  {userData.selectedCourses.map((course, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <BookOpen size={16} className="text-green-600" />
                          <h3 className="font-semibold text-gray-800">{course.name}</h3>
                        </div>
                        <p className="text-xs text-gray-500">{course.code} • {course.department}</p>
                        {course.description && (
                          <p className="text-xs text-gray-400 mt-1">{course.description.substring(0, 100)}...</p>
                        )}
                        {course.instructor && (
                          <div className="flex items-center gap-4 mt-2 text-xs">
                            <span className="text-gray-500">Instructor: {course.instructor}</span>
                            {course.schedule && <span className="text-gray-500">Schedule: {course.schedule}</span>}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-green-600">{course.credits} Credits</p>
                        <p className="text-xs text-gray-500">${course.fee}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-700">Total Credits:</span>
                    <span className="text-lg font-bold text-green-600">{userData.totalCredits}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">Total Fee:</span>
                    <span className="text-lg font-bold text-green-600">${userData.totalFee}</span>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-gray-500 text-center py-4">No courses selected</p>
            )}
          </div>
        </div>

        {/* Account Information Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6 border border-gray-100">
          <div className="bg-green-50 px-6 py-4 border-b border-green-100">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <CreditCard size={20} className="text-green-600" />
              Account & Security
            </h2>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <User size={18} className="text-green-600 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Username</p>
                  <p className="text-gray-800 font-medium">{userData.username || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Heart size={18} className="text-green-600 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Emergency Contact</p>
                  <p className="text-gray-800 font-medium">{userData.emergencyContact || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-green-600 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Emergency Phone</p>
                  <p className="text-gray-800 font-medium">{userData.emergencyPhone || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award size={18} className="text-green-600 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">How did you hear about us?</p>
                  <p className="text-gray-800 font-medium capitalize">{userData.howDidYouHear || 'Not provided'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="bg-green-50 rounded-xl p-6 text-center border border-green-200">
          <CheckCircle size={32} className="text-green-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-green-800 mb-2">Registration Complete!</h3>
          <p className="text-green-700">
            Your application has been successfully submitted. We will contact you shortly with further instructions.
            You can download or print this information for your records.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={handleBackToHome}
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center gap-2 shadow-lg"
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition flex items-center gap-2"
          >
            Scroll to Top
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;