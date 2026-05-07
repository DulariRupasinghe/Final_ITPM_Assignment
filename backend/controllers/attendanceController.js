const Attendance = require('../models/Attendance');
const Session = require('../models/Session');
const QRCode = require('qrcode');
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

// Create Attendance Session
exports.createSession = async (req, res) => {
  try {
    const { moduleName, lecturerName, durationMinutes } = req.body;
    const expiryTime = new Date(Date.now() + durationMinutes * 60000);
    const session = new Session({ moduleName, lecturerName, expiryTime });
    await session.save();
    res.json({ message: "Session created successfully", sessionId: session._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating session" });
  }
};

// Generate QR Code
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

// Mark Attendance
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
    if (!session) return res.status(404).json({ message: "Session not found" });
    const alreadyMarked = await Attendance.findOne({ studentId, sessionId });
    if (alreadyMarked) return res.status(400).json({ message: "Attendance already marked" });
    const now = new Date();
    const status = now <= session.expiryTime ? 'PRESENT' : 'ABSENT';
    const attendance = new Attendance({ studentId, sessionId, status });
    await attendance.save();
    res.json({ message: "Attendance marked", status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error marking attendance" });
  }
};

//   Get Attendance by Session
exports.getSessionAttendance = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const records = await Attendance.find({ sessionId });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: "Error fetching attendance" });
  }
};

//   Get Attendance Summary
exports.getStudentSummary = async (req, res) => {
  try {
    const { studentId } = req.params;
    const records = await Attendance.find({ studentId });
    const total = records.length;
    const present = records.filter(r => r.status === 'PRESENT').length;
    const percentage = total === 0 ? 0 : (present / total) * 100;
    const eligible = percentage >= 80;
    res.json({ studentId, totalClasses: total, presentClasses: present, percentage: percentage.toFixed(2), eligible });
  } catch (err) {
    res.status(500).json({ message: "Error calculating attendance" });
  }
};

