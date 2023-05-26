import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { questions, selectedAnswers } = state || {};

  if (!questions || !selectedAnswers) {
    navigate('/');
    return null;
  }

  const handleTryAgain = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Quiz Result</h1>
      {questions.map((question, index) => (
        <div key={index}>
          <h3>Question {index + 1}</h3>
          <p>{question.question}</p>
          <p>Correct Answer: {question.correct_answer}</p>
          <p>Your Answer: {selectedAnswers[index]}</p>
        </div>
      ))}
      <button onClick={handleTryAgain}>Try Again</button>
    </div>
  );
}

export default Result;