# 🎓 Student Management System - ITPM Final Assignment

![Project Status](https://img.shields.io/badge/Status-Complete-success)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

A premium, full-stack Student Management System designed for high-efficiency academic administration. This project features a robust Attendance Management module, professional audit-ready report generation, and a modern, responsive UI.

---

## 🚀 Key Features

### 📅 Attendance Management
- **Smart Tracking**: Real-time attendance logging for students.
- **Audit-Ready Reports**: High-fidelity PDF generation for academic audits.
- **Interactive Dashboard**: Visual representation of attendance trends and statistics.

### 🔐 Secure Authentication
- JWT-based authentication for secure access.
- Role-based navigation and protected routes.

### 📊 Modern UI/UX
- Responsive design built with **Tailwind CSS**.
- High-quality iconography using **Lucide React**.
- Dynamic charts and analytics.

### 🧪 Automated Quality Assurance
- Full E2E test coverage using **Playwright**.
- Automated navigation and authentication workflows.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, Tailwind CSS, Lucide Icons |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Testing** | Playwright (E2E) |
| **Reporting** | PDFKit / Custom PDF Logic |

---

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/DulariRupasinghe/Final_ITPM_Assignment.git
cd Final_ITPM_Assignment
```

### 2. Frontend Setup
```bash
npm install
```

### 3. Backend Setup
```bash
cd backend
npm install
# Configure your .env file with MONGODB_URI and JWT_SECRET
```

### 4. Running the Application
**Start Backend:**
```bash
cd backend
npm run dev
```

**Start Frontend:**
```bash
# In the root directory
npm start
```

---

## 🧪 Testing

To run the automated E2E tests:

```bash
# Run all tests
npx playwright test

# View test report
npx playwright show-report
```

---

## 📂 Project Structure

```text
├── backend/            # Express.js Server & MongoDB Models
│   ├── controllers/    # Business logic
│   ├── models/         # Database schemas
│   └── routes/         # API endpoints
├── src/                # React Frontend
│   ├── components/     # Reusable UI components
│   ├── pages/          # Application views
│   └── context/        # State management
├── tests/              # Playwright E2E tests
└── playwright.config.js # Testing configuration
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Developed with ❤️ for the ITPM Final Assignment.**