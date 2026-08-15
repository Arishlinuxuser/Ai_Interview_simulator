require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
const express = require("express");
const app = express();
const ejs = require("ejs");

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const port = 8080;

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(port, () => {
  console.log("server listening");
});

const interview = {
  role: null,
  difficulty: null,
  questions: [],
  answer: [],
  currentQuestion: 0,
  report: null,
};

// here's ai api integration work started

app.get("/test-ai", async (req, res) => {
  try {
    const prompt = `
You are conducting a technical interview.

Role: ${interview.role}
Difficulty: ${interview.difficulty}

Generate exactly 5 unique technical interview questions.

The questions must match the selected role and difficulty.

Do not ask duplicate or nearly identical questions.

Cover different concepts relevant to the role.

Do not provide answers or explanations.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            questions: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
          required: ["questions"],
        },
      },
    });

    const data = JSON.parse(response.text);
    interview.questions.push(...data.questions);
    res.redirect("/interview");
  } catch (error) {
    console.error(error);
    res.status(500).send("AI request failed");
  }
});

app.post("/start", (req, res) => {
  interview.questions = [];
  interview.answer = [];
  interview.currentQuestion = 0;
  interview.report = null;
  interview.role = req.body.role;
  interview.difficulty = req.body.difficulty;
  res.redirect("/test-ai");
});

app.get("/interview", (req, res) => {
  const questions = interview.questions;
  const index = interview.currentQuestion;

  res.render("interview.ejs", { questions, currentIndex: index });
});

app.post("/answer", (req, res) => {
  let { answer } = req.body;
  interview.answer.push(answer);
  console.log(interview.answer);
  interview.currentQuestion++;
  // res.send(`here's your answer : ${answer}`);
  if (interview.currentQuestion < 5) {
    console.log("yeah if statement is working");
    return res.redirect("/interview");
  }
  res.redirect("/finish");
});

app.get("/finish", async (req, res) => {
  try {
    const interviewData = interview.questions.map((question, index) => {
      return {
        question: question,
        answer: interview.answer[index],
      };
    });
    // console.log(interviewData);
    // res.send(`here's your questions and answer pair ${interviewData}`);
    const prompt = `
You are an expert technical interviewer and evaluator.

Role:
${interview.role}

Difficulty:
${interview.difficulty}

Evaluate all 5 candidate responses.

Score each answer from 0 to 20.
There must be exactly 5 questionScores.
Each score must be between 0 and 20.
The overallScore must equal the sum of the five question scores.

Identify:
- strengths
- weak areas
- improvement tips
- recommended topics

Then provide an overall score out of 100
and a final assessment.

Interview Data:

${JSON.stringify(interviewData, null, 2)}
        `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",

      contents: prompt,

      config: {
        responseMimeType: "application/json",

        responseSchema: {
          type: "object",

          properties: {
            overallScore: {
              type: "number",
            },

            questionScores: {
              type: "array",
              items: {
                type: "number",
              },
            },

            strengths: {
              type: "array",
              items: {
                type: "string",
              },
            },

            weakAreas: {
              type: "array",
              items: {
                type: "string",
              },
            },

            improvementTips: {
              type: "array",
              items: {
                type: "string",
              },
            },

            recommendedTopics: {
              type: "array",
              items: {
                type: "string",
              },
            },

            finalFeedback: {
              type: "string",
            },
          },
        },
      },
    });

    const report = JSON.parse(response.text);
    interview.report = report;
    res.redirect("/report");
  } catch (error) {
    console.error(error);

    res.status(500).send("Failed to generate interview report.");
  }
});

app.get("/report", (req, res) => {
  res.render("report", { report: interview.report });
});
