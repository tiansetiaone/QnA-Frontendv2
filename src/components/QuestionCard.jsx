import React from 'react';

const QuestionCard = ({ question }) => {
  return (
    <div className="question-card">
      <h3>{question.title}</h3>
      <p>{question.description}</p>
    </div>
  );
};

export default QuestionCard;
