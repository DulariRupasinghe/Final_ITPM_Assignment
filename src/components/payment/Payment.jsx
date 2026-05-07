import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  CreditCard,
  Shield,
  CheckCircle,
  ArrowLeft,
  AlertCircle,
  Lock,
  Calendar,
  User,
  Mail,
  Phone,
  DollarSign,
  Download,
  Printer
} from 'lucide-react';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state?.course;
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    
    if (paymentMethod === 'card') {
      if (!formData.cardNumber) tempErrors.cardNumber = 'Card number is required';
      else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) 
        tempErrors.cardNumber = 'Invalid card number';
      
      if (!formData.cardName) tempErrors.cardName = 'Name on card is required';
      
      if (!formData.expiryDate) tempErrors.expiryDate = 'Expiry date is required';
      else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) 
        tempErrors.expiryDate = 'Invalid expiry date (MM/YY)';
      
      if (!formData.cvv) tempErrors.cvv = 'CVV is required';
      else if (!/^\d{3,4}$/.test(formData.cvv)) 
        tempErrors.cvv = 'Invalid CVV';
    }
    
    if (!formData.email) tempErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Email is invalid';
    
    if (!formData.phone) tempErrors.phone = 'Phone number is required';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const payload = {
          studentId: user?.studentId || user?._id || 'GUEST',
          studentName: user?.fullName || formData.cardName,
          email: formData.email,
          courseName: course.name,
          amount: course.fee + 50,
          paymentMethod: paymentMethod
        };
        
        const res = await axios.post('http://localhost:5000/api/payments', payload);
        if (res.data.success) {
          setTransactionId(res.data.transactionId);
          setPaymentSuccess(true);
        }
      } catch (err) {
        alert('Payment processing failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };


  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({ ...prev, cardNumber: formatted }));
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\//g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setFormData(prev => ({ ...prev, expiryDate: value }));
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your application fee has been paid successfully. You will receive a confirmation email shortly.
          </p>
          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-800">Transaction ID: {transactionId}</p>
            <p className="text-sm text-green-800 mt-1">Amount Paid: ${course ? course.fee + 50 : 50}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/')}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Back to Home
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 border border-green-600 text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-50 transition"
            >
              <Printer size={16} className="inline mr-1" />
              Print Receipt
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <AlertCircle className="text-yellow-500 mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Course Selected</h2>
          <p className="text-gray-600 mb-6">Please select a course before proceeding to payment.</p>
          <button
            onClick={() => navigate('/programs')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Browse Programs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-green-600 transition flex items-center gap-2 mb-6"
        >
          <ArrowLeft size={20} />
          Back to Course Details
        </button>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>
              <div className="space-y-3 pb-4 border-b border-gray-100">
                <div className="flex justify-between">
                  <span className="text-gray-600">{course.name}</span>
                  <span className="font-medium">${course.fee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Application Fee</span>
                  <span className="font-medium">$50</span>
                </div>
              </div>
              <div className="flex justify-between pt-4 font-bold text-gray-800">
                <span>Total</span>
                <span className="text-green-600">${course.fee + 50}</span>
              </div>
              <div className="mt-4 bg-green-50 rounded-lg p-3">
                <p className="text-xs text-green-800 flex items-center gap-1">
                  <Shield size={12} />
                  Secure payment encrypted
                </p>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Details</h2>
              
              {/* Payment Method Tabs */}
              <div className="flex gap-4 mb-6 border-b border-gray-200">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`pb-2 px-4 font-medium transition ${
                    paymentMethod === 'card'
                      ? 'border-b-2 border-green-600 text-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <CreditCard size={16} className="inline mr-2" />
                  Credit/Debit Card
                </button>
                <button
                  onClick={() => setPaymentMethod('paypal')}
                  className={`pb-2 px-4 font-medium transition ${
                    paymentMethod === 'paypal'
                      ? 'border-b-2 border-green-600 text-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  PayPal
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number *
                      </label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="1234 5678 9012 3456"
                          className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                            errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                          }`}
                          maxLength="19"
                        />
                      </div>
                      {errors.cardNumber && (
                        <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                          errors.cardName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.cardName && (
                        <p className="mt-1 text-sm text-red-500">{errors.cardName}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleExpiryChange}
                          placeholder="MM/YY"
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                            errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                          }`}
                          maxLength="5"
                        />
                        {errors.expiryDate && (
                          <p className="mt-1 text-sm text-red-500">{errors.expiryDate}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV *
                        </label>
                        <input
                          type="password"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          placeholder="123"
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                            errors.cvv ? 'border-red-500' : 'border-gray-300'
                          }`}
                          maxLength="4"
                        />
                        {errors.cvv && (
                          <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'paypal' && (
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <img 
                      src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" 
                      alt="PayPal" 
                      className="mx-auto mb-4"
                    />
                    <p className="text-gray-600 mb-4">
                      You will be redirected to PayPal to complete your payment securely.
                    </p>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-4">Contact Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="student@example.com"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 234 567 8900"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock size={18} />
                      Pay ${course.fee + 50} Securely
                    </>
                  )}
                </button>
                
                <p className="text-xs text-gray-500 text-center mt-4">
                  By proceeding, you agree to our Terms of Service and Privacy Policy.
                  Your payment is secure and encrypted.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;