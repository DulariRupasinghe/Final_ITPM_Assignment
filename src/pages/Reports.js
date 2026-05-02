import { useState } from "react";
import { 
  FileText, 
  Download, 
  Filter, 
  Search, 
  ChevronRight, 
  Users, 
  LayoutDashboard, 
  LogOut, 
  Printer, 
  ChevronLeft 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Reports() {
  const navigate = useNavigate();
  const [moduleName, setModuleName] = useState("");
  const [lecturerName, setLecturerName] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloadingFull, setIsDownloadingFull] = useState(false);

  const downloadReport = async () => {
    setIsDownloading(true);
    try {
      const params = new URLSearchParams();
      if (moduleName) params.append("moduleName", moduleName);
      if (lecturerName) params.append("lecturerName", lecturerName);

      const res = await fetch(
        `http://localhost:5000/api/attendance/report?${params.toString()}`
      );

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `attendance_report_${moduleName || 'all'}.pdf`;
      a.click();
    } catch (error) {
      console.error("Download error:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadAll = async () => {
    setIsDownloadingFull(true);
    try {
      const res = await fetch(
        'http://localhost:5000/api/attendance/student-report'
      );

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = "complete_system_report.pdf";
      a.click();
    } catch (error) {
      console.error("Full report download error:", error);
    } finally {
      setIsDownloadingFull(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard-style Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 pt-20 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => navigate('/dashboard')} 
              className="text-white hover:text-green-200 transition flex items-center gap-2"
            >
              <ChevronLeft size={24} /> Back to Dashboard
            </button>
            <div className="flex gap-3">
              <button className="bg-white/10 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white/20 transition">
                <Printer size={18} /> Print View
              </button>
              <button 
                onClick={() => navigate('/')} 
                className="bg-white/10 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white/20 transition"
              >
                <LogOut size={18} /> Home
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-6">
            <FileText className="text-white" size={40} />
            <div>
              <h1 className="text-3xl font-bold text-white">Attendance Reports</h1>
              <p className="text-green-100">Generate and export system-wide attendance data</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Filtered Report Section */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 pb-4 border-b">
                <Filter className="text-green-600" size={24} />
                <h3 className="text-xl font-bold text-gray-800">Custom Filtered Reports</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Module Name</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Search by module..."
                      value={moduleName}
                      onChange={(e) => setModuleName(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Lecturer Name</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Search by lecturer..."
                      value={lecturerName}
                      onChange={(e) => setLecturerName(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={downloadReport}
                disabled={isDownloading}
                className={`w-full flex items-center justify-center py-4 rounded-xl font-bold text-white transition-all shadow-md active:scale-95 ${
                  isDownloading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 hover:shadow-lg'
                }`}
              >
                {isDownloading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                ) : (
                  <Download className="mr-2" size={20} />
                )}
                {isDownloading ? 'Generating PDF...' : 'Download Filtered Report'}
              </button>
            </div>

            {/* Full Report Section */}
            <div className="bg-gray-50 rounded-2xl p-8 flex flex-col justify-between border border-gray-100">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <LayoutDashboard className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Master System Report</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Generate a comprehensive report containing all recorded attendance across all sessions, modules, and lecturers. This is recommended for end-of-semester audits.
                </p>
                <div className="space-y-3">
                  {['All Active Modules', 'Student Eligibility Status', 'Lecturer Overviews', 'Global Statistics'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={downloadAll}
                disabled={isDownloadingFull}
                className={`mt-10 w-full flex items-center justify-center py-4 rounded-xl font-bold text-white transition-all shadow-md active:scale-95 ${
                  isDownloadingFull ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
                }`}
              >
                {isDownloadingFull ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                ) : (
                  <Download className="mr-2" size={20} />
                )}
                {isDownloadingFull ? 'Processing Master Report...' : 'Download Full System Report'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
