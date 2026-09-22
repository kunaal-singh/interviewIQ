# 🚀 InterviewIQ.AI

An AI-powered interview preparation SaaS platform built with the **MERN Stack** that enables users to upload resumes, generate personalized interview questions, practice technical and HR rounds, receive AI-driven feedback, and purchase credits through Razorpay for premium features.

🔗 **Live Demo:** [interviewiq-rh0q.onrender.com](https://interviewiq-rh0q.onrender.com/)

---

## 📖 About the Project

InterviewIQ.AI helps job seekers prepare for interviews by leveraging AI to analyze resumes and generate customized interview experiences. The platform combines secure authentication, intelligent feedback, payment integration, and a modern responsive UI to deliver a complete interview preparation ecosystem.

---

## ✨ Features

- 📄 Upload Resume (PDF)
- 🎙️ Voice-Based AI Interviews
- 🤖 AI-Generated Interview Questions
- 💻 Practice Technical & HR Interviews
- 📊 Intelligent AI Feedback
- 💳 Credit-Based Access System
- 💰 Razorpay Payment Integration
- 🔐 Firebase Google Authentication
- 📜 Interview History & Reports
- 🎨 Smooth UI with Framer Motion
- ☁️ Full-Stack Deployment on Render
- 💼 Subscription Plans
- 📈 Performance Analytics Dashboard

---

## 🛠️ Tech Stack

**Client**
- React.js
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router DOM
- Axios
- Framer Motion

**Server**
- Node.js
- Express.js
- MongoDB
- Mongoose
- Firebase Authentication
- Multer
- OpenRouter AI API
- Razorpay
- REST APIs

**Deployment**
- Render
- MongoDB Atlas

---

## 📸 Screenshots

| Dashboard | Advanced AI Capabilities |
|---|---|
| ![Dashboard](./screenshots/dashboard.png) | ![Advanced AI](./screenshots/advanced-ai.png) |

| Multi Models | Subscription Plans |
|---|---|
| ![Multi Models](./screenshots/multi-models.png) | ![Subscription](./screenshots/subscription.png) |

| Interview Dashboard | Interview Panel |
|---|---|
| ![Interview Dashboard](./screenshots/interview-dashboard.png) | ![Interview Panel](./screenshots/interview-panel.png) |

| Interview Analysis | Answers Analysis |
|---|---|
| ![Interview Analysis](./screenshots/interview-analysis.png) | ![Answers Analysis](./screenshots/answers-analysis.png) |

> Replace the paths above with the actual image paths in your repo (e.g. `/screenshots/dashboard.png`).

---

## 📦 Installation

Clone the repository and install the required dependencies.

```bash
git clone https://github.com/ananya-singh/3.interviewIQ.git

cd 3.interviewIQ

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

---

## 🔐 Environment Variables

### Server (`server/.env`)

```env
PORT=8000

MONGODB_URL=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

OPENROUTER_API_KEY=your_openrouter_api_key

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### Client (`client/.env`)

```env
VITE_API_URL=http://localhost:8000

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

> ⚠️ **Note:** Never commit your `.env` files or expose API keys publicly.

---

## 🚀 Run Locally

**Start Backend**

```bash
cd server
npm run dev
```

**Start Frontend**

```bash
cd client
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8000`

---

## 🔄 How It Works

1. Users sign in securely using Google Authentication.
2. Upload their resume in PDF format.
3. AI analyzes the resume and generates personalized interview questions.
4. Users practice technical and HR interview rounds.
5. AI evaluates responses and provides detailed feedback.
6. Credits are deducted for premium features.
7. Additional credits can be purchased securely via Razorpay.
8. Interview reports and history are saved for future review.

---

## 📚 Lessons Learned

- Built a production-ready AI SaaS application by integrating OpenRouter AI for personalized interview generation, intelligent feedback, and AI-powered voice interviews to create an interactive mock interview experience.
- Designed and implemented a scalable credit-based subscription system with Razorpay, enabling secure payments, premium plan management, and seamless monetization.
- Strengthened expertise in Firebase Authentication, PDF processing with Multer, RESTful API development, MongoDB optimization, and responsive UI design using React and Framer Motion.
- Gained hands-on experience in architecting a full-stack MERN application with modular backend services, cloud deployment on Render, and efficient state management for a real-world SaaS product.
- Improved understanding of building scalable, maintainable, and user-centric applications by combining AI, payment gateways, authentication, and modern frontend technologies into a cohesive platform.

---

## 🔮 Future Enhancements

- 👨‍💻 Live Coding Interview Environment
- 🌍 Multi-language Support
- 👥 Recruiter Dashboard
- 📧 Email Interview Reports
- 🤖 AI Career Recommendations

---

## 👨‍💻 About Me

I'm a passionate Full-Stack Developer with a strong foundation in the MERN stack and a keen interest in building AI-powered SaaS applications that solve real-world problems. I enjoy transforming innovative ideas into scalable, user-centric products by integrating modern technologies such as artificial intelligence, cloud services, authentication systems, and payment gateways.

My experience includes developing end-to-end applications involving AI automation, browser automation, resume analysis, SEO analytics, secure authentication, subscription-based monetization, and RESTful APIs. I continuously explore emerging technologies to build impactful solutions with clean architecture, intuitive user experiences, and production-ready scalability.

---

## 🔗 Links

- LinkedIn: [ananya-singh-71b7252ba](https://www.linkedin.com/in/ananya-singh-71b7252ba)
