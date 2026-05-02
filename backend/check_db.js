const mongoose = require('mongoose');
const Course = require('./models/Course');

const mongoURI = 'mongodb://127.0.0.1:27017/student-management';

const check = async () => {
  try {
    await mongoose.connect(mongoURI);
    const count = await Course.countDocuments();
    const courses = await Course.find();
    console.log('Course Count:', count);
    console.log('Courses:', JSON.stringify(courses, null, 2));
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

check();
