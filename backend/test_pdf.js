const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

async function testPDF() {
  const doc = new PDFDocument({ margin: 30, size: 'A4', bufferPages: true });
  doc.pipe(fs.createWriteStream('test_report_new.pdf'));
  
  const logoPath = path.join(__dirname, 'assets/logo.png');
  const student = { fullName: 'Test Student', studentId: 'IT123', program: 'Test Program' };
  const sessions = [{ date: new Date(), moduleCode: 'MOD1', moduleName: 'Test Module', lecturerName: 'Dr. Test' }];

  // Watermark
  doc.save();
  doc.fillColor('#f1f5f9').opacity(0.1);
  doc.fontSize(80).font('Helvetica-Bold');
  doc.rotate(-30, { origin: [300, 400] });
  doc.text('AUTHENTIC TRANSCRIPT', -100, 400, { align: 'center', width: 800 });
  doc.restore();

  // Header
  doc.rect(0, 0, 612, 140).fill('#1e293b');
  if (fs.existsSync(logoPath)) {
    doc.image(logoPath, 40, 35, { width: 60 });
  }
  doc.fillColor('#ffffff').fontSize(26).font('Helvetica-Bold').text('OFFICIAL ACADEMIC AUDIT', 115, 45);
  doc.fontSize(10).font('Helvetica').fillColor('#94a3b8').text('ADVANCED STUDENT MONITORING & ELIGIBILITY TRANSCRIPT', 115, 80);
  
  doc.end();
  console.log('New PDF generated with branding');
}

testPDF().catch(console.error);
