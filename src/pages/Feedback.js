import { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  Star, 
  Send, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  User, 
  BookOpen, 
  CheckCircle,
  ArrowLeft,
  Users,
  RefreshCw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Feedback() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    studentId: '',
    lecturerName: '',
    moduleName: '',
    rating: 5,
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [modules, setModules] = useState([]);
  const lecturers = [
    "Dr. Malith Perera", "Prof. Riana Silva", "Dr. Dulari Gamage", "Mr. Sehara Fonseka", "Mrs. Nelum Kumari"
  ];

  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [faqsRes, modulesRes] = await Promise.all([
          axios.get('http://localhost:5000/api/faqs'),
          axios.get('http://localhost:5000/api/courses')
        ]);
        if (faqsRes.data.success) setFaqs(faqsRes.data.faqs);
        if (modulesRes.data.success) setModules(modulesRes.data.courses);
      } catch (err) { console.error("Failed to fetch data", err); }
    };
    fetchData();
  }, []);


  const submit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!form.studentId.match(/^[A-Z]{2,}\d{4,}$/i)) {
      alert("Invalid Student ID format. Should be like IT2024001");
      return;
    }
    if (!form.moduleName) { alert("Please select a module."); return; }
    if (!form.lecturerName) { alert("Please select a lecturer."); return; }
    if (form.comment.length < 10) {
      alert("Please provide a more detailed comment (at least 10 characters).");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post('http://localhost:5000/api/feedback', form);
      alert("Thank you! Your feedback has been recorded.");
      setForm({ studentId: '', lecturerName: '', moduleName: '', rating: 5, comment: '' });
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Premium Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => navigate('/')} 
            className="text-white/80 hover:text-white transition flex items-center gap-2 mb-6"
          >
            <ArrowLeft size={20} /> Back to Home
          </button>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
              <MessageCircle className="text-white" size={40} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">FAQ & Ratings</h1>
              <p className="text-green-100 text-lg">We value your feedback and are here to help</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: FAQ & History */}
          <div className="space-y-8">
            {/* FAQ Section */}
            <div>
              <div className="flex items-center gap-3 pb-4 border-b mb-6">
                <HelpCircle className="text-green-600" size={28} />
                <h2 className="text-2xl font-bold text-gray-800">Frequently Asked Questions</h2>
              </div>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md"
                  >
                    <button 
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left"
                    >
                      <span className="font-semibold text-gray-800">{faq.question}</span>
                      {expandedFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    {expandedFaq === index && (
                      <div className="px-6 pb-4 text-gray-600 animate-fadeIn">
                        <p className="pt-2 border-t border-gray-50">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback History Section */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
               <div className="flex items-center gap-3 mb-6">
                 <MessageCircle className="text-blue-600" size={24} />
                 <h2 className="text-xl font-bold text-gray-800">My Feedback History</h2>
               </div>
               <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                 {modules.length > 0 ? (
                   // Mock history if real history API is missing, or fetch it
                   <div className="text-center py-10">
                     <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                        <RefreshCw size={32} className="animate-spin" />
                     </div>
                     <p className="text-gray-500 font-medium">Syncing your feedback history...</p>
                   </div>
                 ) : (
                   <p className="text-gray-400 italic text-sm">No feedback submitted yet.</p>
                 )}
               </div>
            </div>

            <div className="bg-green-600 rounded-3xl p-8 text-white shadow-xl shadow-green-200">
              <h3 className="text-xl font-bold mb-2">Need more help?</h3>
              <p className="text-green-100 mb-6 text-sm">Our support team is available 24/7 to assist you with any academic or technical queries.</p>
              <button 
                onClick={() => navigate('/contact')}
                className="bg-white text-green-700 px-6 py-3 rounded-xl font-bold hover:bg-green-50 transition-all flex items-center gap-2"
              >
                Contact Support <Send size={18} />
              </button>
            </div>
          </div>

          {/* Right Column: Feedback Form Section */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 h-fit sticky top-28">
            <div className="flex items-center gap-3 mb-8">
              <Star className="text-yellow-500 fill-yellow-500" size={28} />
              <h2 className="text-2xl font-bold text-gray-800">Rate Your Experience</h2>
            </div>

            <form onSubmit={submit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Student ID</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="e.g. STU12345"
                      value={form.studentId}
                      onChange={(e) => setForm({...form, studentId: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Module Name</label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <select 
                      required
                      className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 appearance-none bg-white transition-all"
                      value={form.moduleName}
                      onChange={(e) => setForm({...form, moduleName: e.target.value})}
                    >
                      <option value="">Select Module</option>
                      {Array.isArray(modules) && modules.map(m => <option key={m._id} value={m.name}>{m.name}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Lecturer Name</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <select 
                    required
                    className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 appearance-none bg-white transition-all"
                    value={form.lecturerName}
                    onChange={(e) => setForm({...form, lecturerName: e.target.value})}
                  >
                    <option value="">Select Lecturer</option>
                    {lecturers.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-4">How would you rate this module?</label>
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setForm({...form, rating: star})}
                      className={`p-2 transition-all transform hover:scale-110 ${form.rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                    >
                      <Star fill={form.rating >= star ? "currentColor" : "none"} size={32} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Your Comments</label>
                <textarea 
                  required
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Tell us about your experience..."
                  value={form.comment}
                  onChange={(e) => setForm({...form, comment: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
                  isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 active:scale-95'
                }`}
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>Submit Feedback <CheckCircle size={20} /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
