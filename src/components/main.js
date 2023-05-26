import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchQuizQuestions } from '../utils/QuizQuestions';
import { resetSessionToken } from '../utils/apiHelpers';
import './styles.css';
import './buttons.css';

function QuizContainer() {
  let token = "7bcba69739534b16e41f6ec038c6bedb856aea1358639d871183edf181cf285d";
  resetSessionToken(`${token}`);

  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // New state variable

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchQuizQuestions()
          .then((data) => {
            console.log('API Response:', data);
            if (data.response_code === 0) {
              const initialSelectedAnswers = data.results.map(() => null);
              setQuestions(data.results);
              setSelectedAnswers(initialSelectedAnswers);
            } else {
              console.error('API Error:', data);
              if (data.response_code === 4) {
                // Handle the case when no questions are available
                setErrorMessage('No questions available. Please try again later.');
              } else {
                // Handle other API errors
                setErrorMessage('An error occurred while fetching questions.');
              }
            }
          })
          .catch((error) => {
            console.error('Error:', error);
            setErrorMessage('An error occurred while fetching questions.');
          });
      } catch (error) {
        console.error('Error:', error);
        setErrorMessage('An error occurred while fetching questions.');
      }
    };

    fetchData();
  }, []);

  const handleAnswerSelection = (index, answer) => {
    setSelectedAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index] = answer;
      return updatedAnswers;
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      setSubmitted(true);
      navigate('/score', {
        state: { questions, selectedAnswers },
      });
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className='container'>
      <div className='ribbon'>
      <h1>Welcome to the Quiz Game!</h1>
        {errorMessage && <p>{errorMessage}</p>}
        {questions.length > 0 && (
          <div>
            <h3>Question {currentQuestionIndex + 1}</h3>
            <p>{questions[currentQuestionIndex].question}</p>
            <ul>
              {questions[currentQuestionIndex].incorrect_answers.map(
                (answer, ansIndex) => (
                    <li
                      key={ansIndex}
                      onClick={() => handleAnswerSelection(currentQuestionIndex, answer)}
                    >
                      {answer}
                    </li>
                )
              )}
              <li
                onClick={() =>
                  handleAnswerSelection(
                    currentQuestionIndex,
                    questions[currentQuestionIndex].correct_answer
                  )
                }
              >
                {questions[currentQuestionIndex].correct_answer}
              </li>
            </ul>
            <p>Selected Answer: {selectedAnswers[currentQuestionIndex]}</p>
          </div>
        )}
        <div className='buttons'>
          <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
            Previous
          </button>
          <button onClick={handleNextQuestion} disabled={submitted}>
            {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizContainer;