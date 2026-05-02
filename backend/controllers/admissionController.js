const Application = require('../models/Application');
const User = require('../models/User');

const nodemailer = require('nodemailer');

const submitApplication = async (req, res) => {
  try {
    const { fullName, email, phone, dateOfBirth, gender, program } = req.body;
    
    let olResultSheetUrl = '';
    let alResultSheetUrl = '';

    if (req.files) {
      if (req.files.olResultSheet) {
        olResultSheetUrl = `/uploads/${req.files.olResultSheet[0].filename}`;
      }
      if (req.files.alResultSheet) {
        alResultSheetUrl = `/uploads/${req.files.alResultSheet[0].filename}`;
      }
    }

    const application = await Application.create({
      fullName,
      email,
      phone,
      dateOfBirth,
      gender,
      program,
      olResultSheetUrl,
      alResultSheetUrl
    });
    
    res.status(201).json({ success: true, application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getApplications = async (req, res) => {
  try {
    // Fetch all applications
    const applications = await Application.find().sort({ applicationDate: -1 });
    res.json({ success: true, count: applications.length, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    res.json({ success: true, application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    application.status = status;
    
    // Automatically turn applicant into student if accepted!
    if (status === 'accepted') {
      let existingUser = await User.findOne({ email: application.email });
      if (existingUser) {
        existingUser.role = 'student';
        existingUser.program = application.program;
        existingUser.profileImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(existingUser.fullName)}&background=random&color=fff`; 
        await existingUser.save();
      } else {
        // Create new user profile for the student
        const generatedPassword = Math.random().toString(36).slice(-8); // Random 8 chars
        existingUser = await User.create({
          fullName: application.fullName,
          email: application.email,
          phone: application.phone || 'N/A', // Set default if phone not provided in new form
          username: application.email.split('@')[0] + Math.floor(Math.random() * 1000),
          password: generatedPassword,
          role: 'student',
          program: application.program,
          profileImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(application.fullName)}&background=random&color=fff`
        });
        
        // Actually attach the generated password to application notes so we can email it
        application.adminNotes = `Auto-generated password for student portal: ${generatedPassword}`;
      }
      application.acceptedAt = Date.now();
    }
    
    await application.save();

    // Send Email Notification
    try {
      // Ethereal test account config
      let testAccount = await nodemailer.createTestAccount();
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });

      let subject = '';
      let text = '';
      if (status === 'accepted') {
        subject = 'Admissions Update: You are selected!';
        // Mention the auto-generated password if it exists
        const passNote = application.adminNotes ? `\n\nA student profile has been automatically created for you!\nYour login email: ${application.email}\nYour temporary password: ${application.adminNotes.replace('Auto-generated password for student portal: ', '')}` : '';
        text = `Dear ${application.fullName},\n\nCongratulations! Your application for the ${application.program} has been accepted. You are successfully selected to join our university.${passNote}\n\nBest regards,\nUniversity Admissions`;
      } else if (status === 'rejected') {
        subject = 'Admissions Update: Application Status';
        text = `Dear ${application.fullName},\n\nWe regret to inform you that you are not selected for the ${application.program} at this time. Thank you for your interest.\n\nBest regards,\nUniversity Admissions`;
      }

      if (subject) {
        let info = await transporter.sendMail({
          from: '"University Admissions" <admissions@university.edu>',
          to: application.email,
          subject: subject,
          text: text,
        });
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      }
    } catch (emailError) {
      console.error("Failed to send email notification: ", emailError);
    }
    
    // Attach user payload dynamically so frontend can navigate seamlessly
    let userPayload = null;
    if (status === 'accepted') {
      userPayload = await User.findOne({ email: application.email });
    }
    
    res.json({ success: true, message: `Application updated to ${status}`, application, user: userPayload });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteApplication = async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAdmissionStats = async (req, res) => {
  try {
    const total = await Application.countDocuments();
    const pending = await Application.countDocuments({ status: 'pending' });
    const accepted = await Application.countDocuments({ status: 'accepted' });
    const rejected = await Application.countDocuments({ status: 'rejected' });
    
    res.json({ 
      success: true, 
      stats: { total, pending, accepted, rejected } 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  submitApplication,
  getApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
  getAdmissionStats
};
