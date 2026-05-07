import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  GraduationCap,
  User,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  Award,
  Bell,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  TrendingUp,
  Users,
  MapPin,
  Star,
  ChevronRight,
  Download,
  Printer,
  Settings,
  LogOut,
  BarChart,
  Target,
  Heart,
  Globe,
  Bot,
  X,
  Minimize2,
  Maximize2,
  Send
} from 'lucide-react';

// Student Chatbot Component
const StudentChatbot = ({ studentData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: `Hello ${studentData.name}! 👋\n\nI'm your personal academic assistant. I can help you with:\n\n• Your current courses and grades\n• Attendance information\n• Upcoming deadlines and events\n• Faculty and module notices\n• Academic calendar and schedules\n• GPA calculations\n\nWhat would you like to know?`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Get current courses
  const getCurrentCourses = () => {
    if (!studentData.enrolledCourses || studentData.enrolledCourses.length === 0) {
      return "You're not currently enrolled in any courses.";
    }
    const courseList = studentData.enrolledCourses.map(c =>
      `• ${c.name} (${c.code}) - Grade: ${c.grade}, Credits: ${c.credits}`
    ).join('\n');
    return `You are currently enrolled in ${studentData.enrolledCourses.length} courses:\n\n${courseList}\n\nWould you like details about any specific course?`;
  };

  // Get grades for a specific course
  const getCourseGrade = (courseName) => {
    const course = studentData.enrolledCourses.find(c =>
      c.name.toLowerCase().includes(courseName.toLowerCase()) ||
      c.code.toLowerCase().includes(courseName.toLowerCase())
    );
    if (course) {
      return `${course.name} (${course.code})\n• Grade: ${course.grade}\n• Credits: ${course.credits}\n• Instructor: ${course.instructor}\n• Schedule: ${course.schedule}`;
    }
    return null;
  };

  // Get module details
  const getModuleDetails = (moduleName) => {
    const module = studentData.modules.find(m =>
      m.name.toLowerCase().includes(moduleName.toLowerCase()) ||
      m.code.toLowerCase().includes(moduleName.toLowerCase())
    );
    if (module) {
      return `${module.name} (${module.code})\n• Attendance: ${module.attendance}\n• Assignments: ${module.assignments}\n• Midterm: ${module.midterm}\n• Final: ${module.final}\n• Current Grade: ${module.grade}`;
    }
    return null;
  };

  // Get upcoming deadlines
  const getDeadlines = () => {
    const deadlines = [];
    if (studentData.moduleNotices) {
      studentData.moduleNotices.forEach(notice => {
        if (notice.title.toLowerCase().includes('assignment') || notice.title.toLowerCase().includes('due')) {
          deadlines.push(`• ${notice.title} - Due: ${notice.date} (${notice.module})`);
        }
      });
    }
    if (deadlines.length === 0) {
      return "No upcoming deadlines at the moment. Check back later!";
    }
    return `Upcoming deadlines:\n\n${deadlines.join('\n')}`;
  };

  // Get upcoming events
  const getUpcomingEvents = () => {
    if (!studentData.upcomingEvents || studentData.upcomingEvents.length === 0) {
      return "No upcoming events scheduled.";
    }
    const events = studentData.upcomingEvents.map(e =>
      `• ${e.name} - ${e.date} at ${e.time}\n  Location: ${e.location}`
    ).join('\n\n');
    return `Upcoming events:\n\n${events}`;
  };

  // Get faculty notices
  const getFacultyNotices = () => {
    if (!studentData.facultyNotices || studentData.facultyNotices.length === 0) {
      return "No new faculty notices.";
    }
    const notices = studentData.facultyNotices.map(n =>
      `• ${n.title} (${n.priority.toUpperCase()} priority)\n  ${n.description}\n  From: ${n.from} - ${n.date}`
    ).join('\n\n');
    return `Latest faculty notices:\n\n${notices}`;
  };

  // Get module notices
  const getModuleNotices = () => {
    if (!studentData.moduleNotices || studentData.moduleNotices.length === 0) {
      return "No new module notices.";
    }
    const notices = studentData.moduleNotices.map(n =>
      `• [${n.module}] ${n.title}\n  ${n.description}\n  From: ${n.from} - ${n.date}`
    ).join('\n\n');
    return `Latest module notices:\n\n${notices}`;
  };

  // Calculate and get GPA
  const getGPAInfo = () => {
    const gradePoints = {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'F': 0.0
    };

    let totalPoints = 0;
    let totalCredits = 0;

    studentData.enrolledCourses.forEach(course => {
      const points = gradePoints[course.grade] || 0;
      totalPoints += points * course.credits;
      totalCredits += course.credits;
    });

    const calculatedGPA = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : studentData.gpa;

    return `Your Current Academic Standing:\n\n` +
      `• CGPA: ${studentData.gpa} / 4.0\n` +
      `• Calculated GPA: ${calculatedGPA}\n` +
      `• Total Credits Completed: 68 / 128\n` +
      `• Attendance Rate: 91%\n\n` +
      `To improve your GPA, focus on courses with higher credit hours. Would you like tips on improving your grades?`;
  };

  // Get attendance summary
  const getAttendanceSummary = () => {
    const modules = studentData.modules.map(m =>
      `• ${m.name}: ${m.attendance} attendance`
    ).join('\n');
    return `Your Attendance Summary:\n\n${modules}\n\nOverall Attendance: 91%\n\nTip: Maintaining >75% attendance is required for good academic standing.`;
  };

  const getResponse = (message) => {
    const lowerMessage = message.toLowerCase();

    // Check for course-related queries
    if (lowerMessage.includes("my courses") || lowerMessage.includes("enrolled courses") || lowerMessage.includes("what courses")) {
      return getCurrentCourses();
    }

    // Check for specific course grade
    const courseMatch = studentData.enrolledCourses.find(c =>
      lowerMessage.includes(c.name.toLowerCase()) ||
      lowerMessage.includes(c.code.toLowerCase())
    );
    if (courseMatch) {
      return getCourseGrade(courseMatch.name);
    }

    // Check for specific module
    const moduleMatch = studentData.modules.find(m =>
      lowerMessage.includes(m.name.toLowerCase()) ||
      lowerMessage.includes(m.code.toLowerCase())
    );
    if (moduleMatch) {
      return getModuleDetails(moduleMatch.name);
    }

    // Check for deadlines
    if (lowerMessage.includes("deadline") || lowerMessage.includes("assignment due") || lowerMessage.includes("homework")) {
      return getDeadlines();
    }

    // Check for events
    if (lowerMessage.includes("event") || lowerMessage.includes("upcoming") || lowerMessage.includes("calendar")) {
      return getUpcomingEvents();
    }

    // Check for faculty notices
    if (lowerMessage.includes("faculty notice") || lowerMessage.includes("announcement") || lowerMessage.includes("important")) {
      return getFacultyNotices();
    }

    // Check for module notices
    if (lowerMessage.includes("module notice") || lowerMessage.includes("course notice")) {
      return getModuleNotices();
    }

    // Check for GPA
    if (lowerMessage.includes("gpa") || lowerMessage.includes("grade point") || lowerMessage.includes("academic standing")) {
      return getGPAInfo();
    }

    // Check for attendance
    if (lowerMessage.includes("attendance") || lowerMessage.includes("present")) {
      return getAttendanceSummary();
    }

    // Check for schedule
    if (lowerMessage.includes("schedule") || lowerMessage.includes("timetable") || lowerMessage.includes("class time")) {
      const schedule = studentData.enrolledCourses.map(c =>
        `• ${c.name}: ${c.schedule}`
      ).join('\n');
      return `Your class schedule:\n\n${schedule}`;
    }

    // Check for instructor
    if (lowerMessage.includes("instructor") || lowerMessage.includes("teacher") || lowerMessage.includes("professor")) {
      const instructors = studentData.enrolledCourses.map(c =>
        `• ${c.name}: ${c.instructor}`
      ).join('\n');
      return `Your course instructors:\n\n${instructors}`;
    }

    // Check for achievements
    if (lowerMessage.includes("achievement") || lowerMessage.includes("award") || lowerMessage.includes("honor")) {
      const achievements = studentData.achievements.map(a =>
        `• ${a.title} (${a.year}): ${a.description}`
      ).join('\n');
      return `Your achievements:\n\n${achievements}`;
    }

    // Check for help
    if (lowerMessage.includes("help") || lowerMessage.includes("what can you do")) {
      return `I can help you with:\n\n` +
        `• View your courses and grades\n` +
        `• Check attendance records\n` +
        `• See upcoming deadlines and events\n` +
        `• Read faculty and module notices\n` +
        `• Calculate GPA and academic standing\n` +
        `• View class schedules\n` +
        `• Find instructor information\n\n` +
        `Try asking: "Show my courses", "What's my GPA?", "Upcoming deadlines", or "Faculty notices"`;
    }

    // Default response
    return `I can help you with information about your courses, grades, attendance, deadlines, and notices. Try asking:\n\n` +
      `• "Show my courses"\n` +
      `• "What's my GPA?"\n` +
      `• "Upcoming deadlines"\n` +
      `• "Faculty notices"\n` +
      `• "My attendance"\n` +
      `• "Class schedule"\n\n` +
      `What would you like to know?`;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getResponse(userMessage.text);
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: botResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 500 + Math.random() * 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 z-50 group"
        >
          <Bot size={28} />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          <span className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Ask about your academics
          </span>
        </button>
      )}

      {isOpen && (
        <div className={`fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl z-50 transition-all duration-300 ${isMinimized ? 'w-80 h-14' : 'w-96 h-[550px]'
          }`}>
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <span className="font-semibold">Student Assistant</span>
              <span className="text-xs bg-green-500 px-2 py-0.5 rounded-full">Online</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="hover:bg-green-500 p-1 rounded transition"
              >
                {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-green-500 p-1 rounded transition"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="h-[calc(100%-120px)] overflow-y-auto p-4 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg whitespace-pre-wrap ${message.type === 'user'
                        ? 'bg-green-600 text-white rounded-br-none'
                        : 'bg-gray-200 text-gray-800 rounded-bl-none'
                        }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-gray-200 text-gray-800 p-3 rounded-lg rounded-bl-none">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
                <div className="flex gap-2">
                  <textarea
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about your courses, grades, deadlines..."
                    rows="1"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={18} />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Try: "My courses", "What's my GPA?", "Upcoming deadlines", "Faculty notices"
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

// Main StudentProfile Component
const StudentProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('modules');

  // Get student data from location state or use default
  const student = location.state?.student || {
    id: 'IT2024001',
    name: 'John Doe',
    email: 'john.doe@unimanage.edu',
    phone: '+1 234 567 8900',
    program: 'Computer Science (B.Sc.)',
    year: '3rd Year',
    semester: 'Semester 5',
    gpa: '3.75',
    profileImage: null,
    enrolledCourses: [
      { code: 'CS301', name: 'Database Management Systems', credits: 3, grade: 'A', instructor: 'Dr. Emily Rodriguez', schedule: 'Mon/Wed 2:00 PM' },
      { code: 'CS401', name: 'Artificial Intelligence', credits: 4, grade: 'A-', instructor: 'Dr. Alan Turing', schedule: 'Wed/Fri 1:00 PM' },
      { code: 'CS250', name: 'Web Development', credits: 3, grade: 'B+', instructor: 'Prof. David Wilson', schedule: 'Tue/Thu 10:00 AM' },
      { code: 'CS201', name: 'Data Structures & Algorithms', credits: 4, grade: 'A', instructor: 'Prof. Michael Chen', schedule: 'Tue/Thu 1:00 PM' }
    ],
    modules: [
      { name: 'Database Systems', code: 'CS301', attendance: '92%', assignments: 'Submitted', midterm: '85%', final: 'Pending', grade: 'A' },
      { name: 'Artificial Intelligence', code: 'CS401', attendance: '88%', assignments: 'Submitted', midterm: '82%', final: 'Pending', grade: 'A-' },
      { name: 'Web Development', code: 'CS250', attendance: '95%', assignments: 'Submitted', midterm: '90%', final: 'Pending', grade: 'B+' },
      { name: 'Data Structures', code: 'CS201', attendance: '91%', assignments: 'Submitted', midterm: '88%', final: 'Pending', grade: 'A' }
    ],
    facultyNotices: [
      { id: 1, title: 'Midterm Exam Schedule', date: 'March 25, 2026', description: 'Midterm exams will be held from April 1-10, 2026', priority: 'high', from: 'Dean\'s Office' },
      { id: 2, title: 'Project Submission Deadline', date: 'March 28, 2026', description: 'Final project submissions due by April 15, 2026', priority: 'medium', from: 'Dr. Emily Rodriguez' },
      { id: 3, title: 'Guest Lecture: AI in Healthcare', date: 'March 30, 2026', description: 'Special guest lecture by Dr. Sarah Johnson from Google AI', priority: 'high', from: 'Computer Science Department' }
    ],
    moduleNotices: [
      { id: 1, title: 'Database Systems - Assignment 3', date: 'March 24, 2026', description: 'Assignment 3 released. Due date: April 5, 2026', module: 'CS301', from: 'Dr. Emily Rodriguez' },
      { id: 2, title: 'AI - Quiz 2 Results', date: 'March 23, 2026', description: 'Quiz 2 results published. Check your grades', module: 'CS401', from: 'Dr. Alan Turing' },
      { id: 3, title: 'Web Dev - Lab Session', date: 'March 22, 2026', description: 'Special lab session on React Hooks this Friday', module: 'CS250', from: 'Prof. David Wilson' },
      { id: 4, title: 'Data Structures - Code Challenge', date: 'March 21, 2026', description: 'Weekly coding challenge posted on portal', module: 'CS201', from: 'Prof. Michael Chen' }
    ],
    upcomingEvents: [
      { name: 'Career Fair 2026', date: 'April 10, 2026', time: '10:00 AM - 4:00 PM', location: 'Main Auditorium' },
      { name: 'Tech Symposium', date: 'April 15, 2026', time: '9:00 AM - 5:00 PM', location: 'Science Complex' },
      { name: 'Alumni Networking', date: 'April 20, 2026', time: '6:00 PM - 9:00 PM', location: 'University Club' }
    ],
    achievements: [
      { title: 'Dean\'s List', year: '2025', description: 'Achieved Dean\'s List for academic excellence' },
      { title: 'Hackathon Winner', year: '2025', description: '1st place in University Hackathon' }
    ]
  };

  const handleLogout = () => {
    navigate('/');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  const getGradeColor = (grade) => {
    if (grade === 'A' || grade === 'A+') return 'text-green-600';
    if (grade === 'A-') return 'text-green-500';
    if (grade === 'B+') return 'text-blue-600';
    return 'text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Student Chatbot */}
      <StudentChatbot studentData={student} />

      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <GraduationCap className="text-white" size={40} />
              <div>
                <h1 className="text-2xl font-bold text-white">Student Portal</h1>
                <p className="text-green-100">Welcome back, {student.name}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition flex items-center gap-2">
                <Printer size={18} />
                Print
              </button>
              <button
                onClick={handleLogout}
                className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition flex items-center gap-2"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Student Info (same as before) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-green-600 h-24"></div>
              <div className="relative px-6 pb-6">
                <div className="absolute -top-12 left-6">
                  <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-lg overflow-hidden">
                    {student.profileImage ? (
                      <img src={student.profileImage} alt={student.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                        <User size={40} className="text-green-600" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-16">
                  <h2 className="text-xl font-bold text-gray-800">{student.name}</h2>
                  <p className="text-gray-500 text-sm">{student.id}</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail size={16} className="text-green-600" />
                      {student.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone size={16} className="text-green-600" />
                      {student.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <GraduationCap size={16} className="text-green-600" />
                      {student.program}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar size={16} className="text-green-600" />
                      {student.year} • {student.semester}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <BarChart size={18} className="text-green-600" />
                Academic Performance
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">CGPA</span>
                    <span className="font-bold text-green-600">{student.gpa} / 4.0</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: `${(student.gpa / 4.0) * 100}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Attendance</span>
                    <span className="font-bold text-green-600">91%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '91%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Credits Completed</span>
                    <span className="font-bold text-green-600">68 / 128</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '53%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Award size={18} className="text-green-600" />
                Achievements
              </h3>
              <div className="space-y-3">
                {student.achievements.map((achievement, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <Star size={18} className="text-yellow-500 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-800">{achievement.title}</p>
                      <p className="text-xs text-gray-500">{achievement.year}</p>
                      <p className="text-xs text-gray-600 mt-1">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar size={18} className="text-green-600" />
                Upcoming Events
              </h3>
              <div className="space-y-3">
                {student.upcomingEvents.map((event, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg transition">
                    <div className="bg-green-100 text-green-600 text-center rounded-lg px-2 py-1 min-w-[60px]">
                      <div className="text-xs font-bold">{event.date.split(',')[0].split(' ')[0]}</div>
                      <div className="text-xs">{event.date.split(',')[0].split(' ')[1]}</div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 text-sm">{event.name}</p>
                      <p className="text-xs text-gray-500">{event.time}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                        <MapPin size={10} /> {event.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Main Content (same as before) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('modules')}
                  className={`px-6 py-3 font-medium transition ${activeTab === 'modules'
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  <BookOpen size={16} className="inline mr-2" />
                  My Modules
                </button>
                <button
                  onClick={() => setActiveTab('courses')}
                  className={`px-6 py-3 font-medium transition ${activeTab === 'courses'
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  <FileText size={16} className="inline mr-2" />
                  Enrolled Courses
                </button>
              </div>

              {/* Modules Tab */}
              {activeTab === 'modules' && (
                <div className="p-6">
                  <div className="space-y-4">
                    {student.modules.map((module, idx) => (
                      <div key={idx} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-bold text-gray-800">{module.name}</h4>
                            <p className="text-xs text-gray-500">{module.code}</p>
                          </div>
                          <span className={`font-bold ${getGradeColor(module.grade)}`}>
                            {module.grade}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div>
                            <p className="text-xs text-gray-500">Attendance</p>
                            <p className="font-semibold text-gray-700">{module.attendance}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Assignments</p>
                            <p className="font-semibold text-green-600">{module.assignments}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Midterm</p>
                            <p className="font-semibold text-gray-700">{module.midterm}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Final</p>
                            <p className="font-semibold text-gray-700">{module.final}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Courses Tab */}
              {activeTab === 'courses' && (
                <div className="p-6">
                  <div className="space-y-4">
                    {student.enrolledCourses.map((course, idx) => (
                      <div key={idx} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-bold text-gray-800">{course.name}</h4>
                            <p className="text-xs text-gray-500">{course.code}</p>
                          </div>
                          <span className={`font-bold ${getGradeColor(course.grade)}`}>
                            {course.grade}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                          <div>
                            <p className="text-xs text-gray-500">Instructor</p>
                            <p className="text-gray-700">{course.instructor}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Schedule</p>
                            <p className="text-gray-700">{course.schedule}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-green-600">
                          <Clock size={12} />
                          <span>{course.credits} Credits</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Faculty Notices */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Users size={18} className="text-green-600" />
                Faculty Notices
              </h3>
              <div className="space-y-4">
                {student.facultyNotices.map(notice => (
                  <div key={notice.id} className="border-l-4 border-green-500 bg-gray-50 p-4 rounded-r-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800">{notice.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(notice.priority)}`}>
                        {notice.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{notice.description}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>From: {notice.from}</span>
                      <span>{notice.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Module Notices */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <MessageSquare size={18} className="text-green-600" />
                Module Notices
              </h3>
              <div className="space-y-4">
                {student.moduleNotices.map(notice => (
                  <div key={notice.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-800">{notice.title}</h4>
                        <p className="text-xs text-green-600 mt-1">{notice.module}</p>
                      </div>
                      <span className="text-xs text-gray-500">{notice.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{notice.description}</p>
                    <p className="text-xs text-gray-400">From: {notice.from}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button className="p-3 bg-green-50 rounded-lg text-center hover:bg-green-100 transition group">
                  <Download size={20} className="mx-auto text-green-600 mb-1 group-hover:scale-110 transition" />
                  <p className="text-xs text-gray-600">Download<br />Materials</p>
                </button>
                <button className="p-3 bg-green-50 rounded-lg text-center hover:bg-green-100 transition group">
                  <FileText size={20} className="mx-auto text-green-600 mb-1 group-hover:scale-110 transition" />
                  <p className="text-xs text-gray-600">Submit<br />Assignment</p>
                </button>
                <button className="p-3 bg-green-50 rounded-lg text-center hover:bg-green-100 transition group">
                  <Calendar size={20} className="mx-auto text-green-600 mb-1 group-hover:scale-110 transition" />
                  <p className="text-xs text-gray-600">View<br />Schedule</p>
                </button>
                <button className="p-3 bg-green-50 rounded-lg text-center hover:bg-green-100 transition group">
                  <Settings size={20} className="mx-auto text-green-600 mb-1 group-hover:scale-110 transition" />
                  <p className="text-xs text-gray-600">Settings</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;