const Attendance = require('../models/Attendance');
const Session = require('../models/Session');
const QRCode = require('qrcode');
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

// ✅ 1. Create Attendance Session
exports.createSession = async (req, res) => {
  try {
    const { moduleName, lecturerName, durationMinutes } = req.body;

    const expiryTime = new Date(Date.now() + durationMinutes * 60000);

    const session = new Session({
      moduleName,
      lecturerName,
      expiryTime
    });

    await session.save();

    res.json({
      message: "Session created successfully",
      sessionId: session._id
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating session" });
  }
};

// ✅ 2. Generate QR Code
exports.generateQR = async (req, res) => {
  try {
    const { sessionId } = req.body;

    const url = `http://localhost:3000/attendance/${sessionId}`;

    const qr = await QRCode.toDataURL(url);

    res.json({ qr });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "QR generation failed" });
  }
};

// ✅ 3. Mark Attendance
exports.getDetailedAttendance = async (req, res) => {
  try {
    const records = await Attendance.find().populate('sessionId');
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.markAttendance = async (req, res) => {
  try {
    const { studentId, sessionId } = req.body;

    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // ❗ Prevent duplicate marking
    const alreadyMarked = await Attendance.findOne({ studentId, sessionId });
    if (alreadyMarked) {
      return res.status(400).json({ message: "Attendance already marked" });
    }

    const now = new Date();

    const status = now <= session.expiryTime ? 'PRESENT' : 'ABSENT';

    const attendance = new Attendance({
      studentId,
      sessionId,
      status
    });

    await attendance.save();

    res.json({
      message: "Attendance marked",
      status
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error marking attendance" });
  }
};

// ✅ 4. Get Attendance by Session
exports.getSessionAttendance = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const records = await Attendance.find({ sessionId });

    res.json(records);

  } catch (err) {
    res.status(500).json({ message: "Error fetching attendance" });
  }
};

// ✅ 5. Get Attendance Summary (75% logic)
exports.getStudentSummary = async (req, res) => {
  try {
    const { studentId } = req.params;

    const records = await Attendance.find({ studentId });

    const total = records.length;
    const present = records.filter(r => r.status === 'PRESENT').length;

    const percentage = total === 0 ? 0 : (present / total) * 100;

    const eligible = percentage >= 80;

    res.json({
      studentId,
      totalClasses: total,
      presentClasses: present,
      percentage: percentage.toFixed(2),
      eligible
    });

  } catch (err) {
    res.status(500).json({ message: "Error calculating attendance" });
  }
};

// ✅ 6. Generate PDF Report
exports.generateReport = async (req, res) => {
  try {
    const PDFDocument = require('pdfkit');
    const { sessionId, moduleName, lecturerName } = req.query;

    let filter = {};
    let sessionFilter = {};
    if (moduleName) sessionFilter.moduleName = moduleName;
    if (lecturerName) sessionFilter.lecturerName = lecturerName;
    const sessions = await Session.find(sessionFilter);
    const sessionIds = sessions.map(s => s._id);
    filter.sessionId = { $in: sessionIds };
    const records = await Attendance.find(filter);

    const doc = new PDFDocument({ margin: 30, size: 'A4', bufferPages: true });
    const QRCode = require('qrcode');
    const timestamp = new Date().toISOString().split('T')[0];
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Global_Academic_Master_Ledger_${timestamp}.pdf`);
    doc.pipe(res);

    const logoPath = path.join(__dirname, '../assets/logo.png');

    const drawHeader = (title, pageNum, totalPages) => {
      // Header Background
      doc.rect(0, 0, 612, 120).fill('#1e293b');
      
      // University Logo
      try {
        if (fs.existsSync(logoPath)) {
          doc.image(logoPath, 40, 25, { width: 45 });
        }
      } catch (e) { console.error("Logo error", e); }

      doc.fillColor('#ffffff').fontSize(22).font('Helvetica-Bold').text('GLOBAL ACADEMIC MASTER LEDGER', 100, 45);
      doc.fontSize(9).font('Helvetica').fillColor('#94a3b8').text('COMPREHENSIVE UNIVERSITY ATTENDANCE & PERFORMANCE AUDIT', 100, 75);
      
      doc.fontSize(8).fillColor('#ffffff').text(`ARCHIVE REF: ${Math.random().toString(36).substring(7).toUpperCase()}`, 450, 40, { align: 'right', width: 120 });
      doc.text(`ISSUED: ${new Date().toLocaleDateString()}`, 450, 52, { align: 'right', width: 120 });
      doc.text(`PAGE: ${pageNum} OF ${totalPages}`, 450, 64, { align: 'right', width: 120 });
    };

    const drawWatermark = () => {
      doc.save();
      doc.fillColor('#e2e8f0').opacity(0.15);
      doc.fontSize(60).font('Helvetica-Bold');
      doc.rotate(-45, { origin: [300, 400] });
      doc.text('OFFICIAL ACADEMIC RECORD', 50, 400, { align: 'center', width: 500 });
      doc.restore();
    };

    // Calculate total pages first for the header
    // We'll use a simplified version for now or just update headers after generation
    // Since we are using bufferPages: true, we can switch back
    
    for (let i = 0; i < sessions.length; i++) {
      const session = sessions[i];
      if (i > 0) doc.addPage();
      
      drawWatermark();
      drawHeader(`MODULE AUDIT: ${session.moduleName}`, i + 1, sessions.length);

      const sessionRecords = records.filter(r => r.sessionId?.toString() === session._id.toString());
      const present = sessionRecords.filter(r => r.status === 'PRESENT').length;
      const total = sessionRecords.length;
      const rate = total === 0 ? 0 : (present / total) * 100;

      let y = 140;
      // Session Executive Summary Card
      doc.rect(40, y, 532, 70).fill('#f8fafc').strokeColor('#e2e8f0').lineWidth(1).stroke();
      doc.fillColor('#1e293b').fontSize(10).font('Helvetica-Bold').text('MODULE NAME:', 60, y + 15);
      doc.font('Helvetica').text(session.moduleName, 150, y + 15);
      doc.font('Helvetica-Bold').text('LECTURER:', 60, y + 32);
      doc.font('Helvetica').text(session.lecturerName, 150, y + 32);
      doc.font('Helvetica-Bold').text('SESSION DATE:', 60, y + 49);
      doc.font('Helvetica').text(new Date(session.date || Date.now()).toLocaleDateString(), 150, y + 49);
      
      doc.rect(380, y + 10, 180, 50).fill('#ffffff').strokeColor('#f1f5f9').stroke();
      doc.fillColor('#64748b').fontSize(7).font('Helvetica-Bold').text('ENGAGEMENT RATE', 395, y + 20);
      const rateColor = rate >= 80 ? '#166534' : '#991b1b';
      doc.fontSize(16).fillColor(rateColor).text(`${rate.toFixed(1)}%`, 395, y + 35);

      y += 90;

      // Participation Ledger Table
      doc.rect(40, y, 532, 25).fill('#1e293b');
      doc.fillColor('#ffffff').fontSize(8).font('Helvetica-Bold');
      doc.text('STUDENT IDENTIFICATION', 55, y + 10);
      doc.text('VERIFICATION STATUS', 400, y + 10);
      y += 25;

      sessionRecords.forEach((r, idx) => {
        if (y > 700) {
          doc.addPage();
          drawWatermark();
          drawHeader(`MODULE AUDIT: ${session.moduleName} (CONTINUED)`, '...', '...');
          y = 140;
        }

        if (idx % 2 === 0) doc.rect(40, y, 532, 20).fill('#f1f5f9');
        
        doc.fillColor('#334155').font('Helvetica').fontSize(9).text(r.studentId, 55, y + 6);
        const isPresent = r.status === 'PRESENT';
        doc.fillColor(isPresent ? '#166534' : '#991b1b').font('Helvetica-Bold').fontSize(8).text(isPresent ? 'VERIFIED' : 'ABSENT', 400, y + 6);
        y += 20;
      });

      // Verification Footer
      doc.moveTo(40, 760).lineTo(572, 760).strokeColor('#cbd5e1').lineWidth(0.5).stroke();
      doc.fillColor('#94a3b8').fontSize(7).font('Helvetica').text(`Registry Hash: ${Math.random().toString(16).substring(2, 15).toUpperCase()}`, 40, 770);
      doc.text(`Digital Audit Stamp: ${new Date().toLocaleString()}`, 40, 782);
      doc.text(`Global Academic Master Ledger - Internal Use Only`, 400, 770, { align: 'right', width: 172 });
    }

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Global report error" });
  }
};

// ✅ Analytics Summary (GLOBAL)
exports.getAnalytics = async (req, res) => {
  try {
    const records = await Attendance.find();

    const total = records.length;
    const present = records.filter(r => r.status === 'PRESENT').length;
    const absent = total - present;

    const percentage = total === 0 ? 0 : (present / total) * 100;

    res.json({
      total,
      present,
      absent,
      percentage: percentage.toFixed(2)
    });

  } catch (err) {
    res.status(500).json({ message: "Analytics error" });
  }
};

exports.getModuleAnalytics = async (req, res) => {
  try {
    const sessions = await Session.find();

    let result = {};

    for (let s of sessions) {
      const records = await Attendance.find({ sessionId: s._id });

      const present = records.filter(r => r.status === 'PRESENT').length;

      if (!result[s.moduleName]) {
        result[s.moduleName] = { total: 0, present: 0 };
      }

      result[s.moduleName].total += records.length;
      result[s.moduleName].present += present;
    }

    res.json(result);

  } catch (err) {
    res.status(500).json({ message: "Module analytics error" });
  }
};

// ✅ Trend Analytics (DAILY)
exports.getTrendAnalytics = async (req, res) => {
  try {
    const records = await Attendance.find();
    const sessions = await Session.find();

    // Create a map of sessionId to date
    const sessionDates = {};
    sessions.forEach(s => {
      sessionDates[s._id] = new Date(s.date).toLocaleDateString();
    });

    let trends = {};

    records.forEach(r => {
      const date = sessionDates[r.sessionId] || 'Unknown';
      if (!trends[date]) {
        trends[date] = { date, present: 0, total: 0 };
      }
      trends[date].total++;
      if (r.status === 'PRESENT') {
        trends[date].present++;
      }
    });

    // Convert to sorted array
    const sortedTrends = Object.values(trends).sort((a, b) => new Date(a.date) - new Date(b.date));

    res.json(sortedTrends);

  } catch (err) {
    res.status(500).json({ message: "Trend analytics error" });
  }
};

exports.generateStudentReport = async (req, res) => {
  try {
    const PDFDocument = require('pdfkit');
    const QRCode = require('qrcode');
    const doc = new PDFDocument({ margin: 30, size: 'A4', bufferPages: true });

    const timestamp = new Date().toISOString().split('T')[0];
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Student_Attendance_Report.pdf`);

    doc.pipe(res);

    const User = require('../models/User');
    const Session = require('../models/Session');
    const Attendance = require('../models/Attendance');

    const students = await User.find({ role: 'student' });
    const sessions = await Session.find().sort({ date: -1 });
    const attendanceRecords = await Attendance.find();

    const logoPath = path.join(__dirname, '../assets/logo.png');

    let isFirstPage = true;
    for (const student of students) {
      if (!isFirstPage) doc.addPage();
      isFirstPage = false;

      // Watermark
      doc.save();
      doc.fillColor('#f1f5f9').opacity(0.1);
      doc.fontSize(80).font('Helvetica-Bold');
      doc.rotate(-30, { origin: [300, 400] });
      doc.text('AUTHENTIC TRANSCRIPT', -100, 400, { align: 'center', width: 800 });
      doc.restore();

      // Dark Header
      doc.rect(0, 0, 612, 120).fill('#1e293b');
      
      try {
        if (fs.existsSync(logoPath)) {
          doc.image(logoPath, 40, 30, { width: 50 });
        }
      } catch (e) {}

      doc.fillColor('#ffffff').fontSize(24).font('Helvetica-Bold').text('UNIVERSITY ACADEMIC REPORT', 105, 45);
      doc.fontSize(10).font('Helvetica').fillColor('#94a3b8').text(`DETAILED ATTENDANCE & ELIGIBILITY: ${student.fullName || 'John Doe'} (${student.studentId || 'IT2024001'})`, 105, 75);
      
      doc.fontSize(8).fillColor('#ffffff').text(`Generated: ${new Date().toLocaleDateString()},`, 450, 45, { align: 'right', width: 120 });
      doc.text(`${new Date().toLocaleTimeString()}`, 450, 55, { align: 'right', width: 120 });
      
      let y = 140;
      // Student Identity Card (Gray Box)
      doc.rect(40, y, 532, 70).fill('#f8fafc').strokeColor('#f1f5f9').stroke();
      
      doc.fillColor('#475569').fontSize(9).font('Helvetica-Bold').text('Student Name:', 60, y + 15);
      doc.fillColor('#1e293b').fontSize(9).font('Helvetica').text(student.fullName || 'John Doe', 140, y + 15);
      
      doc.fillColor('#475569').fontSize(9).font('Helvetica-Bold').text('Student ID:', 60, y + 35);
      doc.fillColor('#1e293b').fontSize(9).font('Helvetica').text(student.studentId || 'IT2024001', 140, y + 35);

      doc.fillColor('#475569').fontSize(9).font('Helvetica-Bold').text('Enrolled Program:', 280, y + 15);
      doc.fillColor('#1e293b').fontSize(9).font('Helvetica').text(student.program || 'B.Sc. in Software Engineering', 380, y + 15);

      const studentRecords = attendanceRecords.filter(r => r.studentId === student.studentId);
      const total = sessions.length;
      const present = studentRecords.filter(r => r.status === 'PRESENT').length;
      const rate = total === 0 ? 0 : (present / total) * 100;
      const eligible = rate >= 80;

      doc.fillColor('#475569').fontSize(9).font('Helvetica-Bold').text('Global Eligibility:', 280, y + 35);
      doc.fillColor(eligible ? '#166534' : '#991b1b').fontSize(12).font('Helvetica-Bold').text(`${rate.toFixed(1)}% - ${eligible ? 'ELIGIBLE' : 'INELIGIBLE'}`, 380, y + 35);

      y += 90;


      y += 70;

      // Detailed Audit Table
      doc.rect(40, y, 532, 25).fill('#1e293b');
      doc.fillColor('#ffffff').fontSize(8).font('Helvetica-Bold');
      doc.text('DATE', 55, y + 8);
      doc.text('MODULE CODE', 130, y + 8);
      doc.text('MODULE NAME', 230, y + 8);
      doc.text('LECTURER', 400, y + 8);
      doc.text('STATUS', 530, y + 8);
      y += 25;

      for (let i = 0; i < sessions.length; i++) {
        const s = sessions[i];
        if (y > 700) {
          doc.addPage();
          doc.rect(0, 0, 612, 50).fill('#1e293b');
          doc.fillColor('#ffffff').fontSize(10).font('Helvetica-Bold').text(`CONTINUED AUDIT: ${student.fullName.toUpperCase()}`, 40, 20);
          y = 70;
        }

        const record = studentRecords.find(r => r.sessionId?.toString() === s._id.toString());
        const isPresent = record && record.status === 'PRESENT';

        if (i % 2 === 0) doc.rect(40, y, 532, 20).fill('#f1f5f9');
        
        doc.fillColor('#475569').font('Helvetica').fontSize(8);
        doc.text(new Date(s.date || Date.now()).toLocaleDateString(), 55, y + 6);
        doc.text(s.moduleCode || 'N/A', 130, y + 6);
        doc.text(s.moduleName?.substring(0, 30) || 'N/A', 230, y + 6);
        doc.text(s.lecturerName?.substring(0, 20) || 'N/A', 400, y + 6);
        
        doc.fillColor(isPresent ? '#166534' : '#991b1b').font('Helvetica-Bold').text(isPresent ? 'PRESENT' : 'ABSENT', 530, y + 6);
        y += 20;
      }

      // Verification QR and Signature
      y = 720;
      const qrData = `TRANSCRIPT_VERIFY_${student.studentId}_${new Date().getTime()}`;
      const qrImage = await QRCode.toDataURL(qrData);
      doc.image(qrImage, 40, y, { width: 70 });
      doc.fillColor('#94a3b8').fontSize(7).font('Helvetica').text('SCAN TO VERIFY AUTHENTICITY', 40, y + 75);
      
      doc.moveTo(380, y + 50).lineTo(570, y + 50).strokeColor('#cbd5e1').lineWidth(1).stroke();
      doc.fillColor('#1e293b').fontSize(9).font('Helvetica-Bold').text('OFFICIAL REGISTRAR SIGNATURE', 380, y + 55);
      doc.fontSize(7).font('Helvetica').fillColor('#94a3b8').text('UNIVERSITY ACADEMIC RECORDS DIVISION', 380, y + 68);
    }

    const range = doc.bufferedPageRange();
    for (let i = range.start; i < range.start + range.count; i++) {
      doc.switchToPage(i);
      doc.fillColor('#94a3b8').fontSize(7).text(`University Management | Official Audit Document | Page ${i + 1} of ${range.count}`, 30, 800, { align: 'center', width: 550 });
    }

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Advanced report error" });
  }
};

exports.updateAttendance = async (req, res) => {
  try {
    const Attendance = require('../models/Attendance');
    const { status } = req.body;
    await Attendance.findByIdAndUpdate(req.params.id, { status });
    res.json({ success: true, message: "Record updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteAttendance = async (req, res) => {
  try {
    const Attendance = require('../models/Attendance');
    await Attendance.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Record deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.generateSessionQR = async (req, res) => {
  try {
    const QRCode = require('qrcode');
    const { sessionId } = req.body;
    const url = `http://localhost:3000/attendance/${sessionId}`;
    const qr = await QRCode.toDataURL(url);
    res.json({ qr });
  } catch (err) {
    res.status(500).json({ message: "QR failed" });
  }
};
exports.generateAnalyticsReport = async (req, res) => {
  try {
    const PDFDocument = require('pdfkit');
    const path = require('path');
    const fs = require('fs');
    const Attendance = require('../models/Attendance');
    const Session = require('../models/Session');
    const User = require('../models/User');

    const records = await Attendance.find();
    const sessions = await Session.find();
    const students = await User.find({ role: 'student' });

    const total = records.length;
    const present = records.filter(r => r.status === 'PRESENT').length;
    const percentage = total === 0 ? 0 : (present / total) * 100;

    const doc = new PDFDocument({ margin: 40, size: 'A4' });
    const timestamp = new Date().toISOString().split('T')[0];
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Academic_Analytics_Summary_${timestamp}.pdf`);
    doc.pipe(res);

    const logoPath = path.join(__dirname, '../assets/logo.png');

    // Header
    doc.rect(0, 0, 612, 120).fill('#1e293b');
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 40, 30, { width: 50 });
    }
    doc.fillColor('#ffffff').fontSize(24).font('Helvetica-Bold').text('ACADEMIC ANALYTICS INSIGHTS', 105, 45);
    doc.fontSize(10).font('Helvetica').fillColor('#94a3b8').text('STRATEGIC ATTENDANCE & ELIGIBILITY INTELLIGENCE REPORT', 105, 75);

    let y = 150;
    doc.fillColor('#1e293b').fontSize(14).font('Helvetica-Bold').text('EXECUTIVE SUMMARY', 40, y);
    y += 25;

    // Summary Cards
    const cards = [
      { label: 'GLOBAL ATTENDANCE RATE', value: `${percentage.toFixed(1)}%` },
      { label: 'TOTAL LOG ENTRIES', value: total },
      { label: 'UNIQUE STUDENTS', value: students.length },
      { label: 'ACTIVE SESSIONS', value: sessions.length }
    ];

    cards.forEach((c, i) => {
      const cx = 40 + (i % 2 === 0 ? 0 : 275);
      const cy = y + (Math.floor(i / 2) * 60);
      doc.rect(cx, cy, 260, 50).fill('#f8fafc').strokeColor('#e2e8f0').lineWidth(1).stroke();
      doc.fillColor('#64748b').fontSize(8).font('Helvetica-Bold').text(c.label, cx + 15, cy + 15);
      doc.fillColor('#1e293b').fontSize(16).text(c.value, cx + 15, cy + 28);
    });

    y += 140;

    // Detailed Module Breakdown
    doc.fontSize(14).font('Helvetica-Bold').text('MODULE PERFORMANCE BREAKDOWN', 40, y);
    y += 25;

    doc.rect(40, y, 532, 25).fill('#1e293b');
    doc.fillColor('#ffffff').fontSize(9).font('Helvetica-Bold');
    doc.text('MODULE NAME', 55, y + 8);
    doc.text('TOTAL', 300, y + 8);
    doc.text('PRESENT', 380, y + 8);
    doc.text('RATE (%)', 480, y + 8);
    y += 25;

    const moduleStats = {};
    sessions.forEach(s => {
      const sRecords = records.filter(r => r.sessionId?.toString() === s._id.toString());
      if (!moduleStats[s.moduleName]) moduleStats[s.moduleName] = { total: 0, present: 0 };
      moduleStats[s.moduleName].total += sRecords.length;
      moduleStats[s.moduleName].present += sRecords.filter(r => r.status === 'PRESENT').length;
    });

    Object.entries(moduleStats).forEach(([name, stats], idx) => {
      if (y > 750) {
        doc.addPage();
        y = 50;
      }
      if (idx % 2 === 0) doc.rect(40, y, 532, 20).fill('#f1f5f9');
      const rate = stats.total === 0 ? 0 : (stats.present / stats.total) * 100;
      doc.fillColor('#334155').font('Helvetica').fontSize(9).text(name.substring(0, 35), 55, y + 6);
      doc.text(stats.total, 300, y + 6);
      doc.text(stats.present, 380, y + 6);
      doc.fillColor(rate >= 80 ? '#166534' : '#991b1b').font('Helvetica-Bold').text(`${rate.toFixed(1)}%`, 480, y + 6);
      y += 20;
    });

    // Footer
    doc.fontSize(8).fillColor('#94a3b8').font('Helvetica').text(`Report Generated On: ${new Date().toLocaleString()} | Academic Intelligence Unit`, 40, 780, { align: 'center', width: 532 });

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Analytics report error" });
  }
};
