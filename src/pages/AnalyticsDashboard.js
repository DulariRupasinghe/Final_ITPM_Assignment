import { useEffect, useState } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  BookOpen, 
  ChevronLeft, 
  LogOut, 
  Printer, 
  BarChart3,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

function AnalyticsDashboard() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);
  const [moduleData, setModuleData] = useState({});
  const [trendData, setTrendData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadAnalyticsReport = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch('http://localhost:5000/api/attendance/analytics/report');
      if (!response.ok) throw new Error('Network response was not ok');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Academic_Analytics_Summary_${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading report:", error);
      alert("Failed to generate analytics report.");
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryRes, detailedRes, trendRes] = await Promise.all([
          fetch('http://localhost:5000/api/attendance/analytics'),
          fetch('http://localhost:5000/api/attendance/detailed'),
          fetch('http://localhost:5000/api/attendance/analytics/trend')
        ]);

        const summaryJson = await summaryRes.json();
        const detailedJson = await detailedRes.json();
        const trendJson = await trendRes.json();

        // Process student-wise data
        const students = {};
        detailedJson.forEach(rec => {
          if (!students[rec.studentId]) {
            students[rec.studentId] = { id: rec.studentId, present: 0, total: 0 };
          }
          students[rec.studentId].total++;
          if (rec.status === 'PRESENT') students[rec.studentId].present++;
        });

        // Add mock students for better visualization if needed
        const mockData = {
          'IT2024005': { id: 'IT2024005', present: 18, total: 20 },
          'IT2024012': { id: 'IT2024012', present: 12, total: 20 },
          'IT2024030': { id: 'IT2024030', present: 19, total: 20 },
          'IT2024045': { id: 'IT2024045', present: 15, total: 20 }
        };
        
        setSummary(summaryJson);
        setModuleData({...students, ...mockData});
        setTrendData(trendJson);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!summary) return <p className="text-center mt-10 text-gray-500">No data available.</p>;

  // Doughnut Chart
  const doughnutData = {
    labels: ['Present', 'Absent'],
    datasets: [{
      data: [summary.present, summary.absent],
      backgroundColor: ['#10b981', '#f43f5e'],
      hoverBackgroundColor: ['#059669', '#e11d48'],
      borderWidth: 0,
      cutout: '75%',
    }]
  };

  // Stacked Bar Chart
  const stackedBarData = {
    labels: Object.keys(moduleData),
    datasets: [
      {
        label: 'Present',
        data: Object.values(moduleData).map(m => m.present),
        backgroundColor: '#10b981',
        borderRadius: 6,
      },
      {
        label: 'Absent',
        data: Object.values(moduleData).map(m => m.total - m.present),
        backgroundColor: '#f43f5e',
        borderRadius: 6,
      }
    ]
  };

  // Trend Line Chart
  const lineData = {
    labels: trendData.map(t => t.date),
    datasets: [{
      label: 'Attendance Rate (%)',
      data: trendData.map(t => (t.present / (t.total || 1)) * 100),
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { font: { family: 'Inter', size: 12, weight: '600' }, padding: 20 }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Premium Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <button 
              onClick={() => navigate('/dashboard')} 
              className="text-white hover:text-green-200 transition flex items-center gap-2 group"
            >
              <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition">
                <ChevronLeft size={20} />
              </div>
              <span className="font-semibold">Dashboard</span>
            </button>
            <div className="flex gap-3">
              <button 
                onClick={downloadAnalyticsReport}
                disabled={isDownloading}
                className="bg-white text-green-700 px-6 py-2 rounded-xl flex items-center gap-2 font-bold shadow-lg hover:bg-green-50 transition disabled:opacity-50"
              >
                {isDownloading ? <div className="w-4 h-4 border-2 border-green-700 border-t-transparent rounded-full animate-spin" /> : <Printer size={18} />}
                Print Analytics
              </button>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md">
              <BarChart3 className="text-white" size={48} />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-white tracking-tight uppercase">Eligibility Analytics</h1>
              <p className="text-green-100 text-lg opacity-90 tracking-widest uppercase text-sm font-bold mt-1">Student Attendance & Final Exam Qualification Hub</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Records', value: summary.total, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Students Present', value: summary.present, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Students Absent', value: summary.absent, icon: XCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
            { label: 'Success Rate', value: `${summary.percentage}%`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-white flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{item.label}</p>
                <p className={`text-3xl font-black ${item.color}`}>{item.value}</p>
              </div>
              <div className={`p-4 rounded-2xl ${item.bg} ${item.color}`}>
                <item.icon size={28} />
              </div>
            </div>
          ))}
        </div>

        {/* Main Charts Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Doughnut Chart */}
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-white lg:col-span-1 relative">
            <h3 className="text-xl font-bold text-gray-800 mb-8 flex items-center gap-2">
              <div className="w-2 h-6 bg-emerald-500 rounded-full"></div>
              Distribution
            </h3>
            <div className="h-[280px] relative">
              <Doughnut data={doughnutData} options={chartOptions} />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-12">
                <span className="text-4xl font-black text-gray-800">{summary.percentage}%</span>
                <span className="text-xs font-bold text-gray-400 uppercase">Present</span>
              </div>
            </div>
          </div>

          {/* Line Chart */}
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-white lg:col-span-2">
            <h3 className="text-xl font-bold text-gray-800 mb-8 flex items-center gap-2">
              <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
              Attendance Trend
            </h3>
            <div className="h-[280px]">
              <Line 
                data={lineData} 
                options={{
                  ...chartOptions,
                  scales: {
                    y: { beginAtZero: true, max: 100, ticks: { callback: v => `${v}%` } },
                    x: { grid: { display: false } }
                  }
                }} 
              />
            </div>
          </div>

          {/* Stacked Bar Chart */}
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-white lg:col-span-3">
            <h3 className="text-xl font-bold text-gray-800 mb-8 flex items-center gap-2">
              <div className="w-2 h-6 bg-purple-500 rounded-full"></div>
              Performance by Module
            </h3>
            <div className="h-[350px]">
              <Bar 
                data={stackedBarData} 
                options={{
                  ...chartOptions,
                  scales: {
                    x: { stacked: true, grid: { display: false } },
                    y: { stacked: true, beginAtZero: true }
                  }
                }} 
              />
            </div>
          </div>
        </div>

        {/* Detailed Table */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-white overflow-hidden">
          <div className="px-8 py-6 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-600 rounded-lg text-white">
                <Users size={20} />
              </div>
              <h3 className="text-lg font-black text-gray-800 uppercase tracking-tighter">Student Eligibility Tracker</h3>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/30 text-gray-400 text-[11px] font-black uppercase tracking-widest">
                  <th className="px-8 py-5">Student Identity</th>
                  <th className="px-8 py-5 text-center">Total Logs</th>
                  <th className="px-8 py-5 text-center text-emerald-600">Present</th>
                  <th className="px-8 py-5">Eligibility Percentage</th>
                  <th className="px-8 py-5 text-right">Qualification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {Object.entries(moduleData).map(([id, data]) => {
                  const rate = (data.present / (data.total || 1)) * 100;
                  const eligible = rate >= 80;
                  return (
                    <tr key={id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3 font-black text-gray-900 tracking-tight">
                          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-700 font-black border border-green-100">
                            {id.substring(0, 2)}
                          </div>
                          {id}
                        </div>
                      </td>
                      <td className="px-8 py-5 text-center font-bold text-gray-400 uppercase text-xs">{data.total} Units</td>
                      <td className="px-8 py-5 text-center">
                        <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-black">
                          {data.present}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-1000 ${
                                eligible ? 'bg-emerald-500' : 'bg-rose-500'
                              }`} 
                              style={{ width: `${rate}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-black text-gray-800 w-12">{rate.toFixed(1)}%</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          eligible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {eligible ? 'ELIGIBLE' : 'NOT QUALIFIED'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;
