const Quiz = require("../models/Quiz");

const getQuiz = async (req, res) => {
  try {
    const questions = await Quiz.find().select("-correctAnswer");
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: "Answers array is required" });
    }

    let score = 0;
    const results = [];

    for (const answer of answers) {
      const question = await Quiz.findById(answer.questionId);
      if (!question) continue;

      const isCorrect = question.correctAnswer === answer.selectedAnswer;
      if (isCorrect) score++;

      results.push({
        questionId: answer.questionId,
        question: question.question,
        selectedAnswer: answer.selectedAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
      });
    }

    const total = answers.length;
    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

    res.json({ score, total, percentage, results });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getQuiz, submitQuiz };