//  Global Report
exports.generateReport = async (req, res) => {
  try {
    const { moduleName, lecturerName } = req.query;
    let sessionFilter = {};
    if (moduleName) sessionFilter.moduleName = moduleName;
    if (lecturerName) sessionFilter.lecturerName = lecturerName;
    const sessions = await Session.find(sessionFilter);
    const sessionIds = sessions.map(s => s._id);
    const records = await Attendance.find({ sessionId: { $in: sessionIds } });

    const doc = new PDFDocument({ margin: 30, size: 'A4', bufferPages: true });
    const timestamp = new Date().toISOString().split('T')[0];
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Global_Academic_Master_Ledger_${timestamp}.pdf`);
    doc.pipe(res);

    const logoPath = path.join(__dirname, '../assets/logo.png');
    const drawHeader = (title, pageNum, totalPages) => {
      doc.rect(0, 0, 612, 120).fill('#1e293b');
      try { if (fs.existsSync(logoPath)) doc.image(logoPath, 40, 25, { width: 45 }); } catch (e) {}
      doc.fillColor('#ffffff').fontSize(22).font('Helvetica-Bold').text('GLOBAL ACADEMIC MASTER LEDGER', 100, 45);
      doc.fontSize(9).font('Helvetica').fillColor('#94a3b8').text('COMPREHENSIVE UNIVERSITY ATTENDANCE & PERFORMANCE AUDIT', 100, 75);
      doc.fontSize(8).fillColor('#ffffff').text(`ARCHIVE REF: ${Math.random().toString(36).substring(7).toUpperCase()}`, 450, 40, { align: 'right', width: 120 });
      doc.text(`ISSUED: ${new Date().toLocaleDateString()}`, 450, 52, { align: 'right', width: 120 });
      doc.text(`PAGE: ${pageNum} OF ${totalPages}`, 450, 64, { align: 'right', width: 120 });
    };

    const drawWatermark = () => {
      doc.save(); doc.fillColor('#e2e8f0').opacity(0.15); doc.fontSize(60).font('Helvetica-Bold');
      doc.rotate(-45, { origin: [300, 400] }); doc.text('OFFICIAL ACADEMIC RECORD', 50, 400, { align: 'center', width: 500 });
      doc.restore();
    };

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
      doc.rect(40, y, 532, 70).fill('#f8fafc').strokeColor('#e2e8f0').lineWidth(1).stroke();
      doc.fillColor('#1e293b').fontSize(10).font('Helvetica-Bold').text('MODULE NAME:', 60, y + 15);
      doc.font('Helvetica').text(session.moduleName, 150, y + 15);
      doc.font('Helvetica-Bold').text('LECTURER:', 60, y + 32);
      doc.font('Helvetica').text(session.lecturerName, 150, y + 32);
      doc.font('Helvetica-Bold').text('SESSION DATE:', 60, y + 49);
      doc.font('Helvetica').text(new Date(session.date || Date.now()).toLocaleDateString(), 150, y + 49);
      doc.rect(380, y + 10, 180, 50).fill('#ffffff').strokeColor('#f1f5f9').stroke();
      doc.fillColor('#64748b').fontSize(7).font('Helvetica-Bold').text('ENGAGEMENT RATE', 395, y + 20);
      doc.fontSize(16).fillColor(rate >= 80 ? '#166534' : '#991b1b').text(`${rate.toFixed(1)}%`, 395, y + 35);

      y += 90;
      doc.rect(40, y, 532, 25).fill('#1e293b');
      doc.fillColor('#ffffff').fontSize(8).font('Helvetica-Bold').text('STUDENT IDENTIFICATION', 55, y + 10).text('VERIFICATION STATUS', 400, y + 10);
      y += 25;

      sessionRecords.forEach((r, idx) => {
        if (y > 700) { doc.addPage(); drawWatermark(); drawHeader(`MODULE AUDIT: ${session.moduleName}`, '...', '...'); y = 140; }
        if (idx % 2 === 0) doc.rect(40, y, 532, 20).fill('#f1f5f9');
        doc.fillColor('#334155').font('Helvetica').fontSize(9).text(r.studentId, 55, y + 6);
        const isPresent = r.status === 'PRESENT';
        doc.fillColor(isPresent ? '#166534' : '#991b1b').font('Helvetica-Bold').fontSize(8).text(isPresent ? 'VERIFIED' : 'ABSENT', 400, y + 6);
        y += 20;
      });
    }
    doc.end();
  } catch (err) { console.error(err); res.status(500).json({ message: "Global report error" }); }
};

// Analytics
exports.getAnalytics = async (req, res) => {
  try {
    const records = await Attendance.find();
    const total = records.length;
    const present = records.filter(r => r.status === 'PRESENT').length;
    const percentage = total === 0 ? 0 : (present / total) * 100;
    res.json({ total, present, absent: total - present, percentage: percentage.toFixed(2) });
  } catch (err) { res.status(500).json({ message: "Analytics error" }); }
};

exports.getModuleAnalytics = async (req, res) => {
  try {
    const sessions = await Session.find();
    let result = {};
    for (let s of sessions) {
      const records = await Attendance.find({ sessionId: s._id });
      const present = records.filter(r => r.status === 'PRESENT').length;
      if (!result[s.moduleName]) result[s.moduleName] = { total: 0, present: 0 };
      result[s.moduleName].total += records.length;
      result[s.moduleName].present += present;
    }
    res.json(result);
  } catch (err) { res.status(500).json({ message: "Module analytics error" }); }
};

exports.getTrendAnalytics = async (req, res) => {
  try {
    const records = await Attendance.find();
    const sessions = await Session.find();
    const sessionDates = {}; sessions.forEach(s => { sessionDates[s._id] = new Date(s.date).toLocaleDateString(); });
    let trends = {};
    records.forEach(r => {
      const date = sessionDates[r.sessionId] || 'Unknown';
      if (!trends[date]) trends[date] = { date, present: 0, total: 0 };
      trends[date].total++; if (r.status === 'PRESENT') trends[date].present++;
    });
    res.json(Object.values(trends).sort((a, b) => new Date(a.date) - new Date(b.date)));
  } catch (err) { res.status(500).json({ message: "Trend analytics error" }); }
};

exports.generateStudentReport = async (req, res) => {
  try {
    const doc = new PDFDocument({ margin: 30, size: 'A4', bufferPages: true });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Student_Attendance_Report.pdf`);
    doc.pipe(res);

    const User = require('../models/User');
    const attendanceRecords = await Attendance.find();
    const attendanceStudentIds = [...new Set(attendanceRecords.map(r => r.studentId))];
    const userStudents = await User.find({ role: 'student' });
    const userStudentIds = userStudents.map(u => u.studentId);
    const allStudentIds = [...new Set([...attendanceStudentIds, ...userStudentIds])];
    const sessions = await Session.find().sort({ date: -1 });
    const logoPath = path.join(__dirname, '../assets/logo.png');

    let isFirstPage = true;
    for (const studentId of allStudentIds) {
      if (!studentId) continue;
      const student = userStudents.find(u => u.studentId === studentId) || { studentId, fullName: 'Unknown Student', program: 'B.Sc. in Software Engineering' };
      if (!isFirstPage) doc.addPage();
      isFirstPage = false;

      doc.save(); doc.fillColor('#f1f5f9').opacity(0.1); doc.fontSize(80).font('Helvetica-Bold');
      doc.rotate(-30, { origin: [300, 400] }); doc.text('AUTHENTIC TRANSCRIPT', -100, 400, { align: 'center', width: 800 });
      doc.restore();

      doc.rect(0, 0, 612, 120).fill('#1e293b');
      try { if (fs.existsSync(logoPath)) doc.image(logoPath, 40, 30, { width: 50 }); } catch (e) {}
      doc.fillColor('#ffffff').fontSize(24).font('Helvetica-Bold').text('UNIVERSITY ACADEMIC REPORT', 105, 45);
      doc.fontSize(10).font('Helvetica').fillColor('#94a3b8').text(`DETAILED ATTENDANCE & ELIGIBILITY: ${student.fullName || 'John Doe'} (${student.studentId || 'IT2024001'})`, 105, 75);
      doc.fontSize(8).fillColor('#ffffff').text(`Generated: ${new Date().toLocaleDateString()},`, 450, 45, { align: 'right', width: 120 });
      doc.text(`${new Date().toLocaleTimeString()}`, 450, 55, { align: 'right', width: 120 });

      let y = 140;
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

      y += 160;
      doc.rect(40, y, 532, 25).fill('#1e293b');
      doc.fillColor('#ffffff').fontSize(8).font('Helvetica-Bold').text('DATE', 55, y + 8).text('MODULE CODE', 130, y + 8).text('MODULE NAME', 230, y + 8).text('LECTURER', 400, y + 8).text('STATUS', 530, y + 8);
      y += 25;

      for (let i = 0; i < sessions.length; i++) {
        if (y > 700) { doc.addPage(); doc.rect(0, 0, 612, 50).fill('#1e293b'); doc.fillColor('#ffffff').fontSize(10).font('Helvetica-Bold').text(`CONTINUED AUDIT: ${student.fullName.toUpperCase()}`, 40, 20); y = 70; }
        const s = sessions[i]; const record = studentRecords.find(r => r.sessionId?.toString() === s._id.toString()); const isPresent = record && record.status === 'PRESENT';
        if (i % 2 === 0) doc.rect(40, y, 532, 20).fill('#f1f5f9');
        doc.fillColor('#475569').font('Helvetica').fontSize(8).text(new Date(s.date || Date.now()).toLocaleDateString(), 55, y + 6).text(s.moduleCode || 'N/A', 130, y + 6).text(s.moduleName?.substring(0, 30) || 'N/A', 230, y + 6).text(s.lecturerName?.substring(0, 20) || 'N/A', 400, y + 6);
        doc.fillColor(isPresent ? '#166534' : '#991b1b').font('Helvetica-Bold').text(isPresent ? 'PRESENT' : 'ABSENT', 530, y + 6);
        y += 20;
      }
      y = 720; const qrData = `TRANSCRIPT_VERIFY_${student.studentId}`; const qrImage = await QRCode.toDataURL(qrData);
      doc.image(qrImage, 40, y, { width: 70 }).fillColor('#94a3b8').fontSize(7).text('SCAN TO VERIFY AUTHENTICITY', 40, y + 75);
      doc.moveTo(380, y + 50).lineTo(570, y + 50).strokeColor('#cbd5e1').lineWidth(1).stroke();
      doc.fillColor('#1e293b').fontSize(9).font('Helvetica-Bold').text('OFFICIAL REGISTRAR SIGNATURE', 380, y + 55);
    }
    const range = doc.bufferedPageRange();
    for (let i = range.start; i < range.start + range.count; i++) { doc.switchToPage(i); doc.fillColor('#94a3b8').fontSize(7).text(`Page ${i + 1} of ${range.count}`, 30, 800, { align: 'center', width: 550 }); }
    doc.end();
  } catch (err) { console.error(err); res.status(500).json({ message: "Report error" }); }
};

