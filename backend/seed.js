const mongoose = require('mongoose');
const User = require('./models/User');
const Course = require('./models/Course');
const Session = require('./models/Session');
const Attendance = require('./models/Attendance');
const Faq = require('./models/Faq');
const Feedback = require('./models/Feedback');

const mongoURI = 'mongodb://127.0.0.1:27017/university_management';

const seed = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB for schema-compliant seeding...');

    await Promise.all([
      User.deleteMany({}), 
      Course.deleteMany({}), 
      Session.deleteMany({}), 
      Attendance.deleteMany({}), 
      Faq.deleteMany({}), 
      Feedback.deleteMany({})
    ]);

    // Create Admin & Student with ALL required fields
    await User.create({ 
      fullName: 'System Admin', 
      email: 'admin@university.edu', 
      username: 'admin',
      phone: '0712345678',
      password: 'password123', 
      role: 'admin' 
    });
    
    await User.create({ 
      fullName: 'John Doe', 
      email: 'john@student.edu', 
      username: 'johndoe',
      phone: '0771234567',
      password: 'password123', 
      role: 'student', 
      studentId: 'IT2024001', 
      program: 'B.Sc. in Software Engineering' 
    });

    // Create Courses (Modules) with ALL required fields
    const courses = await Course.create([
      { 
        name: 'Software Architecture', 
        code: 'SE301', 
        category: 'technology', 
        degree: 'B.Sc.', 
        duration: '4 Years', 
        description: 'Advanced software design patterns and architecture.',
        fee: 8000
      },
      { 
        name: 'Data Science', 
        code: 'DS201', 
        category: 'science', 
        degree: 'B.Sc.', 
        duration: '4 Years', 
        description: 'Introduction to data analysis and machine learning.',
        fee: 7500
      }
    ]);

    // Create Sessions
    const sessions = await Session.create([
      { moduleName: 'Software Architecture', moduleCode: 'SE301', lecturerName: 'Dr. Malith Perera', date: new Date(Date.now() - 86400000 * 2) },
      { moduleName: 'Data Science', moduleCode: 'DS201', lecturerName: 'Prof. Riana Silva', date: new Date(Date.now() - 86400000 * 1) }
    ]);

    // Create Attendance Records
    await Attendance.create([
      { studentId: 'IT2024001', sessionId: sessions[0]._id, status: 'PRESENT' },
      { studentId: 'IT2024001', sessionId: sessions[1]._id, status: 'ABSENT' }
    ]);

    // Create FAQs
    await Faq.create([
      { question: 'How do I mark my attendance?', answer: 'Scan the QR code displayed at the beginning of each lecture session.', category: 'Attendance' },
      { question: 'What is the minimum attendance requirement?', answer: 'You must maintain at least 80% attendance to be eligible for final examinations.', category: 'Attendance' }
    ]);

    // Create Feedbacks
    await Feedback.create([
      { studentId: 'IT2024001', lecturerName: 'Dr. Malith Perera', moduleName: 'Software Architecture', rating: 5, comment: 'Excellent explanations and very engaging sessions!' },
      { studentId: 'IT2024001', lecturerName: 'Prof. Riana Silva', moduleName: 'Data Science', rating: 4, comment: 'Very deep technical content, slightly fast-paced.' }
    ]);

    console.log('Schema-Compliant Database Seeding Complete!');
    process.exit();
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seed();
