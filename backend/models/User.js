const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  studentId: {
    type: String,
    unique: true,
    sparse: true, // Only for students
  },
  // Personal Information
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  dateOfBirth: String,
  gender: String,
  nationality: String,
  profileImage: String,

  // Address Information
  address: String,
  city: String,
  state: String,
  zipCode: String,
  country: String,

  // Academic Information
  program: String,
  intake: String,
  previousEducation: String,
  institution: String,
  graduationYear: String,
  gpa: String,

  // Account Information
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false,
  },
  emergencyContact: String,
  emergencyPhone: String,
  howDidYouHear: String,

  // Rich Student Data
  enrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  achievements: [{
    title: String,
    year: String,
    description: String
  }],
  academicYear: String,
  currentSemester: String,

  role: {
    type: String,
    enum: ['admin', 'student', 'faculty', 'applicant'],
    default: 'applicant',
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);