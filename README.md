# InterviewIQ.AI

An AI-powered interview preparation SaaS platform built with the **MERN Stack** that enables users to upload resumes, generate personalized interview questions, practice technical and HR rounds, receive AI-driven feedback, and purchase credits through Razorpay for premium features.

 **Live Demo:** [interviewiq-rh0q.onrender.com](https://interviewiq-client-psyu.onrender.com)

---

##  About the Project

InterviewIQ.AI helps job seekers prepare for interviews by leveraging AI to analyze resumes and generate customized interview experiences. The platform combines secure authentication, intelligent feedback, payment integration, and a modern responsive UI to deliver a complete interview preparation ecosystem.

---

##  Features

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

##  Tech Stack

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

##  Screenshots

<img width="467" height="172" alt="Screenshot 2026-09-25 012146" src="https://github.com/user-attachments/assets/2c850f6a-0a49-4866-8a3a-f6e221975671" />
<img width="1535" height="772" alt="Screenshot 2026-09-25 012126" src="https://github.com/user-attachments/assets/762e641e-1d02-409d-b9de-705bf1725483" />
<img width="1532" height="777" alt="Screenshot 2026-09-25 012204" src="https://github.com/user-attachments/assets/2c0d0195-5ef8-4241-86c9-15d51e2a76da" />
<img width="1533" height="771" alt="Screenshot 2026-09-25 012221" src="https://github.com/user-attachments/assets/1d290757-0e76-4df0-8f81-e46ffbe34f48" />
<img width="1530" height="770" alt="Screenshot 2026-09-25 012235" src="https://github.com/user-attachments/assets/f832310c-b950-412d-bc7d-aa0322c8705b" />
<img width="1535" height="772" alt="Screenshot 2026-09-25 012342" src="https://github.com/user-attachments/assets/57072430-28ea-4fba-bf87-b6d2388d8d7a" />
<img width="1535" height="771" alt="Screenshot 2026-09-25 012408" src="https://github.com/user-attachments/assets/60836d91-00e6-4bad-ad6e-a01aa5c40605" />
<img width="1528" height="773" alt="Screenshot 2026-09-25 012504" src="https://github.com/user-attachments/assets/6b4e6ad2-8202-4623-9ab3-cfbe7d96bbda" />
<img width="1535" height="776" alt="Screenshot 2026-09-25 012615" src="https://github.com/user-attachments/assets/46c1eae5-f586-4981-9bef-ac737c34f4e3" />
<img width="1535" height="767" alt="Screenshot 2026-09-25 012642" src="https://github.com/user-attachments/assets/e67b03cf-3e24-414e-8d6c-b7380def2ae4" />
<img width="1535" height="773" alt="Screenshot 2026-09-25 012702" src="https://github.com/user-attachments/assets/9538d971-3655-4ecf-a87c-019a12ef9027" />
<img width="1535" height="757" alt="Screenshot 2026-09-25 012727" src="https://github.com/user-attachments/assets/5bf00848-4af5-4e1c-b79e-4a90d1484f15" />
<img width="1530" height="768" alt="Screenshot 2026-09-25 012919" src="https://github.com/user-attachments/assets/f98c108a-9e0f-4ee1-ba1e-e789225cff26" />


[View Project Report](./docs/AI_Interview_Report%20(6).pdf)











---

##  Installation

Clone the repository and install the required dependencies.

```bash
git clone https://github.com/kunaal-singh/interviewIQ.git

cd 3.interviewIQ

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

---

##  Environment Variables

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

>  **Note:** Never commit your `.env` files or expose API keys publicly.

---

##  Run Locally

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

##  How It Works

1. Users sign in securely using Google Authentication.
2. Upload their resume in PDF format.
3. AI analyzes the resume and generates personalized interview questions.
4. Users practice technical and HR interview rounds.
5. AI evaluates responses and provides detailed feedback.
6. Credits are deducted for premium features.
7. Additional credits can be purchased securely via Razorpay.
8. Interview reports and history are saved for future review.

---

##  Lessons Learned

- Built a production-ready AI SaaS application by integrating OpenRouter AI for personalized interview generation, intelligent feedback, and AI-powered voice interviews to create an interactive mock interview experience.
- Designed and implemented a scalable credit-based subscription system with Razorpay, enabling secure payments, premium plan management, and seamless monetization.
- Strengthened expertise in Firebase Authentication, PDF processing with Multer, RESTful API development, MongoDB optimization, and responsive UI design using React and Framer Motion.
- Gained hands-on experience in architecting a full-stack MERN application with modular backend services, cloud deployment on Render, and efficient state management for a real-world SaaS product.
- Improved understanding of building scalable, maintainable, and user-centric applications by combining AI, payment gateways, authentication, and modern frontend technologies into a cohesive platform.

---

##  Future Enhancements

-  Live Coding Interview Environment
-  Multi-language Support
-  Recruiter Dashboard
-  Email Interview Reports
-  AI Career Recommendations

---

##  About Me

I'm a passionate Full-Stack Developer with a strong foundation in the MERN stack and a keen interest in building AI-powered SaaS applications that solve real-world problems. I enjoy transforming innovative ideas into scalable, user-centric products by integrating modern technologies such as artificial intelligence, cloud services, authentication systems, and payment gateways.

My experience includes developing end-to-end applications involving AI automation, browser automation, resume analysis, SEO analytics, secure authentication, subscription-based monetization, and RESTful APIs. I continuously explore emerging technologies to build impactful solutions with clean architecture, intuitive user experiences, and production-ready scalability.

---

##  Links

- LinkedIn: [kunal-singh-b6a87128b](https://www.linkedin.com/in/kunal-singh-b6a87128b/)
