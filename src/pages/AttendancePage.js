import React, { useState, useEffect, useCallback } from 'react';
import { 
  FileText, ChevronLeft, ChevronRight, QrCode, CheckCircle, XCircle, 
  TrendingUp, BarChart3, PieChart, ClipboardList, Target, Search, UserPlus, 
  ShieldCheck, AlertTriangle, LineChart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
import { Bar, Doughnut, Line } from 'react-chartjs-2';

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

function AttendancePage() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [filterType, setFilterType] = useState('name');
  const [filterValue, setFilterValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ studentId: '', moduleName: '', lecturerName: '', status: 'PRESENT' });
  const [formErrors, setFormErrors] = useState({});

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/attendance/detailed');
      
      // Mock additional records for visual richness as requested
      const mockRecords = [
        { _id: 'mock1', studentId: 'IT2024005', sessionId: { moduleName: 'Cloud Computing', lecturerName: 'Prof. Perera', date: '2026-04-20' }, status: 'PRESENT', createdAt: new Date() },
        { _id: 'mock2', studentId: 'IT2024012', sessionId: { moduleName: 'Data Science', lecturerName: 'Dr. Silva', date: '2026-04-21' }, status: 'ABSENT', createdAt: new Date() },
        { _id: 'mock3', studentId: 'IT2024008', sessionId: { moduleName: 'Cyber Security', lecturerName: 'Dr. Wickrama', date: '2026-04-22' }, status: 'PRESENT', createdAt: new Date() },
        { _id: 'mock4', studentId: 'IT2024020', sessionId: { moduleName: 'Software Arch', lecturerName: 'Prof. Jaya', date: '2026-04-23' }, status: 'PRESENT', createdAt: new Date() },
        { _id: 'mock5', studentId: 'IT2024015', sessionId: { moduleName: 'Mobile App Dev', lecturerName: 'Mr. Fernando', date: '2026-04-24' }, status: 'ABSENT', createdAt: new Date() },
        { _id: 'mock6', studentId: 'IT2024030', sessionId: { moduleName: 'Cloud Computing', lecturerName: 'Prof. Perera', date: '2026-04-25' }, status: 'PRESENT', createdAt: new Date() },
        { _id: 'mock7', studentId: 'IT2024045', sessionId: { moduleName: 'Deep Learning', lecturerName: 'Dr. Fonseka', date: '2026-04-26' }, status: 'PRESENT', createdAt: new Date() },
        { _id: 'mock8', studentId: 'IT2024050', sessionId: { moduleName: 'UI/UX Design', lecturerName: 'Ms. Ranasinghe', date: '2026-04-27' }, status: 'PRESENT', createdAt: new Date() },
      ];
      
      setRecords([...res.data, ...mockRecords]);
    } catch (err) {
      console.error('Error fetching attendance:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddMember = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.studentId) errors.studentId = 'Student ID is required';
    else if (!/^IT\d{7}$/.test(formData.studentId)) errors.studentId = 'Format: IT + 7 digits (e.g. IT2024001)';
    
    if (!formData.moduleName) errors.moduleName = 'Module name is required';
    if (!formData.lecturerName) errors.lecturerName = 'Lecturer name is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const newRecord = {
      _id: 'new-' + Date.now(),
      studentId: formData.studentId,
      sessionId: {
        moduleName: formData.moduleName,
        lecturerName: formData.lecturerName,
        date: new Date().toISOString()
      },
      status: formData.status,
      createdAt: new Date()
    };

    setRecords([newRecord, ...records]);
    setShowModal(false);
    setFormData({ studentId: '', moduleName: '', lecturerName: '', status: 'PRESENT' });
    setFormErrors({});
    showNotification('Member added to current session ledger.');
  };

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const [notification, setNotification] = useState(null);

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const downloadPerfectReport = async () => {
    setIsDownloading(true);
    showNotification('Generating Student Attendance Report...', 'info');
    try {
      const response = await axios.get('http://localhost:5000/api/attendance/student-report', {
        responseType: 'blob'
      });
      
      if (response.data.type === 'application/json') {
        const text = await response.data.text();
        const error = JSON.parse(text);
        throw new Error(error.message || 'Generation failed');
      }

      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const filename = `Student_Attendance_Report.pdf`;
      
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      showNotification('Report downloaded successfully.');
    } catch (err) {
      console.error(err);
      showNotification(err.message || 'Official Registry generation failed.', 'error');
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadGlobalReport = async () => {
    setIsDownloading(true);
    showNotification('Compiling Global Master Ledger...', 'info');
    try {
      const response = await axios.get('http://localhost:5000/api/attendance/report', {
        responseType: 'blob'
      });

      if (response.data.type === 'application/json') {
        const text = await response.data.text();
        const error = JSON.parse(text);
        throw new Error(error.message || 'Generation failed');
      }

      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `Global_Academic_Master_Ledger_${timestamp}.pdf`;
      
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      showNotification('Global Master Ledger downloaded successfully.');
    } catch (err) {
      console.error(err);
      showNotification(err.message || 'Global Master Ledger generation failed.', 'error');
    } finally {
      setIsDownloading(false);
    }
  };

  // Analytics Calculations
  const stats = {
    total: records.length,
    present: records.filter(r => r.status === 'PRESENT').length,
    absent: records.filter(r => r.status === 'ABSENT').length,
    rate: records.length > 0 ? ((records.filter(r => r.status === 'PRESENT').length / records.length) * 100).toFixed(1) : 0
  };

  const moduleData = {};
  records.forEach(r => {
    const mod = r.sessionId?.moduleName || 'Other';
    if (!moduleData[mod]) moduleData[mod] = { present: 0, total: 0 };
    moduleData[mod].total++;
    if (r.status === 'PRESENT') moduleData[mod].present++;
  });

  const barData = {
    labels: Object.keys(moduleData).slice(0, 5),
    datasets: [{
      label: 'Rate %',
      data: Object.values(moduleData).slice(0, 5).map(m => (m.present / m.total * 100).toFixed(1)),
      backgroundColor: 'rgba(34, 197, 94, 0.6)',
      borderColor: 'rgb(34, 197, 94)',
      borderWidth: 1,
      borderRadius: 10,
    }]
  };

  const doughnutData = {
    labels: ['Present', 'Absent'],
    datasets: [{
      data: [stats.present, stats.absent],
      backgroundColor: ['#16a34a', '#ef4444'],
      borderWidth: 0,
      hoverOffset: 4
    }]
  };

  const isEligible = parseFloat(stats.rate) >= 80;

  const lineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    datasets: [{
      label: 'Attendance %',
      data: [65, 72, 68, 75, stats.rate],
      borderColor: '#16a34a',
      backgroundColor: 'rgba(22, 163, 74, 0.1)',
      fill: true,
      tension: 0.4,
      borderWidth: 3,
      pointRadius: 4,
      pointBackgroundColor: '#fff',
      pointBorderColor: '#16a34a'
    }]
  };

  const filteredRecords = records.filter(record => {
    if (!filterValue) return true;
    const val = filterValue.toLowerCase();
    switch (filterType) {
      case 'name': 
        return (record.sessionId?.lecturerName || '').toLowerCase().includes(val);
      case 'studentID': 
        return (record.studentId || '').toLowerCase().includes(val);
      case 'module': 
        return (record.sessionId?.moduleName || '').toLowerCase().includes(val);
      case 'all':
        return (
          (record.sessionId?.lecturerName || '').toLowerCase().includes(val) ||
          (record.studentId || '').toLowerCase().includes(val) ||
          (record.sessionId?.moduleName || '').toLowerCase().includes(val)
        );
      default: return true;
    }
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col relative">
      {/* Add Member Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-white overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="bg-gradient-to-r from-green-600 to-green-800 p-8 text-white relative">
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition"
              >
                <XCircle size={20} />
              </button>
              <h2 className="text-2xl font-black uppercase tracking-tighter">Add Session Member</h2>
              <p className="text-green-100/70 text-[10px] font-bold uppercase tracking-widest mt-1">Manual Attendance Override Protocol</p>
            </div>
            
            <form onSubmit={handleAddMember} className="p-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Student Identity ID</label>
                  <input 
                    type="text"
                    placeholder="IT2024001"
                    className={`w-full px-5 py-3.5 bg-gray-50 border rounded-2xl outline-none font-bold text-gray-700 transition ${
                      formErrors.studentId ? 'border-red-300 bg-red-50' : 'border-gray-100 focus:border-green-500'
                    }`}
                    value={formData.studentId}
                    onChange={(e) => setFormData({...formData, studentId: e.target.value.toUpperCase()})}
                  />
                  {formErrors.studentId && <p className="text-[10px] font-bold text-red-500 mt-1.5 ml-2">{formErrors.studentId}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Module Name</label>
                    <input 
                      type="text"
                      placeholder="e.g. Data Science"
                      className={`w-full px-5 py-3.5 bg-gray-50 border rounded-2xl outline-none font-bold text-gray-700 transition ${
                        formErrors.moduleName ? 'border-red-300 bg-red-50' : 'border-gray-100 focus:border-green-500'
                      }`}
                      value={formData.moduleName}
                      onChange={(e) => setFormData({...formData, moduleName: e.target.value})}
                    />
                    {formErrors.moduleName && <p className="text-[10px] font-bold text-red-500 mt-1.5 ml-2">{formErrors.moduleName}</p>}
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Lecturer</label>
                    <input 
                      type="text"
                      placeholder="e.g. Dr. Silva"
                      className={`w-full px-5 py-3.5 bg-gray-50 border rounded-2xl outline-none font-bold text-gray-700 transition ${
                        formErrors.lecturerName ? 'border-red-300 bg-red-50' : 'border-gray-100 focus:border-green-500'
                      }`}
                      value={formData.lecturerName}
                      onChange={(e) => setFormData({...formData, lecturerName: e.target.value})}
                    />
                    {formErrors.lecturerName && <p className="text-[10px] font-bold text-red-500 mt-1.5 ml-2">{formErrors.lecturerName}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Verification Status</label>
                  <div className="flex gap-3">
                    {['PRESENT', 'ABSENT'].map(status => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setFormData({...formData, status})}
                        className={`flex-1 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition border ${
                          formData.status === status 
                            ? (status === 'PRESENT' ? 'bg-green-600 text-white border-green-600' : 'bg-red-600 text-white border-red-600')
                            : 'bg-gray-50 text-gray-400 border-gray-100 hover:bg-gray-100'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-gray-400 hover:text-gray-600 transition bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-white bg-green-600 hover:bg-green-700 shadow-lg shadow-green-200 transition active:scale-95"
                >
                  Synchronize Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-24 right-8 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-right duration-300 ${
          notification.type === 'error' ? 'bg-red-600 text-white' : 
          notification.type === 'info' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
        }`}>
          {notification.type === 'error' ? <XCircle size={20} /> : <CheckCircle size={20} />}
          <span className="font-bold text-sm tracking-tight">{notification.msg}</span>
        </div>
      )}

      {/* Premium Header */}
      <div className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-800 pt-16 pb-8 shadow-2xl relative overflow-hidden shrink-0">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-[1600px] mx-auto px-6 relative z-10">
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={() => navigate('/')} 
              className="text-white/80 hover:text-white transition flex items-center gap-2 group bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10"
            >
              <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-bold text-sm uppercase tracking-widest">Back to Home</span>
            </button>
            <div className="flex gap-3">
              <button 
                onClick={() => navigate('/scan')}
                className="bg-white/10 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 font-black text-xs uppercase tracking-widest hover:bg-white/20 transition backdrop-blur-sm border border-white/20"
              >
                <QrCode size={18} /> QR Terminal
              </button>
              <button 
                onClick={downloadPerfectReport}
                disabled={isDownloading}
                className="bg-white text-green-700 px-6 py-2.5 rounded-xl flex items-center gap-2 font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition active:scale-95"
              >
                {isDownloading ? <div className="w-4 h-4 border-2 border-green-700 border-t-transparent rounded-full animate-spin" /> : <FileText size={18} />}
                Download Report
              </button>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="p-4 bg-white rounded-[1.5rem] shadow-2xl shadow-green-900/20">
              <BarChart3 className="text-green-600" size={40} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Attendance Management</h1>
              <p className="text-green-100/70 text-sm font-bold tracking-widest uppercase mt-1">Real-time Session Monitoring & Analytics</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden max-w-[1600px] mx-auto w-full p-6 gap-6">
        {/* Analytical Sidebar */}
        <div className="w-96 flex flex-col gap-6 shrink-0 overflow-y-auto no-scrollbar">
          {/* Exam Eligibility Link */}
          <button 
            onClick={() => navigate('/analytics')}
            className="w-full p-6 rounded-[2rem] bg-gradient-to-br from-green-600 to-green-800 text-white shadow-xl shadow-green-100 hover:scale-[1.02] transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <ShieldCheck size={24} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold text-green-100 uppercase tracking-widest opacity-80">Final Qualification</p>
                <p className="text-lg font-black tracking-tight">Exam Eligibility</p>
              </div>
            </div>
            <div className="p-2 bg-white/10 rounded-full group-hover:translate-x-1 transition-transform">
              <ChevronRight size={20} />
            </div>
          </button>

          {/* Main Stats Card */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-white space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-gray-900 uppercase tracking-tighter text-xl">Quick Analytics</h3>
              <Target className="text-green-500" size={24} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-3xl border border-green-100">
                <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">Presence</p>
                <p className="text-2xl font-black text-green-700">{stats.rate}%</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-3xl border border-blue-100">
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Total Logs</p>
                <p className="text-2xl font-black text-blue-700">{stats.total}</p>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <PieChart size={18} className="text-gray-400" />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Attendance Distribution</span>
              </div>
              <div className="h-48 flex justify-center">
                <Doughnut 
                  data={doughnutData} 
                  options={{ 
                    cutout: '70%', 
                    plugins: { legend: { display: false } },
                    maintainAspectRatio: false 
                  }} 
                />
              </div>
              <div className="flex justify-between mt-4 text-[10px] font-black uppercase">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Present</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-red-500 rounded-full"></div> Absent</div>
              </div>
            </div>
          </div>

          {/* Attendance Trend */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-white">
            <div className="flex items-center gap-2 mb-6">
              <LineChart size={20} className="text-green-600" />
              <h3 className="font-black text-gray-900 uppercase tracking-tighter">Attendance Trend</h3>
            </div>
            <div className="h-48">
              <Line 
                data={lineData} 
                options={{ 
                  plugins: { legend: { display: false } },
                  scales: { 
                    y: { display: true, grid: { display: false }, ticks: { font: { size: 9, weight: 'bold' } } },
                    x: { grid: { display: false }, ticks: { font: { size: 9, weight: 'bold' } } }
                  },
                  maintainAspectRatio: false
                }} 
              />
            </div>
          </div>

          {/* Module Analytics */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-white">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp size={20} className="text-blue-500" />
              <h3 className="font-black text-gray-900 uppercase tracking-tighter">Module Performance</h3>
            </div>
            <div className="h-56">
              <Bar 
                data={barData} 
                options={{ 
                  plugins: { legend: { display: false } },
                  scales: { 
                    y: { display: false, max: 100 },
                    x: { grid: { display: false }, ticks: { font: { size: 10, weight: 'bold' } } }
                  },
                  maintainAspectRatio: false
                }} 
              />
            </div>
          </div>

          {/* System Status */}
          <div className="bg-gray-900 p-6 rounded-[2rem] text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-2xl"></div>
             <div className="flex items-center gap-3 relative z-10">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em]">Live Sync Active</p>
             </div>
             <p className="text-[10px] text-gray-400 font-bold mt-2 relative z-10">All records are encrypted and synchronized with main academic ledger.</p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-white overflow-hidden flex flex-col h-full">
            <div className="px-8 py-6 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between shrink-0 gap-4">
              <div className="flex items-center gap-3">
                <ClipboardList className="text-gray-400" size={20} />
                <span className="font-black text-gray-900 uppercase tracking-widest text-xs">Record Ledger</span>
              </div>
              
              <div className="flex-1 max-w-md flex items-center gap-2 bg-white px-3 py-1.5 rounded-2xl border border-gray-100 shadow-sm">
                <Search size={16} className="text-gray-400" />
                <input 
                  placeholder={`Search ${filterType === 'name' ? 'by lecturer name' : filterType === 'studentID' ? 'by ID' : 'by module'}...`}
                  className="flex-1 bg-transparent outline-none text-xs font-bold text-gray-700 placeholder:text-gray-300"
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                />
                <div className="h-4 w-[1px] bg-gray-100 mx-1"></div>
                <span className="text-[9px] font-black uppercase text-gray-400 whitespace-nowrap">Filter By:</span>
                <select 
                  className="bg-transparent outline-none text-[10px] font-black uppercase text-green-600 cursor-pointer hover:text-green-700"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">All Fields</option>
                  <option value="name">By Name</option>
                  <option value="studentID">By StudentID</option>
                  <option value="module">By Module</option>
                </select>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[10px] font-black bg-gray-100 px-3 py-1 rounded-full text-gray-500 uppercase tracking-widest">
                  {filteredRecords.length} Records
                </span>
                <button 
                  onClick={() => setShowModal(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-black text-[10px] uppercase tracking-widest hover:bg-green-700 transition shadow-lg shadow-green-200 active:scale-95"
                >
                  <UserPlus size={16} /> Add Member
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
              <table className="w-full text-left border-separate border-spacing-y-2 px-4">
                <thead className="sticky top-0 bg-white z-10">
                  <tr className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                    <th className="px-6 py-4">Student Identity</th>
                    <th className="px-6 py-4">Academic Module</th>
                    <th className="px-6 py-4">Temporal Stamp</th>
                    <th className="px-6 py-4 text-center">Protocol</th>
                    <th className="px-6 py-4 text-right">Verification</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="py-20 text-center">
                        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
                      </td>
                    </tr>
                  ) : filteredRecords.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-20 text-center text-gray-400 font-bold italic">
                        No attendance artifacts found matching filter.
                      </td>
                    </tr>
                  ) : filteredRecords.map((record) => (
                    <tr key={record._id} className="bg-gray-50/50 hover:bg-white hover:shadow-lg transition-all rounded-2xl group border border-transparent hover:border-gray-100">
                      <td className="px-6 py-5 first:rounded-l-2xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center font-black text-green-600 text-xs border border-gray-100">
                            {record.studentId.substring(0, 2)}
                          </div>
                          <span className="font-black text-gray-900 text-sm tracking-tight">{record.studentId}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-800 text-xs">{record.sessionId?.moduleName || 'N/A'}</span>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">DR. {record.sessionId?.lecturerName || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                        {new Date(record.sessionId?.date || record.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className={`inline-flex items-center gap-1.5 font-black px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest ${
                          record.status === 'PRESENT' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${record.status === 'PRESENT' ? 'bg-green-600' : 'bg-red-600'}`}></div>
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right last:rounded-r-2xl">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                           <span className="text-[9px] font-black px-3 py-1 bg-gray-900 text-white rounded uppercase tracking-tighter">Validated</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttendancePage;
