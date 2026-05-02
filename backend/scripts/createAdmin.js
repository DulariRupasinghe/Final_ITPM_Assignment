const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const connectDB = require('../config/db');

dotenv.config();
connectDB();

const createAdmin = async () => {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (adminExists) {
      console.log('✅ Admin user already exists:');
      console.log(`   Username: ${adminExists.username}`);
      console.log(`   Email: ${adminExists.email}`);
      process.exit();
    }
    
    // Create admin user
    const admin = await User.create({
      fullName: 'Admin User',
      email: 'admin@unimanage.edu',
      username: 'admin',
      password: 'admin123',
      role: 'admin',
      phone: '+1 (555) 123-4567',
      address: 'Admin Office',
      city: 'Admin City',
      country: 'Admin Country'
    });
    
    console.log('✅ Admin user created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 Admin Credentials:');
    console.log(`   👤 Username: admin`);
    console.log(`   🔑 Password: admin123`);
    console.log(`   📧 Email: admin@unimanage.edu`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('⚠️  Please save these credentials!');
    
    process.exit();
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    process.exit(1);
  }
};

createAdmin();