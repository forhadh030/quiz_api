import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizContainer from './components/main';
import Result from './components/Result';
import Score from './components/Score';
import './App.css';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizContainer />} />
        <Route path="/result" element={<Result />} />
        <Route path="/score" element={<Score score={5} totalQuestions={10} />} />
      </Routes>
    </Router>
  );
}

export default App;