exports.updateAttendance = async (req, res) => {
  try { await Attendance.findByIdAndUpdate(req.params.id, { status: req.body.status }); res.json({ success: true }); } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteAttendance = async (req, res) => {
  try { await Attendance.findByIdAndDelete(req.params.id); res.json({ success: true }); } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.generateSessionQR = async (req, res) => {
  try { const qr = await QRCode.toDataURL(`http://localhost:3000/attendance/${req.body.sessionId}`); res.json({ qr }); } catch (err) { res.status(500).json({ message: "QR failed" }); }
};

exports.generateAnalyticsReport = async (req, res) => {
  try {
    const records = await Attendance.find(); const sessions = await Session.find();
    const doc = new PDFDocument({ margin: 40, size: 'A4' });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Analytics_Summary.pdf`);
    doc.pipe(res);
    doc.rect(0, 0, 612, 120).fill('#1e293b');
    doc.fillColor('#ffffff').fontSize(24).font('Helvetica-Bold').text('ACADEMIC ANALYTICS', 105, 45);
    let y = 150;
    Object.entries(records.reduce((acc, r) => { 
      const s = sessions.find(ses => ses._id.toString() === r.sessionId?.toString());
      const name = s ? s.moduleName : 'Unknown';
      if (!acc[name]) acc[name] = { t: 0, p: 0 };
      acc[name].t++; if (r.status === 'PRESENT') acc[name].p++;
      return acc;
    }, {})).forEach(([name, stats]) => {
      doc.fillColor('#334155').text(`${name}: ${((stats.p/stats.t)*100).toFixed(1)}%`, 40, y); y += 20;
    });
    doc.end();
  } catch (err) { res.status(500).json({ message: "Analytics report error" }); }
};

exports.manualMark = async (req, res) => {
  try {
    const { studentId, moduleName, lecturerName, status } = req.body;
    let session = await Session.findOne({ moduleName, lecturerName }).sort({ date: -1 });
    if (!session) {
      session = new Session({ moduleName, moduleCode: 'MANUAL', lecturerName, date: new Date(), startTime: '09:00 AM', endTime: '12:00 PM', expiryTime: new Date(Date.now() + 3600000) });
      await session.save();
    }
    const attendance = new Attendance({ studentId, sessionId: session._id, status: status || 'PRESENT' });
    await attendance.save();
    res.json({ success: true });
  } catch (err) { res.status(500).json({ message: "Manual sync failed" }); }
};