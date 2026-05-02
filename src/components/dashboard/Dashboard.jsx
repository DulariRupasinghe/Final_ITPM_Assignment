import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  LayoutDashboard, Users, BookOpen, Calendar, Settings, LogOut, User, Mail, Phone,
  GraduationCap, Award, AlertCircle, X, Bell, ChevronLeft, ChevronRight, CheckCircle,
  Clock, Download, Printer, Search, Save, RefreshCw, Shield, Lock, Key, UserCheck,
  BarChart3, TrendingUp, Plus, Edit, Trash2, MessageCircle, Headphones, HelpCircle,
  FileText, CreditCard, Home, Building, Globe, Heart, Star, Trophy, Zap, Target, Rocket,
  Eye, ThumbsUp, ThumbsDown, FileCheck, ClipboardList, Reply, Send, Filter, Upload,
  Monitor, Sun, Moon, Languages, Database, PieChart, QrCode, ArrowLeft
} from 'lucide-react';
import Reports from '../../pages/Reports';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

// Password Modal Component
const PasswordModal = ({ title, onClose, onSuccess, expectedPassword }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      if (password === expectedPassword) {
        setError('');
        onSuccess();
        onClose();
      } else {
        setError('Verification failed. Invalid code.');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fadeIn">
      <div className="bg-[#1e293b] rounded-[2.5rem] max-w-md w-full p-10 shadow-2xl border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5">
           <Shield size={200} className="text-white" />
        </div>
        
        <div className="flex flex-col items-center text-center mb-8 relative z-10">
          <div className="bg-green-600/20 p-5 rounded-[2rem] border border-green-500/20 mb-6">
            <Lock className="text-green-500" size={40} />
          </div>
          <h2 className="text-2xl font-black text-white mb-2">Secure Gateway</h2>
          <p className="text-gray-400 text-sm font-medium">To access <span className="text-white font-bold">{title}</span>, please verify your credentials.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Access Protocol</label>
            <div className="relative">
              <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-gray-700 outline-none focus:ring-2 focus:ring-green-500/50 transition-all" 
                placeholder="••••••••" 
                autoFocus 
              />
            </div>
            {error && <p className="text-rose-500 text-[10px] font-bold flex items-center gap-1 animate-headShake"><AlertCircle size={12} /> {error}</p>}
          </div>

          <div className="flex gap-3">
             <button type="button" onClick={onClose} className="flex-1 px-6 py-4 bg-white/5 text-gray-400 rounded-2xl font-bold hover:bg-white/10 transition-all">ABORT</button>
             <button type="submit" disabled={isLoading} className="flex-2 px-8 py-4 bg-green-600 text-white rounded-2xl font-black shadow-xl shadow-green-600/20 hover:bg-green-500 transition-all flex items-center justify-center gap-2">
               {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'INITIALIZE'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Management Card Component
const ManagementCard = ({ icon: Icon, title, description, color, stats, onClick }) => {
  return (
    <div 
      onClick={onClick} 
      className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden hover:shadow-2xl hover:shadow-green-100/50 transition-all duration-500 cursor-pointer group flex flex-col h-full border border-white/50 relative"
    >
      {/* Glossy Header Effect */}
      <div className={`${color} p-10 flex justify-center items-center h-32 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50"></div>
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-700"></div>
        <Icon className="text-white relative z-10 transform group-hover:scale-110 transition-transform duration-500" size={48} />
      </div>

      <div className="p-8 flex flex-col flex-1 bg-white">
        <h3 className="text-xl font-black text-gray-900 mb-2 leading-tight tracking-tight group-hover:text-green-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 text-xs font-medium mb-10 leading-relaxed uppercase tracking-widest">
          {description}
        </p>
        
        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
          {stats && (
            <div className="flex flex-col">
              <span className="text-4xl font-black text-gray-900 leading-none tracking-tighter">
                {stats.value}
              </span>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">
                {stats.label}
              </span>
            </div>
          )}
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-400 group-hover:bg-green-600 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1">
            <ChevronRight size={20} />
          </div>
        </div>
      </div>
      
      {/* Interaction Ripple Effect Placeholder */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-green-500/10 rounded-3xl transition-all duration-500 pointer-events-none"></div>
    </div>
  );
};

// Placeholder Components
const EnrollmentManagement = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/admissions/applications');
      if (response.data.success) {
        setApplications(response.data.applications);
      }
    } catch (error) {
      console.error('Failed to fetch applications', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredApps = applications.filter(app => {
    const nameMatch = app.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter === 'all' || app.status === statusFilter;
    return nameMatch && statusMatch;
  });

  const handleAccept = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/admissions/applications/${id}/status`, {
        status: 'accepted'
      });
      if (response.data.success) {
        alert("Application Approved! Opening automatically generated student profile...");
        fetchApplications();
        setSelectedApp(null);
        const createdUser = response.data.user;
        const mappedStudentData = {
          id: createdUser._id,
          name: createdUser.fullName,
          email: createdUser.email,
          phone: createdUser.phone || 'Pending',
          program: createdUser.program,
          year: '1st Year',
          semester: 'Semester 1',
          gpa: '0.00',
          profileImage: createdUser.profileImage,
          enrolledCourses: [
            { code: 'COR101', name: 'University Introduction', credits: 1, grade: 'Pending', instructor: 'Advising Staff', schedule: 'TBD' },
            { code: `${createdUser.program.substring(0,3).toUpperCase()}101`, name: `Introduction to ${createdUser.program}`, credits: 3, grade: 'Pending', instructor: 'TBD', schedule: 'TBD' }
          ],
          modules: [
            { name: `Intro to ${createdUser.program}`, code: '101', attendance: '0%', assignments: '0/0', midterm: 'N/A', final: 'N/A', grade: 'Pending' }
          ],
          facultyNotices: [
            { id: 1, title: 'Welcome to UniManage!', date: new Date().toLocaleDateString(), description: 'Your student profile has been provisioned successfully.', priority: 'high', from: 'Admissions Office' }
          ],
          moduleNotices: [],
          upcomingEvents: [],
          achievements: []
        };
        navigate('/student-profile', { state: { student: mappedStudentData } });
      }
    } catch (error) {
      console.error('Failed to accept', error);
      alert('Error updating application status');
    }
  };

  const handleDecline = async (id) => {
    if (window.confirm("Are you sure you want to decline this application?")) {
      try {
        const response = await axios.put(`http://localhost:5000/api/admissions/applications/${id}/status`, {
          status: 'rejected'
        });
        if (response.data.success) {
          alert("Application Declined. Email notification dispatched.");
          fetchApplications();
          setSelectedApp(null);
        }
      } catch (error) {
        console.error('Failed to decline', error);
        alert('Error declining application');
      }
    }
  };

  if (loading) return <div className="p-6 flex justify-center"><RefreshCw className="animate-spin text-blue-600" size={32} /></div>;

  return (
    <div className="p-6 animate-fadeIn">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Enrollment Pipeline</h2>
          <p className="text-gray-500 text-sm">Review and provision student academic identities</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border border-blue-100">
            {applications.length} Total Applications
          </div>
          <button onClick={fetchApplications} className="p-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all">
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="relative md:col-span-2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            placeholder="Search by applicant name..." 
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="px-4 py-3 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold text-sm text-gray-600"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending Review</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Declined</option>
        </select>
      </div>


      <div className="overflow-x-auto rounded-[2rem] border border-gray-100 shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">
              <th className="px-8 py-5">Applicant</th>
              <th className="px-8 py-5">Program</th>
              <th className="px-8 py-5">Status</th>
              <th className="px-8 py-5">Date Submitted</th>
              <th className="px-8 py-5 text-right">Verification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredApps.map(app => (
              <tr key={app._id} className="hover:bg-gray-50/80 transition-all group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-black text-xs uppercase">
                      {app.fullName.substring(0,2)}
                    </div>
                    <span className="font-bold text-gray-800">{app.fullName}</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-sm font-medium text-gray-600">{app.program}</td>
                <td className="px-8 py-5">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${
                    app.status === 'accepted' ? 'bg-green-100 text-green-700' :
                    app.status === 'rejected' ? 'bg-rose-100 text-rose-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {app.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-xs text-gray-400 font-bold">{new Date(app.applicationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                <td className="px-8 py-5 text-right">
                  <button 
                    onClick={() => setSelectedApp(app)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-black shadow-lg shadow-blue-200 opacity-0 group-hover:opacity-100 transition-all hover:bg-blue-700"
                  >
                    REVIEW
                  </button>
                </td>
              </tr>
            ))}
            {filteredApps.length === 0 && (
              <tr><td colSpan="5" className="px-8 py-20 text-center text-gray-400 italic font-medium">No applications match your filtering criteria.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedApp && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-[3rem] max-w-4xl w-full p-10 max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn border border-white">
            <div className="flex justify-between items-center mb-10 border-b border-gray-100 pb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-600 rounded-2xl text-white">
                  <FileText size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900 leading-tight">Identity Review</h2>
                  <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">Application Protocol #{selectedApp._id.substring(selectedApp._id.length-6).toUpperCase()}</p>
                </div>
              </div>
              <button onClick={() => setSelectedApp(null)} className="p-2 hover:bg-rose-50 hover:text-rose-600 rounded-xl transition-all text-gray-400">
                <X size={28} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-8">
                <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <User size={14} /> Personal Intelligence
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-gray-200/50 pb-2">
                      <span className="text-sm font-bold text-gray-500">Full Legal Name</span>
                      <span className="text-sm font-black text-gray-900">{selectedApp.fullName}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200/50 pb-2">
                      <span className="text-sm font-bold text-gray-500">Contact Interface</span>
                      <span className="text-sm font-black text-gray-900">{selectedApp.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-bold text-gray-500">Selected Program</span>
                      <span className="text-sm font-black text-blue-600">{selectedApp.program}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <Shield size={14} /> Security Status
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black ${
                      selectedApp.status === 'accepted' ? 'bg-green-600 text-white' : 'bg-amber-500 text-white'
                    }`}>
                      {selectedApp.status === 'accepted' ? <CheckCircle size={24}/> : '!'}
                    </div>
                    <div>
                      <p className="text-sm font-black text-gray-900 uppercase tracking-tight">{selectedApp.status}</p>
                      <p className="text-xs text-gray-500 font-medium">Application verified on {new Date(selectedApp.applicationDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <BookOpen size={14} /> Evidence Artifacts (Results)
                </h3>
                
                <div className="space-y-4">
                  {selectedApp.olResultSheetUrl ? (
                    <div className="p-6 bg-white border border-gray-100 rounded-[2rem] flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                          <FileText size={24} />
                        </div>
                        <div>
                          <p className="font-black text-gray-900 text-sm">O/L Results Sheet</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Verified Image Artifact</p>
                        </div>
                      </div>
                      <a href={`http://localhost:5000${selectedApp.olResultSheetUrl}`} target="_blank" rel="noreferrer" className="w-10 h-10 bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                        <Eye size={20} />
                      </a>
                    </div>
                  ) : (
                    <div className="p-6 bg-gray-50 rounded-[2rem] border border-dashed border-gray-300 text-center">
                      <p className="text-xs font-bold text-gray-400 uppercase">O/L Data Unavailable</p>
                    </div>
                  )}

                  {selectedApp.alResultSheetUrl ? (
                    <div className="p-6 bg-white border border-gray-100 rounded-[2rem] flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                          <FileText size={24} />
                        </div>
                        <div>
                          <p className="font-black text-gray-900 text-sm">A/L Results Sheet</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Verified Image Artifact</p>
                        </div>
                      </div>
                      <a href={`http://localhost:5000${selectedApp.alResultSheetUrl}`} target="_blank" rel="noreferrer" className="w-10 h-10 bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all">
                        <Eye size={20} />
                      </a>
                    </div>
                  ) : (
                    <div className="p-6 bg-gray-50 rounded-[2rem] border border-dashed border-gray-300 text-center">
                      <p className="text-xs font-bold text-gray-400 uppercase">A/L Data Unavailable</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-end gap-4">
              <button 
                onClick={() => setSelectedApp(null)} 
                className="px-8 py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-all uppercase tracking-widest text-xs"
              >
                Close Portal
              </button>
              {selectedApp.status === 'pending' && (
                <>
                  <button 
                    onClick={() => handleDecline(selectedApp._id)} 
                    className="px-8 py-4 bg-rose-100 text-rose-600 rounded-2xl font-black hover:bg-rose-600 hover:text-white transition-all flex items-center justify-center gap-3 shadow-xl shadow-rose-100 uppercase tracking-widest text-xs"
                  >
                    <X size={18} /> DECLINE
                  </button>
                  <button 
                    onClick={() => handleAccept(selectedApp._id)} 
                    className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-500 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-blue-200 uppercase tracking-widest text-xs"
                  >
                    <CheckCircle size={18} /> PROVISION IDENTITY
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
const CourseModal = ({ course, onClose, onSave }) => {
  const isEditing = !!course;
  const [formData, setFormData] = useState(course || {
    name: '', code: '', category: 'technology', degree: '', duration: '',
    credits: 120, fee: 8000, seats: 60, ranking: '', description: '',
    jobPlacement: '95%', averageSalary: '$85,000'
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    await onSave(formData);
    setIsSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-3xl w-full p-6 my-8 mt-10 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6 border-b pb-4 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <BookOpen className="text-green-600" />
            {isEditing ? 'Edit Course' : 'Add New Course'}
          </h2>
          <button onClick={onClose} type="button" className="p-1 hover:bg-gray-100 rounded text-gray-500">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">Course Name *</label><input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" /></div>
            <div><label className="block text-sm font-medium mb-1">Course Code *</label><input type="text" name="code" required value={formData.code} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" /></div>
            
            <div><label className="block text-sm font-medium mb-1">Category *</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg">
                <option value="technology">Technology</option>
                <option value="business">Business</option>
                <option value="engineering">Engineering</option>
                <option value="science">Science</option>
                <option value="arts">Arts & Humanities</option>
                <option value="healthcare">Healthcare</option>
              </select>
            </div>
            <div><label className="block text-sm font-medium mb-1">Degree Title *</label><input type="text" name="degree" required value={formData.degree} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" placeholder="e.g. B.Sc. Computer Science" /></div>
            
            <div><label className="block text-sm font-medium mb-1">Duration *</label><input type="text" name="duration" required value={formData.duration} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" placeholder="e.g. 4 Years" /></div>
            <div><label className="block text-sm font-medium mb-1">Ranking</label><input type="text" name="ranking" value={formData.ranking} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" placeholder="e.g. Top 10" /></div>
            
            <div><label className="block text-sm font-medium mb-1">Fee ($/year)</label><input type="number" name="fee" value={formData.fee} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" /></div>
            <div><label className="block text-sm font-medium mb-1">Seats</label><input type="number" name="seats" value={formData.seats} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" /></div>
            
            <div><label className="block text-sm font-medium mb-1">Job Placement Rate</label><input type="text" name="jobPlacement" value={formData.jobPlacement} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" /></div>
            <div><label className="block text-sm font-medium mb-1">Average Salary</label><input type="text" name="averageSalary" value={formData.averageSalary} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" /></div>
          </div>
          
          <div><label className="block text-sm font-medium mb-1">Description *</label><textarea name="description" required value={formData.description} onChange={handleChange} rows="3" className="w-full px-3 py-2 border rounded-lg" /></div>
          
          <div className="pt-4 border-t flex justify-end gap-3 sticky bottom-0 bg-white">
            <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg shrink-0">Cancel</button>
            <button type="submit" disabled={isSaving} className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold shrink-0">
              {isSaving ? 'Saving...' : 'Save Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => { fetchCourses(); }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/courses');
      if (res.data.success) setCourses(res.data.courses);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const handleSave = async (courseData) => {
    try {
      if (editingCourse) {
        await axios.put(`http://localhost:5000/api/courses/${editingCourse._id}`, courseData);
      } else {
        await axios.post('http://localhost:5000/api/courses', courseData);
      }
      setShowModal(false);
      setEditingCourse(null);
      fetchCourses();
    } catch (error) {
      console.error(error);
      alert('Failed to save course');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course completely?')) {
      try {
        await axios.delete(`http://localhost:5000/api/courses/${id}`);
        fetchCourses();
      } catch (error) {
        alert('Failed to delete course');
      }
    }
  };

  if (loading) return <div className="p-6 flex justify-center"><RefreshCw className="animate-spin text-green-600" size={32} /></div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Course Management</h2>
        <button onClick={() => { setEditingCourse(null); setShowModal(true); }} className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-green-700 transition">
          <Plus size={18} /> Add Course
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 font-semibold text-gray-700">Course Code</th>
              <th className="p-4 font-semibold text-gray-700">Name</th>
              <th className="p-4 font-semibold text-gray-700">Category</th>
              <th className="p-4 font-semibold text-gray-700">Fee</th>
              <th className="p-4 font-semibold text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4 font-semibold text-gray-600">{course.code}</td>
                <td className="p-4">{course.name}</td>
                <td className="p-4 capitalize">{course.category}</td>
                <td className="p-4">${course.fee}/yr</td>
                <td className="p-4 flex gap-3 justify-end">
                  <button onClick={() => { setEditingCourse(course); setShowModal(true); }} className="text-blue-600 hover:text-blue-800"><Edit size={18}/></button>
                  <button onClick={() => handleDelete(course._id)} className="text-red-600 hover:text-red-800"><Trash2 size={18}/></button>
                </td>
              </tr>
            ))}
            {courses.length === 0 && <tr><td colSpan="5" className="p-4 text-center text-gray-500">No courses defined yet.</td></tr>}
          </tbody>
        </table>
      </div>

      {showModal && <CourseModal course={editingCourse} onClose={() => setShowModal(false)} onSave={handleSave} />}
    </div>
  );
};
const RequirementsManagement = () => {
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingReq, setEditingReq] = useState(null);
  
  const defaultFormData = { category: 'undergraduate', title: '', description: '', items: [] };
  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => { fetchRequirements(); }, []);

  const fetchRequirements = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/requirements');
      if (res.data.success) setRequirements(res.data.requirements);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingReq) {
        await axios.put(`http://localhost:5000/api/requirements/${editingReq._id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/requirements', formData);
      }
      setShowModal(false);
      fetchRequirements();
    } catch (err) { alert('Failed to save'); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete requirement?')) {
      try {
        await axios.delete(`http://localhost:5000/api/requirements/${id}`);
        fetchRequirements();
      } catch (e) { alert('Delete failed'); }
    }
  };

  const openEdit = (req) => { setEditingReq(req); setFormData(req); setShowModal(true); };
  const openNew = () => { setEditingReq(null); setFormData(defaultFormData); setShowModal(true); };

  const addItem = () => {
    setFormData(prev => ({ ...prev, items: [...prev.items, { text: '', required: false, icon: 'CheckCircle' }] }));
  };
  const updateItem = (idx, field, val) => {
    const newItems = [...formData.items];
    newItems[idx][field] = val;
    setFormData(prev => ({ ...prev, items: newItems }));
  };
  const removeItem = (idx) => {
    const newItems = formData.items.filter((_, i) => i !== idx);
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  if (loading) return <div className="p-6 flex justify-center"><RefreshCw className="animate-spin text-green-600" size={32} /></div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Requirements Management</h2>
        <button onClick={openNew} className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-indigo-700 transition">
          <Plus size={18} /> Add Requirement
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 font-semibold text-gray-700">Category</th>
              <th className="p-4 font-semibold text-gray-700">Title</th>
              <th className="p-4 font-semibold text-gray-700">Items</th>
              <th className="p-4 font-semibold text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requirements.map(req => (
              <tr key={req._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4 uppercase text-xs font-bold text-gray-500">{req.category}</td>
                <td className="p-4 font-semibold">{req.title}</td>
                <td className="p-4">{req.items?.length || 0}</td>
                <td className="p-4 flex gap-3 justify-end">
                  <button onClick={() => openEdit(req)} className="text-blue-600 hover:text-blue-800"><Edit size={18}/></button>
                  <button onClick={() => handleDelete(req._id)} className="text-red-600 hover:text-red-800"><Trash2 size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between mb-6 border-b pb-4"><h2 className="text-xl font-bold">{editingReq ? 'Edit' : 'Add'} Requirement</h2><button onClick={() => setShowModal(false)}><X size={24} /></button></div>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1">Category</label><select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border p-2 rounded"><option value="undergraduate">Undergraduate</option><option value="graduate">Graduate</option><option value="international">International</option><option value="documents">Documents</option><option value="general">General</option></select></div>
                <div><label className="block text-sm font-medium mb-1">Title</label><input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border p-2 rounded" /></div>
              </div>
              <div><label className="block text-sm font-medium mb-1">Description</label><textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border p-2 rounded" /></div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2"><label className="block text-sm font-medium">Sub-Items</label><button type="button" onClick={addItem} className="text-sm bg-gray-200 px-2 py-1 rounded hover:bg-gray-300">+ Add Item</button></div>
                {formData.items.map((item, idx) => (
                  <div key={idx} className="flex gap-2 mb-2 items-center">
                    <input className="flex-1 border p-2 rounded text-sm" placeholder="Text..." value={item.text} onChange={e => updateItem(idx, 'text', e.target.value)} required />
                    <label className="flex items-center text-sm gap-1"><input type="checkbox" checked={item.required} onChange={e => updateItem(idx, 'required', e.target.checked)} /> Req</label>
                    <button type="button" onClick={() => removeItem(idx)} className="text-red-500"><X size={16} /></button>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t"><button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded">Cancel</button><button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded font-bold">Save</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
const ContactSupportManagement = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/support/tickets');
      if (res.data.success) {
        setTickets(res.data.tickets);
      }
    } catch (err) { console.error('Failed to load tickets', err); }
    setLoading(false);
  };

  const getAverageRating = () => {
    const rated = tickets.filter(t => t.rating);
    if (rated.length === 0) return 0;
    return (rated.reduce((acc, t) => acc + t.rating, 0) / rated.length).toFixed(1);
  };

  const handleReply = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/support/tickets/${selectedTicket._id}/reply`, {
        message: replyMessage
      });
      alert('Reply dispatched successfully!');
      setSelectedTicket(null);
      setReplyMessage('');
      fetchTickets();
    } catch (err) { alert('Failed to send reply'); }
  };

  const resolveTicket = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/support/tickets/${id}/status`, { status: 'resolved' });
      fetchTickets();
    } catch(err) { alert('Failed to resolve'); }
  };

  if (loading) return <div className="p-6 flex justify-center"><RefreshCw className="animate-spin text-green-600" size={32} /></div>;

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">FAQ & Ratings Portal</h2>
          <p className="text-gray-500 text-sm">Monitor student feedback, lecturer ratings, and support tickets</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-4 shadow-sm">
            <div className="space-y-1">
              {[5,4,3,2,1].map(s => (
                <div key={s} className="flex items-center gap-2 text-[10px]">
                   <span className="w-2">{s}</span>
                   <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-400" 
                        style={{ width: `${(tickets.filter(t => t.rating === s).length / (tickets.filter(t => t.rating).length || 1)) * 100}%` }}
                      ></div>
                   </div>
                </div>
              ))}
            </div>
            <div className="h-full w-[1px] bg-gray-100 mx-2"></div>
            <div>
              <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Average Rating</p>
              <p className="text-2xl font-black text-amber-700 flex items-center gap-1">{getAverageRating()} <Star size={20} fill="currentColor" /></p>
            </div>
          </div>
          <div className="bg-amber-50 px-6 py-3 rounded-2xl border border-amber-100 flex items-center gap-4">
            <div>
              <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Total Feedback</p>
              <p className="text-2xl font-black text-amber-700">{tickets.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-700">User / Email</th>
              <th className="p-4 font-semibold text-gray-700">Category</th>
              <th className="p-4 font-semibold text-gray-700">Subject</th>
              <th className="p-4 font-semibold text-gray-700">Status</th>
              <th className="p-4 font-semibold text-gray-700">Rating</th>
              <th className="p-4 font-semibold text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4 font-medium">{ticket.name} <br/><span className="text-xs text-gray-500 font-normal">{ticket.email}</span></td>
                <td className="p-4 capitalize text-sm">{ticket.category}</td>
                <td className="p-4 text-sm truncate max-w-[200px]">{ticket.subject}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs uppercase font-bold
                    ${ticket.status==='open' ? 'bg-red-100 text-red-700' :
                      ticket.status==='in_progress' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-green-100 text-green-700'}`}>
                    {ticket.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="p-4">
                  {ticket.rating ? <div className="flex text-yellow-500"><Star fill="currentColor" size={14}/> {ticket.rating}/5</div> : <span className="text-gray-400 text-xs">Unrated</span>}
                </td>
                <td className="p-4 flex gap-2 justify-end">
                  <button onClick={() => setSelectedTicket(ticket)} className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-semibold hover:bg-blue-200">View/Reply</button>
                  {ticket.status !== 'resolved' && (
                    <button onClick={() => resolveTicket(ticket._id)} className="px-3 py-1 bg-green-100 text-green-700 rounded font-semibold text-sm flex items-center gap-1 hover:bg-green-200"><CheckCircle size={14}/> Resolve</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTicket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="text-xl font-bold">Manage Ticket <span className="text-gray-500 text-sm">#{selectedTicket.ticketNumber}</span></h2>
              <button onClick={() => setSelectedTicket(null)}><X size={24} className="text-gray-500 hover:text-red-500"/></button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-sm font-semibold text-gray-600">From:</p><p className="font-medium text-gray-800">{selectedTicket.name} <span className="font-normal text-sm">({selectedTicket.email})</span></p></div>
                <div><p className="text-sm font-semibold text-gray-600">Category / Priority:</p><p className="capitalize font-medium text-gray-800">{selectedTicket.category} / {selectedTicket.priority}</p></div>
              </div>
              <div><p className="text-sm font-semibold text-gray-600 mb-1">Subject:</p><p className="font-bold text-gray-800">{selectedTicket.subject}</p></div>
              <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg text-gray-700"><p className="whitespace-pre-wrap">{selectedTicket.message}</p></div>
              
              {selectedTicket.rating && (
                <div className="bg-yellow-50 p-4 border border-yellow-200 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="text-sm font-bold text-yellow-800 mb-1">User Feedback Rating Provided:</p>
                    <p className="flex items-center text-yellow-600 font-bold"><Star fill="currentColor" size={16} className="mr-1"/> {selectedTicket.rating} / 5</p>
                  </div>
                  {selectedTicket.feedback && (
                    <div className="text-sm text-yellow-700 italic border-l-2 border-yellow-400 pl-3">
                      "{selectedTicket.feedback}"
                    </div>
                  )}
                </div>
              )}
            </div>

            <form onSubmit={handleReply} className="border-t border-gray-200 pt-6 mt-6 relative">
              <label className="block text-sm font-bold text-gray-700 mb-2">Send Admin Reply (Dispatches Automated Email Notification)</label>
              <textarea 
                className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-blue-500 text-sm" 
                rows="4" 
                required 
                placeholder="Type your problem resolution response here..." 
                value={replyMessage}
                onChange={e => setReplyMessage(e.target.value)}
              />
              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setSelectedTicket(null)} className="px-4 py-2 border border-gray-300 rounded-lg font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold flex items-center gap-2"><Send size={16}/> Dispatch Email Reply</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '', category: 'music', description: '', date: '', time: '', location: ''
  });

  useEffect(() => { fetchEvents(); }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/events');
      if (res.data.success) {
        setEvents(res.data.events);
      }
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if(window.confirm('Delete event?')){
      try {
        await axios.delete(`http://localhost:5000/api/events/${id}`);
        fetchEvents();
      } catch (err) { alert('Failed to delete'); }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/events', formData);
      setShowModal(false);
      setFormData({name: '', category: 'music', description: '', date: '', time: '', location: ''});
      fetchEvents();
    } catch (err) { alert('Failed to save event'); }
  };

  if (loading) return <div className="p-6 flex justify-center"><RefreshCw className="animate-spin text-green-600" size={32} /></div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Event Management</h2>
        <button onClick={() => setShowModal(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-indigo-700 transition">
          <Plus size={18} /> Create Event
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-700">Event Name</th>
              <th className="p-4 font-semibold text-gray-700">Category</th>
              <th className="p-4 font-semibold text-gray-700">Date/Time</th>
              <th className="p-4 font-semibold text-gray-700">Location</th>
              <th className="p-4 font-semibold text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map(ev => (
              <tr key={ev._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4 font-medium text-gray-800">{ev.name}</td>
                <td className="p-4 capitalize text-sm font-semibold">{ev.category}</td>
                <td className="p-4 text-sm">{new Date(ev.date).toLocaleDateString()} at {ev.time}</td>
                <td className="p-4 text-sm max-w-[150px] truncate">{ev.location}</td>
                <td className="p-4 flex gap-2 justify-end">
                  <button onClick={() => handleDelete(ev._id)} className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm font-semibold hover:bg-red-200"><Trash2 size={16}/></button>
                </td>
              </tr>
            ))}
            {events.length === 0 && <tr><td colSpan="5" className="p-4 text-center text-gray-500 italic">No scheduled events active.</td></tr>}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="text-xl font-bold">Launch New Event</h2>
              <button onClick={() => setShowModal(false)}><X size={24} className="text-gray-500 hover:text-red-500"/></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-bold mb-1 text-gray-700">Event Name</label><input required value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500 text-sm" /></div>
                <div><label className="block text-sm font-bold mb-1 text-gray-700">Category</label><select value={formData.category} onChange={e=>setFormData({...formData, category: e.target.value})} className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500 text-sm"><option value="music">Music</option><option value="dance">Dance</option><option value="outdoor">Outdoor</option><option value="sports">Sports</option><option value="academic">Academic</option></select></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-bold mb-1 text-gray-700">Set Date</label><input required type="date" value={formData.date} onChange={e=>setFormData({...formData, date: e.target.value})} className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500 text-sm" /></div>
                <div><label className="block text-sm font-bold mb-1 text-gray-700">Time Window</label><input required type="time" value={formData.time} onChange={e=>setFormData({...formData, time: e.target.value})} className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500 text-sm" /></div>
              </div>
              <div><label className="block text-sm font-bold mb-1 text-gray-700">Event Location Details</label><input required value={formData.location} onChange={e=>setFormData({...formData, location: e.target.value})} placeholder="Main Auditorium" className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500 text-sm" /></div>
              <div><label className="block text-sm font-bold mb-1 text-gray-700">Description Overview</label><textarea required value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})} rows="3" className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500 text-sm" /></div>
              <div className="flex justify-end gap-3 mt-4 pt-4 border-t">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold flex items-center gap-2 hover:bg-indigo-700"><CheckCircle size={16}/> Save Event Entry</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
const UserManagement = ({ users, loading, onEdit, onDelete }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  if (loading) return <div className="p-6 flex justify-center"><RefreshCw className="animate-spin text-green-600" size={32} /></div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Management</h2>
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">{users?.length || 0} Users</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 font-semibold text-gray-700">Name</th>
              <th className="p-4 font-semibold text-gray-700">Email</th>
              <th className="p-4 font-semibold text-gray-700">Phone</th>
              <th className="p-4 font-semibold text-gray-700">Nationality</th>
              <th className="p-4 font-semibold text-gray-700">Role</th>
              <th className="p-4 font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map(user => (
              <tr key={user._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4">{user.fullName}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.phone || '-'}</td>
                <td className="p-4">{user.nationality || '-'}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setSelectedUser(user)}
                      className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                    <button 
                      onClick={() => onEdit(user)}
                      className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                      title="Edit User"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => onDelete(user._id)}
                      className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                      title="Delete User"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 my-8 mt-10 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 border-b pb-4 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <UserCheck className="text-green-600" />
                Applicant Details: {selectedUser.fullName}
              </h2>
              <button onClick={() => setSelectedUser(null)} className="p-1 hover:bg-gray-100 rounded text-gray-500">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-green-700 mb-3 border-b flex justify-between">Personal Info</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <p><span className="text-gray-500">Email:</span> {selectedUser.email}</p>
                  <p><span className="text-gray-500">Phone:</span> {selectedUser.phone}</p>
                  <p><span className="text-gray-500">DOB:</span> {selectedUser.dateOfBirth}</p>
                  <p><span className="text-gray-500">Gender:</span> {selectedUser.gender}</p>
                  <p><span className="text-gray-500">Nationality:</span> {selectedUser.nationality}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-green-700 mb-3 border-b flex justify-between">Address</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <p className="col-span-2"><span className="text-gray-500">Address:</span> {selectedUser.address}</p>
                  <p><span className="text-gray-500">City:</span> {selectedUser.city}</p>
                  <p><span className="text-gray-500">State:</span> {selectedUser.state}</p>
                  <p><span className="text-gray-500">Zip:</span> {selectedUser.zipCode}</p>
                  <p><span className="text-gray-500">Country:</span> {selectedUser.country}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-green-700 mb-3 border-b flex justify-between">Academic Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <p className="col-span-2"><span className="text-gray-500">Program:</span> {selectedUser.program}</p>
                  <p><span className="text-gray-500">Intake:</span> {selectedUser.intake}</p>
                  <p><span className="text-gray-500">Previous Education:</span> {selectedUser.previousEducation}</p>
                  <p><span className="text-gray-500">Institution:</span> {selectedUser.institution}</p>
                  <p><span className="text-gray-500">Graduation Year:</span> {selectedUser.graduationYear}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button onClick={() => setSelectedUser(null)} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState({ name: '', studentId: '' });
  const [showModal, setShowModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    studentId: '',
    program: '',
    intake: ''
  });

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const { name, studentId } = searchTerm;
      const res = await axios.get(`http://localhost:5000/api/students?name=${name}&studentId=${studentId}`);
      setStudents(res.data);
    } catch (err) {
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStudents();
  };

  const handleReset = () => {
    setSearchTerm({ name: '', studentId: '' });
    // fetchStudents will be triggered by the manual fetch or I can just call it here
    setTimeout(fetchStudents, 0);
  };

  const openModal = (student = null) => {
    if (student) {
      setCurrentStudent(student);
      setFormData({
        fullName: student.fullName,
        email: student.email,
        phone: student.phone,
        studentId: student.studentId,
        program: student.program,
        intake: student.intake
      });
    } else {
      setCurrentStudent(null);
      setFormData({ fullName: '', email: '', phone: '', studentId: '', program: '', intake: '' });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (formData.fullName.length < 3) {
      alert("Name must be at least 3 characters");
      return;
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      alert("Invalid email format");
      return;
    }
    if (!formData.studentId.match(/^[A-Z]{2,}\d{4,}$/i)) {
      alert("Invalid Student ID format (e.g. IT2024001)");
      return;
    }

    try {
      if (currentStudent) {
        await axios.put(`http://localhost:5000/api/students/${currentStudent._id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/students', formData);
      }
      setShowModal(false);
      fetchStudents();
    } catch (err) {
      alert(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student record?')) {
      try {
        await axios.delete(`http://localhost:5000/api/students/${id}`);
        fetchStudents();
      } catch (err) {
        alert('Delete failed');
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Student Records</h2>
          <p className="text-gray-500">Manage student profiles, enrollment and academic details</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-green-700 transition-all flex items-center gap-2 shadow-lg shadow-green-200"
        >
          <Plus size={20} /> Add New Student
        </button>
      </div>

      {/* Filter Section */}
      <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-100">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Student Name</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text"
                placeholder="Search by name..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                value={searchTerm.name}
                onChange={(e) => setSearchTerm({...searchTerm, name: e.target.value})}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Student ID</label>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text"
                placeholder="Search by ID..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                value={searchTerm.studentId}
                onChange={(e) => setSearchTerm({...searchTerm, studentId: e.target.value})}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              type="submit"
              className="flex-1 bg-gray-800 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-gray-900 transition-all flex items-center justify-center gap-2"
            >
              <Search size={18} /> Search
            </button>
            <button 
              type="button"
              onClick={handleReset}
              className="bg-white text-gray-600 px-6 py-2.5 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-all"
            >
              Reset
            </button>
          </div>
        </form>
      </div>


      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-6 py-4 font-bold text-gray-700 rounded-tl-xl">ID</th>
              <th className="px-6 py-4 font-bold text-gray-700">Full Name</th>
              <th className="px-6 py-4 font-bold text-gray-700">Program</th>
              <th className="px-6 py-4 font-bold text-gray-700">Email</th>
              <th className="px-6 py-4 font-bold text-gray-700">Contact</th>
              <th className="px-6 py-4 font-bold text-gray-700 rounded-tr-xl">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan="6" className="text-center py-20"><div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div></td></tr>
            ) : students.length === 0 ? (
              <tr><td colSpan="6" className="text-center py-20 text-gray-500">No student records found.</td></tr>
            ) : students.map((student) => (
              <tr key={student._id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4 font-mono text-sm text-green-700 font-bold">{student.studentId || 'N/A'}</td>
                <td className="px-6 py-4 font-medium text-gray-800">{student.fullName}</td>
                <td className="px-6 py-4 text-gray-600 text-sm">{student.program || 'N/A'}</td>
                <td className="px-6 py-4 text-gray-600 text-sm">{student.email}</td>
                <td className="px-6 py-4 text-gray-600 text-sm">{student.phone}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => openModal(student)}
                      className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(student._id)}
                      className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-scaleIn">
            <div className="bg-green-600 px-8 py-6 text-white flex justify-between items-center">
              <h3 className="text-2xl font-bold">{currentStudent ? 'Edit Student Record' : 'Add New Student'}</h3>
              <button onClick={() => setShowModal(false)} className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <input 
                    required
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Student ID</label>
                  <input 
                    required
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                    placeholder="e.g. IT2024001"
                    value={formData.studentId}
                    onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <input 
                    required
                    type="email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                  <input 
                    required
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Academic Program</label>
                  <input 
                    required
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                    placeholder="e.g. Software Engineering"
                    value={formData.program}
                    onChange={(e) => setFormData({...formData, program: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Semester/Intake</label>
                  <input 
                    required
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                    placeholder="e.g. 2024 June"
                    value={formData.intake}
                    onChange={(e) => setFormData({...formData, intake: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-4 border border-gray-200 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-green-600 text-white rounded-2xl font-bold shadow-lg shadow-green-100 hover:bg-green-700 transition-all"
                >
                  {currentStudent ? 'Update Record' : 'Create Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const EditAttendanceModal = ({ record, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...record });
  const [isSaving, setIsSaving] = useState(false);
  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    setIsSaving(true); 
    try {
      await axios.put(`http://localhost:5000/api/attendance/record/${record._id}`, formData);
      onSave();
      onClose();
    } catch (err) { alert('Save failed'); }
    finally { setIsSaving(false); }
  };
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[110] p-4">
      <div className="bg-white rounded-[2.5rem] max-w-md w-full p-10 animate-scaleIn">
        <h2 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tighter">Edit Record</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Status</label>
            <select className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-bold" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
              <option value="PRESENT">PRESENT</option>
              <option value="ABSENT">ABSENT</option>
            </select>
          </div>
          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold">CANCEL</button>
            <button type="submit" disabled={isSaving} className="flex-1 py-4 bg-green-600 text-white rounded-2xl font-black shadow-xl shadow-green-600/20">{isSaving ? 'SAVING...' : 'SAVE CHANGES'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AttendanceManagement = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showQRModal, setShowQRModal] = useState(false);
  const [activeQR, setActiveQR] = useState(null);
  const [editingRecord, setEditingRecord] = useState(null);
  const [filters, setFilters] = useState({ module: '', lecturer: '', student: '' });
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/attendance/detailed');
      setRecords(res.data);
    } catch (err) {
      console.error('Error fetching attendance:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateQR = async (sessionId) => {
    try {
      const res = await axios.post('http://localhost:5000/api/attendance/generate-qr', { sessionId });
      setActiveQR(res.data.qr);
      setShowQRModal(true);
    } catch (err) {
      alert('QR generation failed');
    }
  };

  const handleDeleteRecord = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await axios.delete(`http://localhost:5000/api/attendance/record/${id}`);
        setRecords(records.filter(r => r._id !== id));
      } catch (err) {
        alert('Delete failed');
      }
    }
  };

  const downloadPerfectReport = async () => {
    setIsDownloading(true);
    try {
      const res = await fetch('http://localhost:5000/api/attendance/student-report');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "student_attendance_eligibility_report.pdf";
      a.click();
    } catch (err) {
      alert('Report generation failed');
    } finally {
      setIsDownloading(false);
    }
  };

  const filteredRecords = records.filter(r => {
    const moduleMatch = !filters.module || (r.sessionId?.moduleName || '').toLowerCase().includes(filters.module.toLowerCase());
    const lecturerMatch = !filters.lecturer || (r.sessionId?.lecturerName || '').toLowerCase().includes(filters.lecturer.toLowerCase());
    const studentMatch = !filters.student || (r.studentId || '').toLowerCase().includes(filters.student.toLowerCase());
    return moduleMatch && lecturerMatch && studentMatch;
  });

  return (
    <div className="p-8 space-y-8 bg-white animate-fadeIn">
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">ATTENDANCE COMMAND CENTER</h2>
          <p className="text-gray-500 font-medium">Monitor, Audit, and Export Academic Eligibility Records</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={downloadPerfectReport}
            disabled={isDownloading}
            className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black flex items-center gap-2 shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
          >
            {isDownloading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <FileText size={20} />}
            MASTER REPORT (PDF)
          </button>
        </div>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: 'Total Records', value: records.length, icon: ClipboardList, color: 'text-blue-600', bg: 'bg-blue-50' },
           { label: 'Avg. Rate', value: '82.4%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
           { label: 'Eligibility Status', value: '78% PASSED', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
           { label: 'Recent Warnings', value: '12', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' }
         ].map((stat, i) => (
           <div key={i} className={`${stat.bg} p-6 rounded-3xl border border-white/10 flex items-center gap-4`}>
              <div className={`p-3 rounded-2xl bg-white shadow-sm ${stat.color}`}><stat.icon size={24} /></div>
              <div>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                 <p className="text-xl font-black text-gray-900">{stat.value}</p>
              </div>
           </div>
         ))}
      </div>

      {/* Advanced Filters removed */}


      {/* Main Records Table */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student Information</th>
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Session Details</th>
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan="4" className="py-20 text-center"><div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div></td></tr>
            ) : filteredRecords.map(r => (
              <tr key={r._id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-black text-xs uppercase shadow-sm">
                      {r.studentId.substring(0, 2)}
                    </div>
                    <div>
                      <p className="font-black text-gray-900 tracking-tight">{r.studentId}</p>
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Registered Student</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="space-y-1">
                    <p className="font-bold text-gray-800 text-sm">{r.sessionId?.moduleName}</p>
                    <div className="flex items-center gap-2 text-gray-400 font-bold text-[10px]">
                       <span className="uppercase tracking-tighter">{r.sessionId?.lecturerName}</span>
                       <span>•</span>
                       <span>{new Date(r.sessionId?.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex justify-center">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${r.status === 'PRESENT' ? 'bg-green-100 text-green-700' : 'bg-rose-100 text-rose-700'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${r.status === 'PRESENT' ? 'bg-green-600' : 'bg-rose-600'}`}></div>
                      {r.status}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6">
                   <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                      <button onClick={() => handleGenerateQR(r.sessionId?._id)} title="Show Session QR" className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"><QrCode size={18}/></button>
                      <button onClick={() => setEditingRecord(r)} title="Edit Record" className="p-2.5 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-600 hover:text-white transition-all shadow-sm"><Edit size={18}/></button>
                      <button onClick={() => handleDeleteRecord(r._id)} title="Delete Record" className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-sm"><Trash2 size={18}/></button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingRecord && (
        <EditAttendanceModal 
          record={editingRecord} 
          onClose={() => setEditingRecord(null)} 
          onSave={fetchRecords} 
        />
      )}

      {/* QR Display Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-[100] p-4">
           <div className="bg-white rounded-[3rem] p-12 max-w-sm w-full text-center space-y-8 animate-scaleIn shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
              <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">SESSION CHECK-IN</h3>
              <div className="bg-gray-50 p-6 rounded-[2.5rem] border-4 border-dashed border-gray-200">
                 <img src={activeQR} alt="QR Code" className="w-full aspect-square object-contain" />
              </div>
              <div className="space-y-2">
                 <p className="text-gray-900 font-black text-sm uppercase tracking-widest">Instruction</p>
                 <p className="text-gray-500 text-xs font-medium">Position the QR code within the mobile scanner frame to mark attendance automatically.</p>
              </div>
              <button onClick={() => setShowQRModal(false)} className="w-full py-5 bg-gray-900 text-white rounded-[1.5rem] font-black tracking-widest hover:bg-black transition-all shadow-xl shadow-gray-200">CLOSE SCANNER</button>
           </div>
        </div>
      )}
    </div>
  );
};

// Settings Management Component
const SettingsManagement = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [refreshing, setRefreshing] = useState(false);
  const [settings, setSettings] = useState({
    siteName: 'UniManage', siteEmail: 'info@unimanage.edu', sitePhone: '+1 (555) 123-4567',
    darkMode: false, emailNotifications: true, smsNotifications: false, autoBackup: true,
    language: 'en', timezone: 'UTC-5', dateFormat: 'MM/DD/YYYY'
  });

  const fetchSettings = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await axios.get('http://localhost:5000/api/settings');
      if (res.data.success && Object.keys(res.data.settings).length > 0) {
        setSettings(prev => ({ ...prev, ...res.data.settings }));
      } else {
        const initRes = await axios.post('http://localhost:5000/api/settings/init');
        if (initRes.data.success) fetchSettings();
      }
    } catch (err) { console.error('Error fetching settings:', err); }
    setRefreshing(false);
  }, []);

  useEffect(() => { 
    fetchSettings(); 
  }, [fetchSettings]);

  const handleSave = async () => {
    try {
      await axios.put('http://localhost:5000/api/settings', settings);
      alert('Settings updated successfully!');
    } catch (err) { alert('Failed to save settings'); }
  };

  const tabs = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'appearance', name: 'Appearance', icon: Monitor },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'language', name: 'Language', icon: Globe },
    { id: 'security', name: 'Security', icon: Shield }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div><h2 className="text-2xl font-bold text-gray-800">Settings Management</h2><p className="text-gray-500 text-sm">Configure system settings globally</p></div>
        <button onClick={fetchSettings} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition">
          <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} /> Refresh Configurations
        </button>
      </div>
      <div className="flex gap-2 border-b border-gray-200 mb-6 overflow-x-auto">
        {tabs.map(tab => { const Icon = tab.icon; return (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 font-medium transition flex items-center gap-2 whitespace-nowrap ${activeTab === tab.id ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}><Icon size={18} /> {tab.name}</button>); })}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Settings size={18}/> General Settings</h3>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Platform Name</label><input type="text" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500" value={settings.siteName} onChange={e => setSettings({...settings, siteName: e.target.value})} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Administrative Email</label><input type="email" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500" value={settings.siteEmail} onChange={e => setSettings({...settings, siteEmail: e.target.value})} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label><input type="tel" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500" value={settings.sitePhone} onChange={e => setSettings({...settings, sitePhone: e.target.value})} /></div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Bell size={18}/> Push Notification Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between"><span>Email Routing Activation</span><button onClick={() => setSettings({...settings, emailNotifications: !settings.emailNotifications})} className={`w-12 h-6 rounded-full transition ${settings.emailNotifications ? 'bg-green-600' : 'bg-gray-300'}`}><div className={`w-5 h-5 rounded-full bg-white transform transition ${settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'}`}></div></button></div>
            <div className="flex items-center justify-between"><span>SMS Triggers</span><button onClick={() => setSettings({...settings, smsNotifications: !settings.smsNotifications})} className={`w-12 h-6 rounded-full transition ${settings.smsNotifications ? 'bg-green-600' : 'bg-gray-300'}`}><div className={`w-5 h-5 rounded-full bg-white transform transition ${settings.smsNotifications ? 'translate-x-6' : 'translate-x-1'}`}></div></button></div>
            <div className="flex items-center justify-between"><span>Database Auto-Backup Sync</span><button onClick={() => setSettings({...settings, autoBackup: !settings.autoBackup})} className={`w-12 h-6 rounded-full transition ${settings.autoBackup ? 'bg-green-600' : 'bg-gray-300'}`}><div className={`w-5 h-5 rounded-full bg-white transform transition ${settings.autoBackup ? 'translate-x-6' : 'translate-x-1'}`}></div></button></div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Monitor size={18}/> Appearance Modifiers</h3>
          <div className="flex items-center justify-between"><span>Force Dark Mode UI</span><button onClick={() => setSettings({...settings, darkMode: !settings.darkMode})} className={`w-12 h-6 rounded-full transition ${settings.darkMode ? 'bg-indigo-600' : 'bg-gray-300'}`}><div className={`w-5 h-5 rounded-full bg-white transform transition ${settings.darkMode ? 'translate-x-6' : 'translate-x-1'}`}></div></button></div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Globe size={18}/> Regional Formatting</h3>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Global Dialect</label><select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500" value={settings.language} onChange={e => setSettings({...settings, language: e.target.value})}><option value="en">English (US)</option><option value="es">Spanish</option><option value="fr">French</option><option value="de">German</option></select></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Platform Time Zone</label><select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500" value={settings.timezone} onChange={e => setSettings({...settings, timezone: e.target.value})}><option value="UTC-5">Eastern Time (UTC-5)</option><option value="UTC-8">Pacific Time (UTC-8)</option><option value="UTC+0">GMT (UTC+0)</option></select></div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button onClick={handleSave} className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition flex items-center gap-2 shadow-lg">
          <CheckCircle size={20} /> Save All Configurations
        </button>
      </div>
    </div>
  );
};

// Edit User Modal
const EditUserModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...user });
  const [isSaving, setIsSaving] = useState(false);
  const handleSubmit = async (e) => { e.preventDefault(); setIsSaving(true); await onSave(formData); setIsSaving(false); };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold">Edit User</h2><button onClick={onClose}><X size={20} /></button></div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label>Full Name</label><input type="text" className="w-full px-3 py-2 border rounded-lg" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} /></div>
          <div><label>Email</label><input type="email" className="w-full px-3 py-2 border rounded-lg" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} /></div>
          <div><label>Phone</label><input type="tel" className="w-full px-3 py-2 border rounded-lg" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} /></div>
          <div><label>Role</label><select className="w-full px-3 py-2 border rounded-lg" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}><option value="student">Student</option><option value="admin">Admin</option></select></div>
          <div className="flex gap-3 pt-4"><button type="button" onClick={onClose} className="flex-1 px-4 py-2 border rounded-lg">Cancel</button><button type="submit" disabled={isSaving} className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg">{isSaving ? 'Saving...' : 'Save Changes'}</button></div>
        </form>
      </div>
    </div>
  );
};

// FAQ Management Component
const FaqManagement = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentFaq, setCurrentFaq] = useState({ question: '', answer: '', category: 'General' });

  const fetchFaqs = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/faqs');
      if (res.data.success) setFaqs(res.data.faqs);
    } catch (err) { console.error(err); }
    setLoading(false);
  }, []);

  useEffect(() => { fetchFaqs(); }, [fetchFaqs]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentFaq._id) {
        await axios.put(`http://localhost:5000/api/faqs/${currentFaq._id}`, currentFaq);
      } else {
        await axios.post('http://localhost:5000/api/faqs', currentFaq);
      }
      setShowModal(false);
      setCurrentFaq({ question: '', answer: '', category: 'General' });
      fetchFaqs();
    } catch (err) { alert('Failed to save FAQ'); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this FAQ?')) {
      try {
        await axios.delete(`http://localhost:5000/api/faqs/${id}`);
        fetchFaqs();
      } catch (err) { alert('Failed to delete'); }
    }
  };

  if (loading) return <div className="p-6 flex justify-center"><RefreshCw className="animate-spin text-green-600" size={32} /></div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div><h2 className="text-2xl font-bold text-gray-800">FAQ Management</h2><p className="text-gray-500 text-sm">Create and update help resources for students</p></div>
        <button onClick={() => { setCurrentFaq({ question: '', answer: '', category: 'General' }); setShowModal(true); }} className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-green-700 transition shadow-lg shadow-green-100">
          <Plus size={20} /> New FAQ Item
        </button>
      </div>

      <div className="grid gap-4">
        {faqs.map(f => (
          <div key={f._id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-start group hover:border-green-200 transition-all">
            <div className="space-y-2">
              <span className="px-2 py-1 bg-green-50 text-green-700 text-[10px] font-black uppercase rounded-lg">{f.category}</span>
              <h3 className="font-bold text-gray-800">{f.question}</h3>
              <p className="text-gray-500 text-sm">{f.answer}</p>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => { setCurrentFaq(f); setShowModal(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"><Edit size={18}/></button>
              <button onClick={() => handleDelete(f._id)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition"><Trash2 size={18}/></button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2.5rem] max-w-2xl w-full p-10 shadow-2xl animate-scaleIn">
            <h2 className="text-2xl font-black text-gray-900 mb-8">{currentFaq._id ? 'Edit FAQ Item' : 'Create New FAQ'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                <select className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm" value={currentFaq.category} onChange={e => setCurrentFaq({...currentFaq, category: e.target.value})}>
                  <option value="General">General</option>
                  <option value="Attendance">Attendance</option>
                  <option value="Exams">Exams</option>
                  <option value="Technical">Technical</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Question</label>
                <input className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm" value={currentFaq.question} onChange={e => setCurrentFaq({...currentFaq, question: e.target.value})} required placeholder="Enter question..." />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Answer</label>
                <textarea rows="4" className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm" value={currentFaq.answer} onChange={e => setCurrentFaq({...currentFaq, answer: e.target.value})} required placeholder="Enter answer..." />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold">CANCEL</button>
                <button type="submit" className="flex-1 py-4 bg-green-600 text-white rounded-2xl font-black shadow-xl shadow-green-600/20">SAVE FAQ</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Admin Console Main Component
const RatingsManagement = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/feedback');
        if (res.data.success) setFeedbacks(res.data.feedbacks);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchFeedbacks();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500 animate-pulse font-black uppercase tracking-widest">Loading Ratings...</div>;

  return (
    <div className="p-8 space-y-8 animate-fadeIn">
      <div>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">RATINGS & FEEDBACK</h2>
        <p className="text-gray-500 font-medium">Monitor Academic Performance and Student Sentiment</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbacks.map(f => (
          <div key={f._id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl hover:border-green-200 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-green-50 text-green-700 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                {f.moduleName}
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < f.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'} />
                ))}
              </div>
            </div>
            <p className="text-gray-700 font-medium italic mb-6">"{f.comment}"</p>
            <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
              <div>
                <p className="text-xs font-black text-gray-900 uppercase tracking-tighter">{f.lecturerName}</p>
                <p className="text-[10px] text-gray-400 font-bold">{f.studentId}</p>
              </div>
              <div className="text-[10px] text-gray-400 font-black uppercase">
                {new Date(f.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminConsole = () => {
  const [activeManagement, setActiveManagement] = useState(null);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [attendanceTrend, setAttendanceTrend] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, statsRes, trendRes] = await Promise.all([
          axios.get('http://localhost:5000/api/auth/users'),
          axios.get('http://localhost:5000/api/dashboard/stats'),
          axios.get('http://localhost:5000/api/attendance/analytics/trend')
        ]);
        
        if (usersRes.data.success) setUsers(usersRes.data.users);
        if (statsRes.data.success) setStats(statsRes.data.stats);
        setAttendanceTrend(trendRes.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const managementModules = [
    { id: 'attendance', title: 'Attendance Management', icon: BarChart3, description: 'Track and manage student attendance', color: 'bg-emerald-600', stats: { value: 'Live', label: 'Monitoring' }, path: '/attendance' },
    { id: 'faq', title: 'FAQ & Ratings', icon: HelpCircle, description: 'View and manage user feedback', color: 'bg-indigo-600', stats: { value: '92%', label: 'Positive' }, path: '/feedback' },
    { id: 'enrollment', title: 'Enrollment Management', icon: Users, description: 'Review student applications', color: 'bg-blue-600', stats: { value: stats.pending?.toString() || '0', label: 'Pending' }, requiredPassword: null },
    { id: 'course', title: 'Course Management', icon: BookOpen, description: 'Manage academic courses', color: 'bg-green-600', stats: { value: stats.courses?.toString() || '0', label: 'Courses' }, requiredPassword: null },
    { id: 'requirements', title: 'Requirements Management', icon: ClipboardList, description: 'Manage admission requirements', color: 'bg-purple-600', stats: { value: stats.requirements?.toString() || '0', label: 'Required' }, requiredPassword: null },
    { id: 'contact', title: 'Contact & Support', icon: Headphones, description: 'Manage support tickets', color: 'bg-fuchsia-600', stats: { value: stats.openTickets?.toString() || '0', label: 'Open' }, requiredPassword: null },
    { id: 'event', title: 'Event Management', icon: Calendar, description: 'Manage university events', color: 'bg-orange-500', stats: { value: stats.events?.toString() || '0', label: 'Events' }, requiredPassword: null },
    { id: 'user', title: 'User Management', icon: UserCheck, description: 'Manage users', color: 'bg-yellow-500', stats: { value: stats.users?.toString() || '0', label: 'Users' }, requiredPassword: 'sehara123' },
    { id: 'student', title: 'Student Management', icon: GraduationCap, description: 'Manage students', color: 'bg-rose-500', stats: { value: stats.students?.toString() || '0', label: 'Students' }, requiredPassword: null },
    { id: 'settings', title: 'Settings Management', icon: Settings, description: 'Configure system settings', color: 'bg-gray-800', stats: { value: '12', label: 'Settings' }, requiredPassword: 'admin123' },

  ];

  const handleCardClick = (module) => { 
    if (module.requiredPassword) {
      setPendingAction(module); 
      setShowPasswordModal(true); 
    } else if (module.path) {
      navigate(module.path);
    } else {
      setActiveManagement(module.id);
    }
  };
  const handlePasswordSuccess = () => { if (pendingAction) { setActiveManagement(pendingAction.id); } };
  const handleEditUser = (user) => { setEditingUser(user); setShowEditModal(true); };
  const handleUpdateUser = async (formData) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/auth/users/${formData._id}`, formData);
      if (res.data.success) {
        alert('User updated successfully!');
        setUsers(users.map(u => u._id === formData._id ? res.data.user : u));
        setShowEditModal(false);
      }
    } catch (error) {
      alert('Failed to update user');
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const res = await axios.delete(`http://localhost:5000/api/auth/users/${id}`);
        if (res.data.success) {
          alert('User deleted successfully!');
          setUsers(users.filter(u => u._id !== id));
        }
      } catch (error) {
        alert('Failed to delete user');
      }
    }
  };

  const renderManagementContent = () => {
    switch (activeManagement) {
      case 'attendance': return <AttendanceManagement />;
      case 'reports': return <Reports />;
      case 'faq': return <FaqManagement />;
      case 'ratings': return <RatingsManagement />;
      case 'enrollment': return <EnrollmentManagement />;
      case 'finance': return <FinanceManagement />;
      case 'course': return <CourseManagement />;
      case 'requirements': return <RequirementsManagement />;
      case 'contact': return <ContactSupportManagement />;
      case 'event': return <EventManagement />;
      case 'user': return <UserManagement users={users} loading={loading} onEdit={handleEditUser} onDelete={handleDeleteUser} />;
      case 'student': return <StudentManagement />;
      case 'settings': return <SettingsManagement />;
      default: return null;
    }
  };

  const getManagementTitle = () => { const module = managementModules.find(m => m.id === activeManagement); return module ? module.title : ''; };

  if (activeManagement) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 text-white flex-shrink-0 flex flex-col fixed h-full z-40 shadow-2xl">
           <div className="p-8 border-b border-white/10 flex items-center gap-3">
              <GraduationCap className="text-green-500" size={28} />
              <span className="font-black tracking-tighter text-xl">ADMIN<span className="text-green-500">PANEL</span></span>
           </div>
           <div className="flex-1 py-6 space-y-1 overflow-y-auto px-4">
              {managementModules.map(m => (
                 <button 
                  key={m.id}
                  onClick={() => m.path ? navigate(m.path) : setActiveManagement(m.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeManagement === m.id ? 'bg-green-600 text-white shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                 >
                    <m.icon size={18} /> {m.title}
                 </button>
              ))}
           </div>
           <div className="p-4 border-t border-white/10">
              <button onClick={() => setActiveManagement(null)} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-400 hover:bg-white/5 hover:text-white transition-all">
                 <ArrowLeft size={18} /> Exit Module
              </button>
           </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 ml-64 p-8">
           <div className="bg-white rounded-3xl shadow-xl overflow-hidden min-h-[calc(100vh-64px)] border border-gray-100">
              <div className="p-8 border-b border-gray-50 bg-gray-50/30 flex justify-between items-center">
                 <h1 className="text-3xl font-black text-gray-900 tracking-tight">{getManagementTitle()}</h1>
                 <div className="flex gap-3">
                    <button className="bg-white text-gray-700 px-4 py-2 rounded-xl border border-gray-200 font-bold text-xs flex items-center gap-2"><Printer size={16}/> Print Report</button>
                    <button onClick={() => navigate('/')} className="bg-rose-50 text-rose-600 px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-rose-100 transition-all"><LogOut size={16}/> Log out</button>
                 </div>
              </div>
              <div className="p-2">
                 {renderManagementContent()}
              </div>
           </div>
        </div>
        {showEditModal && editingUser && <EditUserModal user={editingUser} onClose={() => { setShowEditModal(false); setEditingUser(null); }} onSave={handleUpdateUser} />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {showPasswordModal && pendingAction && (
        <PasswordModal 
          title={pendingAction.title} 
          onClose={() => { setShowPasswordModal(false); setPendingAction(null); }} 
          onSuccess={handlePasswordSuccess} 
          expectedPassword={pendingAction.requiredPassword} 
        />
      )}
      
      {/* Premium Gradient Header */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-28 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] -mr-40 -mt-40"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] -ml-20 -mb-20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-black text-green-100 uppercase tracking-[0.2em]">System Status: Operational</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="p-5 bg-gradient-to-br from-green-500 to-emerald-700 rounded-[2rem] shadow-2xl shadow-green-500/20">
                  <LayoutDashboard className="text-white" size={48} />
                </div>
                <div>
                  <h1 className="text-5xl font-black text-white tracking-tighter">
                    Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Console</span>
                  </h1>
                  <p className="text-gray-400 font-medium mt-2 text-lg">Managing the future of education, one student at a time.</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center gap-3 backdrop-blur-md">
                <Printer size={20} className="text-gray-400" /> Print Summary
              </button>
              <button 
                onClick={() => navigate('/')} 
                className="px-8 py-4 bg-gradient-to-r from-rose-500 to-red-600 text-white rounded-2xl font-bold hover:shadow-2xl hover:shadow-rose-500/30 transition-all flex items-center gap-3 active:scale-95"
              >
                <LogOut size={20} /> Terminate Session
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* High Priority Navigation Bar */}
      <div className="bg-white border-b border-gray-100 py-4 sticky top-[4.5rem] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex gap-4">
            {managementModules.filter(m => m.highPriority).map(m => (
              <button 
                key={m.id}
                onClick={() => setActiveManagement(m.id)}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${activeManagement === m.id ? 'bg-green-600 text-white shadow-lg shadow-green-100' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
              >
                <m.icon size={16} /> {m.title.split(' ')[0]}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            LATEST UPDATES ACTIVE
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {managementModules.map(module => (
            <div key={module.id} className="transition-all duration-300">
              <ManagementCard 
                icon={module.icon} 
                title={module.title} 
                description={module.description} 
                color={module.color} 
                stats={module.stats} 
                onClick={() => handleCardClick(module)} 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Quick Insights Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-gray-200/50 border border-white relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 relative z-10">
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">Quick <span className="text-green-600">Insights</span></h2>
              <p className="text-gray-500 font-medium">Real-time system performance and enrollment metrics</p>
            </div>
            <div className="flex gap-2">
              <span className="px-4 py-2 bg-green-50 text-green-700 rounded-xl text-xs font-bold uppercase tracking-widest border border-green-100 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div> Live Sync
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
            {/* Attendance Trend Chart */}
            <div className="lg:col-span-2 bg-gray-50/50 rounded-3xl p-8 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                  <TrendingUp className="text-green-600" size={20} /> Attendance Volatility
                </h3>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Last 7 Sessions</span>
              </div>
              <div className="h-[300px] w-full">
                <Line 
                  data={{
                    labels: attendanceTrend.map(t => t.date),
                    datasets: [{
                      label: 'Presence Rate %',
                      data: attendanceTrend.map(t => ((t.present / t.total) * 100).toFixed(0)),
                      borderColor: '#16a34a',
                      backgroundColor: 'rgba(22, 163, 74, 0.1)',
                      tension: 0.4,
                      fill: true,
                      pointBackgroundColor: '#16a34a',
                      pointBorderColor: '#fff',
                      pointBorderWidth: 2,
                      pointRadius: 4
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                      y: { beginAtZero: true, max: 100, ticks: { callback: v => v + '%' } },
                      x: { grid: { display: false } }
                    }
                  }}
                />
              </div>
            </div>

            {/* Recent Activity Log */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm overflow-hidden">
               <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2"><Clock className="text-blue-600" size={20}/> Recent Activity</h3>
                  <span className="text-[10px] font-black text-blue-600 uppercase">Live Feed</span>
               </div>
               <div className="space-y-6">
                  {users.slice(0, 4).map((u, i) => (
                    <div key={i} className="flex gap-4 items-start group">
                       <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                          <UserCheck size={18}/>
                       </div>
                       <div className="flex-1 border-b border-gray-50 pb-4">
                          <p className="text-sm font-bold text-gray-800">New User Registered</p>
                          <p className="text-xs text-gray-500 font-medium">{u.fullName} joined as {u.role}</p>
                          <p className="text-[10px] text-gray-300 font-bold mt-1">JUST NOW</p>
                       </div>
                    </div>
                  ))}
                  {stats.openTickets > 0 && (
                    <div className="flex gap-4 items-start group">
                       <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                          <AlertCircle size={18}/>
                       </div>
                       <div className="flex-1">
                          <p className="text-sm font-bold text-gray-800">Pending Support Tickets</p>
                          <p className="text-xs text-gray-500 font-medium">There are {stats.openTickets} tickets awaiting response</p>
                          <p className="text-[10px] text-amber-600 font-bold mt-1">ACTION REQUIRED</p>
                       </div>
                    </div>
                  )}
               </div>
            </div>
          </div>

          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-green-500/5 rounded-full blur-[100px]"></div>
        </div>
      </div>

      {/* Modern Footer Statistics */}
      <div className="bg-white border-t border-gray-100 py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-black text-gray-900 tracking-tighter">95%</div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Satisfaction Score</div>
              <div className="w-10 h-1 bg-green-500 mx-auto rounded-full"></div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-black text-gray-900 tracking-tighter">50+</div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Programs</div>
              <div className="w-10 h-1 bg-blue-500 mx-auto rounded-full"></div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-black text-gray-900 tracking-tighter">{users.length}</div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Registered Users</div>
              <div className="w-10 h-1 bg-emerald-500 mx-auto rounded-full"></div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-black text-gray-900 tracking-tighter">24/7</div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Uptime Monitoring</div>
              <div className="w-10 h-1 bg-rose-500 mx-auto rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Finance Management Component
const FinanceManagement = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const fetchPayments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/payments');
      if (res.data.success) setPayments(res.data.payments);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchPayments(); }, []);

  const filtered = payments.filter(p => 
    p.studentId.toLowerCase().includes(filter.toLowerCase()) || 
    p.transactionId.toLowerCase().includes(filter.toLowerCase())
  );

  const totalRevenue = payments.reduce((acc, curr) => acc + curr.amount, 0);
  const avgTransaction = payments.length > 0 ? (totalRevenue / payments.length).toFixed(2) : 0;

  return (
    <div className="p-6 bg-white animate-fadeIn">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-8">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Financial Intelligence</h2>
          <p className="text-gray-500 text-sm font-medium">Monitoring $ (USD) platform liquidity and student fee reconciliation</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-gray-50 px-8 py-4 rounded-[2rem] border border-gray-100">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Avg. Ticket</p>
              <p className="text-2xl font-black text-gray-900">${avgTransaction}</p>
           </div>
           <div className="bg-green-600 px-8 py-4 rounded-[2rem] shadow-xl shadow-green-100">
              <p className="text-[10px] font-black text-green-100 uppercase tracking-widest mb-1">Total Liquidity</p>
              <p className="text-2xl font-black text-white">${totalRevenue.toLocaleString()}</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
         <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg"><CreditCard size={24}/></div>
            <div><p className="text-xs font-bold text-blue-600 uppercase">Card Volume</p><p className="text-xl font-black text-blue-900">{payments.filter(p => p.paymentMethod === 'card').length} TXNs</p></div>
         </div>
         <div className="bg-indigo-50 p-6 rounded-[2rem] border border-indigo-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg"><Globe size={24}/></div>
            <div><p className="text-xs font-bold text-indigo-600 uppercase">PayPal Integration</p><p className="text-xl font-black text-indigo-900">{payments.filter(p => p.paymentMethod === 'paypal').length} TXNs</p></div>
         </div>
         <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg"><TrendingUp size={24}/></div>
            <div><p className="text-xs font-bold text-emerald-600 uppercase">Success Rate</p><p className="text-xl font-black text-emerald-900">100.0%</p></div>
         </div>
      </div>

      {/* Finance search removed */}


      <div className="overflow-x-auto rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50">
        <table className="w-full text-left">
          <thead className="bg-gray-900 text-white">
            <tr className="text-[10px] font-black uppercase tracking-[0.2em]">
              <th className="px-8 py-6 rounded-tl-[2.5rem]">Reference Hash</th>
              <th className="px-8 py-6">Payer Identity</th>
              <th className="px-8 py-6">Allocation</th>
              <th className="px-8 py-6">Fiat Amount</th>
              <th className="px-8 py-6">Temporal Stamp</th>
              <th className="px-8 py-6 text-right rounded-tr-[2.5rem]">Execution</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan="6" className="py-20 text-center"><div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div></td></tr>
            ) : filtered.map(p => (
              <tr key={p._id} className="hover:bg-green-50/30 transition-all group">
                <td className="px-8 py-6 font-mono font-bold text-xs text-blue-600">{p.transactionId}</td>
                <td className="px-8 py-6">
                  <div className="flex flex-col">
                    <span className="font-black text-gray-800 text-sm tracking-tight">{p.studentName}</span>
                    <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest">{p.studentId}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-bold text-gray-600">{p.courseName}</span>
                   </div>
                </td>
                <td className="px-8 py-6 font-black text-gray-900 text-lg">${p.amount}</td>
                <td className="px-8 py-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest">{new Date(p.date).toLocaleString()}</td>
                <td className="px-8 py-6 text-right">
                  <span className="px-4 py-1.5 bg-green-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-green-100">SETTLED</span>
                </td>
              </tr>
            ))}
            {!loading && filtered.length === 0 && (
              <tr><td colSpan="6" className="py-32 text-center">
                <div className="flex flex-col items-center gap-4">
                   <div className="p-6 bg-gray-50 rounded-full text-gray-300"><Search size={48}/></div>
                   <p className="text-gray-400 font-bold italic">No financial artifacts matching your query found in the ledger.</p>
                </div>
              </td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminConsole;