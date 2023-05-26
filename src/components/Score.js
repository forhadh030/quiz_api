import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Score() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { questions, selectedAnswers } = state || {};

  if (!questions || !selectedAnswers) {
    navigate('/');
    return null;
  }

  const calculateScore = () => {
    let score = 0;

    for (let i = 0; i < questions.length; i++) {
      const correctAnswer = questions[i].correct_answer;
      const selectedAnswer = selectedAnswers[i];

      if (correctAnswer === selectedAnswer) {
        score++;
      }
    }

    return score;
  };

  const totalQuestions = questions.length;
  const correctAnswers = calculateScore();

  const handleViewResult = () => {
    navigate('/result', { state: { questions, selectedAnswers } });
  };

  const handleTryAgain = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Quiz Score</h1>
      <p>You got {correctAnswers}/{totalQuestions} question(s) right.</p>
      <button onClick={handleViewResult}>View Result</button>
      <button onClick={handleTryAgain}>Try Again</button>
    </div>
  );
}

export default Score;