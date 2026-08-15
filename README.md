# AI Interview Simulator

An AI-powered technical interview simulator built with **Node.js, Express.js, EJS, and Google Gemini API**.

The application lets a user choose a technical role and interview difficulty, generates five interview questions using Gemini, collects the user's answers one by one, and then generates a detailed performance report with scores, strengths, weak areas, improvement tips, and recommended topics.

## 🚀 Live Demo

**Try the application:**  
https://ai-interview-simulator-e0im.onrender.com

> The live demo is hosted on Render. On a free web service, the first request after a period of inactivity may take some time while the service starts.

## ✨ Features

- Select an interview role:
  - Frontend Developer
  - Backend Developer
- Select interview difficulty:
  - Easy
  - Medium
  - Hard
- AI-generated set of 5 interview questions
- Questions presented one at a time
- User answers collected during the interview
- AI evaluates all five question-answer pairs
- Detailed final report including:
  - Overall score
  - Question-wise scores
  - Strengths
  - Weak areas
  - Improvement tips
  - Recommended topics
  - Final feedback
- Responsive UI for desktop and mobile
- Gemini API integration handled through the Express backend

## 🧠 How It Works

The application uses a two-stage AI workflow.

### 1. Question Generation

```text
Role + Difficulty
        ↓
Express Backend
        ↓
Gemini API
        ↓
5 Interview Questions
        ↓
Interview UI
```

### 2. Interview Evaluation

```text
5 Questions + 5 Answers
        ↓
Express Backend
        ↓
Gemini API
        ↓
Structured Evaluation
        ↓
Final Report
```

The Gemini responses are requested in a structured JSON format so the backend can reliably process the results and render them with EJS.

## 🛠️ Tech Stack

### Frontend

- HTML5
- CSS3
- EJS
- Vanilla JavaScript

### Backend

- Node.js
- Express.js

### AI

- Google Gemini API
- `@google/genai` Node.js SDK
- Structured JSON responses

### Deployment

- Render

### Development

- Git
- GitHub
- npm

## 📁 Project Structure

```text
ai-interview-simulator/
│
├── public/
│   └── css/
│       └── style.css
│
├── views/
│   ├── index.ejs
│   ├── interview.ejs
│   └── report.ejs
│
├── index.js
├── package.json
├── package-lock.json
├── .gitignore
├── .env.example
└── README.md
```

> `node_modules/` and `.env` are intentionally excluded from the repository.

## ⚙️ Run Locally

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd ai-interview-simulator
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create the environment file

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key
```

You can use `.env.example` as a reference.

### 4. Start the server

```bash
npm start
```

The application should be available at:

```text
http://localhost:8080
```

## 🔐 Environment Variables

The application requires:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Never commit your real `.env` file or API key to GitHub.

The `.gitignore` file excludes:

```text
.env
node_modules/
```

## 🔄 Application Flow

```text
Home Page
   ↓
Select Role + Difficulty
   ↓
POST /start
   ↓
Generate 5 Questions with Gemini
   ↓
Interview Page
   ↓
POST /answer
   ↓
Store Each Answer
   ↓
After Question 5
   ↓
/finish
   ↓
Send All Questions + Answers to Gemini
   ↓
Generate Final Report
   ↓
/report
   ↓
Render report.ejs
```

## 📊 Final Report

The report focuses on actionable feedback, not only a final score.

It includes:

```text
Overall Score
Question-wise Scores
Strengths
Weak Areas
Improvement Tips
Recommended Topics
Final Feedback
```

## ⚠️ Current Limitations

This project is currently a lightweight prototype.

- Interview state is stored in server memory.
- There is no user authentication.
- There is no persistent database.
- Multiple simultaneous users are not isolated from one another.
- Interview history is not saved permanently.
- Voice, webcam, and speech features are not included.

## 🔮 Future Improvements

Possible future additions include:

- User authentication
- Database-backed interview history
- Persistent sessions
- Adaptive interview difficulty
- Resume-based question generation
- Voice input and text-to-speech
- Company-specific interview modes
- Performance analytics across multiple interviews
- Personalized learning roadmaps
- Better multi-user session management
- RocketRide AIDE integration for multi-step AI orchestration

## 🎯 Project Purpose

This project was built as a practical learning project while learning backend development with Node.js and Express.js.

It focuses on practicing:

- HTTP request/response flow
- Express routing
- EJS rendering
- Server-side state handling
- External API integration
- Prompt design
- Structured AI responses
- Error handling
- Deployment

## 📄 License

This project is licensed under the **MIT License**.
