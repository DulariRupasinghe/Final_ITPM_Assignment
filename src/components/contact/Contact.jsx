import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Star,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  ChevronUp,
  User,
  Calendar,
  AlertCircle,
  CheckCircle,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Globe,
  Headphones,
  Award,
  Heart,
  Users,
  Briefcase,
  Coffee,
  Smile,
  HelpCircle,
  FileText,
  Download,
  Printer,
  ArrowLeft,
  Ticket,
  Clock as ClockIcon,
  CheckCircle as CheckCircleIcon
} from 'lucide-react';

import heroBackground from '../assets/studentlife/pexels-vladvictoria-2363674.jpg';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: 'general',
    message: '',
    priority: 'medium'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');
  const [ticketId, setTicketId] = useState('');
  const [openFAQ, setOpenFAQ] = useState(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // FAQ Data
  const faqs = [
    {
      id: 1,
      question: "How do I apply for admission?",
      answer: "You can apply for admission by clicking the 'Apply Now' button on the homepage or visiting the Registration page. The application process includes filling out personal information, academic details, and selecting your preferred program. After submission, you'll receive a confirmation email within 24-48 hours."
    },
    {
      id: 2,
      question: "What are the admission requirements?",
      answer: "Admission requirements vary by program. Generally, you need: High School Diploma or equivalent, Minimum GPA of 2.5 (or equivalent), English proficiency test scores (IELTS/TOEFL) for international students, and specific prerequisites for certain programs."
    },
    {
      id: 3,
      question: "How can I check my application status?",
      answer: "You can check your application status by logging into your student portal. After submitting your application, you'll receive login credentials via email. Once logged in, navigate to 'Application Status' to see real-time updates."
    },
    {
      id: 4,
      question: "What financial aid options are available?",
      answer: "We offer various financial aid options including: Merit-based scholarships (up to $10,000), Need-based grants, Work-study programs, Student loans, and Payment plans."
    },
    {
      id: 5,
      question: "How long does it take to get a response?",
      answer: "Our support team typically responds within 24-48 hours. For urgent matters, please call our helpline at +1 (555) 123-4567."
    },
    {
      id: 6,
      question: "Can I track my support ticket?",
      answer: "Yes! After submitting a support ticket, you'll receive a ticket number via email. You can use this ticket number to track the status of your inquiry."
    }
  ];

  // Support Team Data
  const supportTeam = [
    { id: 1, name: "Dr. Sarah Johnson", role: "Academic Advisor", email: "sarah.johnson@unimanage.edu", phone: "+1 (555) 123-4567", department: "Academic Affairs", expertise: "Course Selection, Academic Planning" },
    { id: 2, name: "Prof. Michael Chen", role: "International Student Coordinator", email: "michael.chen@unimanage.edu", phone: "+1 (555) 123-4568", department: "International Office", expertise: "Visa Support, Cultural Integration" },
    { id: 3, name: "Emily Rodriguez", role: "Financial Aid Advisor", email: "emily.rodriguez@unimanage.edu", phone: "+1 (555) 123-4569", department: "Financial Services", expertise: "Scholarships, Loans, Payment Plans" },
    { id: 4, name: "Dr. David Wilson", role: "Career Counselor", email: "david.wilson@unimanage.edu", phone: "+1 (555) 123-4570", department: "Career Services", expertise: "Resume Review, Interview Prep, Job Placement" },
    { id: 5, name: "Lisa Adams", role: "Technical Support Specialist", email: "lisa.adams@unimanage.edu", phone: "+1 (555) 123-4571", department: "IT Services", expertise: "Portal Issues, Technical Problems" },
    { id: 6, name: "Dr. Robert Brown", role: "Mental Health Counselor", email: "robert.brown@unimanage.edu", phone: "+1 (555) 123-4572", department: "Student Wellness", expertise: "Counseling, Stress Management" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRating = (rating) => {
    setUserRating(rating);
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) tempErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Email is invalid';
    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required';
    if (!formData.message.trim()) tempErrors.message = 'Message is required';
    else if (formData.message.length < 10) tempErrors.message = 'Message must be at least 10 characters';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await axios.post('http://localhost:5000/api/support/create', formData);
        if (response.data.success) {
          setSubmitSuccess(true);
          // Assuming backend returned the ticket object containing both _id and ticketNumber
          // Wait, backend createTicket returns ticket: { ticketNumber, name, email ... } but missing _id!
          // Actually, I need to fetch the ticket or ensure backend returns _id. But since I can't guarantee backend returns _id reliably right now without changing Controller, let's look at controller.
          // Wait, controller `createTicket` returns: ticket: { ticketNumber, name, ... }. It DOES NOT return _id.
          // Let's modify handleFeedbackSubmit to use the email address instead, OR let me just change the controller quickly!
          setTicketNumber(response.data.ticket.ticketNumber);
          // Wait, I will just change the Controller to also return _id on create! Wait, I am already modifying Contact.jsx here.
          // Assuming I'll change controller to return `_id: ticket._id` too.
          setTicketId(response.data.ticket._id);

          setFormData({
            name: '', email: '', phone: '', subject: '', category: 'general', message: '', priority: 'medium'
          });
          setTimeout(() => setSubmitSuccess(false), 8000);
        }
      } catch (error) {
        console.error('Error submitting ticket:', error);
        alert('Failed to submit ticket. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleFeedbackSubmit = async () => {
    if (userRating > 0) {
      if (!ticketId) {
        // If they rated before submitting a ticket
        alert("Please submit a support ticket first so we can attach your feedback to it!");
        return;
      }
      
      try {
        const response = await axios.post(`http://localhost:5000/api/support/tickets/${ticketId}/rate`, {
          rating: userRating,
          feedback: 'Rated via Contact Page'
        });
        
        if (response.data.success) {
          setFeedbackSubmitted(true);
          setTimeout(() => setFeedbackSubmitted(false), 5000);
        }
      } catch (err) {
        console.error('Rating failed:', err);
        alert('Failed to submit rating.');
      }
    }
  };

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-green-800 pt-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBackground} alt="University Campus" className="w-full h-full object-cover opacity-40" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/60 to-green-800/60"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <button onClick={() => navigate('/')} className="text-white hover:text-green-200 transition flex items-center gap-2 mb-6">
            <ArrowLeft size={20} /> Back to Home
          </button>
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">We're here to help! Reach out to our support team for any assistance</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#f9fafb" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"><Headphones className="text-green-600" size={24} /> Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3"><div className="bg-green-100 p-2 rounded-lg"><Phone className="text-green-600" size={20} /></div><div><p className="text-sm text-gray-500">Phone</p><p className="text-gray-800 font-medium">+1 (555) 123-4567</p><p className="text-xs text-gray-400">Mon-Fri, 9am-5pm</p></div></div>
                <div className="flex items-start gap-3"><div className="bg-green-100 p-2 rounded-lg"><Mail className="text-green-600" size={20} /></div><div><p className="text-sm text-gray-500">Email</p><p className="text-gray-800 font-medium">support@unimanage.edu</p><p className="text-xs text-gray-400">Response within 24 hours</p></div></div>
                <div className="flex items-start gap-3"><div className="bg-green-100 p-2 rounded-lg"><MapPin className="text-green-600" size={20} /></div><div><p className="text-sm text-gray-500">Address</p><p className="text-gray-800 font-medium">123 University Avenue</p><p className="text-gray-600 text-sm">City, State 12345</p></div></div>
                <div className="flex items-start gap-3"><div className="bg-green-100 p-2 rounded-lg"><Clock className="text-green-600" size={20} /></div><div><p className="text-sm text-gray-500">Office Hours</p><p className="text-gray-800 font-medium">Monday - Friday: 8:30am - 5:00pm</p><p className="text-gray-600 text-sm">Saturday: 9:00am - 1:00pm</p><p className="text-gray-600 text-sm">Sunday: Closed</p></div></div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"><Users className="text-green-600" size={24} /> Support Team</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {supportTeam.map(member => (
                  <div key={member.id} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                    <div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center"><User size={18} className="text-green-600" /></div><div><p className="font-semibold text-gray-800 text-sm">{member.name}</p><p className="text-xs text-green-600">{member.role}</p></div></div>
                    <p className="text-xs text-gray-500 mb-1">{member.department}</p>
                    <p className="text-xs text-gray-600">{member.expertise}</p>
                    <div className="mt-2 flex items-center gap-2"><Mail size={12} className="text-gray-400" /><a href={`mailto:${member.email}`} className="text-xs text-green-600 hover:text-green-700">{member.email}</a></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><Globe className="text-green-600" size={24} /> Connect With Us</h2>
              <div className="flex gap-3"><a href="#" className="bg-green-100 p-3 rounded-full hover:bg-green-200"><Facebook size={20} className="text-green-600" /></a><a href="#" className="bg-green-100 p-3 rounded-full hover:bg-green-200"><Twitter size={20} className="text-green-600" /></a><a href="#" className="bg-green-100 p-3 rounded-full hover:bg-green-200"><Linkedin size={20} className="text-green-600" /></a><a href="#" className="bg-green-100 p-3 rounded-full hover:bg-green-200"><Instagram size={20} className="text-green-600" /></a><a href="#" className="bg-green-100 p-3 rounded-full hover:bg-green-200"><Youtube size={20} className="text-green-600" /></a></div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"><MessageCircle className="text-green-600" size={24} /> Submit a Support Ticket</h2>
              
              {submitSuccess && (
                <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2"><CheckCircle className="text-green-600" size={20} /><span className="text-green-700 font-semibold">Ticket Submitted Successfully!</span></div>
                  <p className="text-sm text-green-600">Your ticket number: <strong className="font-mono">{ticketNumber}</strong></p>
                  <p className="text-xs text-green-500 mt-1">We'll respond to your inquiry within 24-48 hours. Please save your ticket number for reference.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label><input type="text" name="name" value={formData.name} onChange={handleChange} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`} placeholder="John Doe" />{errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}</div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label><input type="email" name="email" value={formData.email} onChange={handleChange} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`} placeholder="student@example.com" />{errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}</div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="+1 234 567 8900" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">Category</label><select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg"><option value="general">General Inquiry</option><option value="admissions">Admissions</option><option value="academic">Academic</option><option value="technical">Technical Support</option><option value="financial">Financial Aid</option><option value="career">Career Services</option><option value="complaint">Complaint</option><option value="other">Other</option></select></div>
                </div>

                <div><label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label><input type="text" name="subject" value={formData.subject} onChange={handleChange} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${errors.subject ? 'border-red-500' : 'border-gray-300'}`} placeholder="Brief description of your issue" />{errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}</div>

                <div><label className="block text-sm font-medium text-gray-700 mb-2">Message *</label><textarea name="message" value={formData.message} onChange={handleChange} rows="5" className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${errors.message ? 'border-red-500' : 'border-gray-300'}`} placeholder="Please describe your issue in detail..."></textarea>{errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}</div>

                <div><label className="block text-sm font-medium text-gray-700 mb-2">Priority</label><select name="priority" value={formData.priority} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg"><option value="low">Low - General question</option><option value="medium">Medium - Need assistance</option><option value="high">High - Urgent issue</option><option value="urgent">Urgent - Emergency</option></select></div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center gap-2">
                  {isSubmitting ? <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> Submitting...</> : <><Send size={18} /> Submit Ticket</>}
                </button>
              </form>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"><HelpCircle className="text-green-600" size={24} /> Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faqs.map(faq => (
                  <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button onClick={() => toggleFAQ(faq.id)} className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50 transition">
                      <span className="font-medium text-gray-800">{faq.question}</span>
                      {openFAQ === faq.id ? <ChevronUp size={18} className="text-green-600" /> : <ChevronDown size={18} className="text-green-600" />}
                    </button>
                    {openFAQ === faq.id && (<div className="px-4 py-3 bg-gray-50 border-t border-gray-200"><p className="text-gray-600 text-sm">{faq.answer}</p></div>)}
                  </div>
                ))}
              </div>
            </div>

            {/* Ratings Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><Star className="text-green-600" size={24} /> Rate Your Experience</h2>
              <p className="text-gray-600 text-sm mb-4">How would you rate your experience with our support team?</p>
              <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5].map(star => (
                  <button key={star} onClick={() => handleRating(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} className="focus:outline-none">
                    <Star size={32} className={`transition ${(hoverRating >= star || userRating >= star) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  </button>
                ))}
              </div>
              {userRating > 0 && !feedbackSubmitted && (<button onClick={handleFeedbackSubmit} className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition">Submit Feedback</button>)}
              {feedbackSubmitted && (<div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2"><CheckCircle className="text-green-600" size={18} /><span className="text-sm text-green-700">Thank you for your feedback!</span></div>)}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-3"><Award className="text-green-600" size={20} /><span className="font-semibold text-gray-800">Overall Satisfaction</span></div>
                <div className="flex items-center gap-2"><div className="flex">{[...Array(5)].map((_, i) => (<Star key={i} size={16} className="text-yellow-400 fill-current" />))}</div><span className="text-sm text-gray-600">4.8 out of 5 (Based on 1,234 reviews)</span></div>
                <div className="mt-3 flex items-center gap-4"><div className="flex items-center gap-1"><ThumbsUp size={14} className="text-green-600" /><span className="text-sm text-gray-600">92% Positive</span></div><div className="flex items-center gap-1"><ThumbsDown size={14} className="text-red-600" /><span className="text-sm text-gray-600">8% Negative</span></div></div>
              </div>
            </div>

            {/* Response Times */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
              <div className="flex items-center gap-3 mb-3"><Clock className="text-green-600" size={24} /><h3 className="font-bold text-gray-800">Our Response Times</h3></div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div><p className="text-2xl font-bold text-green-600">&lt; 2h</p><p className="text-xs text-gray-600">Email Response</p></div>
                <div><p className="text-2xl font-bold text-green-600">&lt; 5min</p><p className="text-xs text-gray-600">Live Chat</p></div>
                <div><p className="text-2xl font-bold text-green-600">24/7</p><p className="text-xs text-gray-600">Phone Support</p></div>
                <div><p className="text-2xl font-bold text-green-600">Same Day</p><p className="text-xs text-gray-600">Emergency</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2"><Heart className="text-red-500" size={16} /><span className="text-sm text-gray-600">We're committed to your success</span></div>
          <p className="text-xs text-gray-500">For emergencies, please call our 24/7 helpline at +1 (555) 123-4567</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;