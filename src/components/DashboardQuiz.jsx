import { useState, useRef } from "react";

export default function DashboardQuiz({ question, answers, correctAnswer }) {
  const [lock, setLock] = useState(false);

  const OptionOne = useRef(null);
  const OptionTwo = useRef(null);
  const OptionThree = useRef(null);
  const OptionFour = useRef(null);

  const optionArr = [OptionOne, OptionTwo, OptionThree, OptionFour];

  const checkAnswer = (e, ans) => {
    if (lock === false) {
      if (correctAnswer === ans) {
        e.target.classList.add("correct");
        setLock(true);
      } else {
        e.target.classList.add("incorrect");
        setLock(true);
        optionArr[answers.indexOf(correctAnswer)].current.classList.add(
          "correct"
        );
      }
    }
  };

  const resetQ = () => {
    setLock(false);
    optionArr.map((option) => {
      option.current.classList.remove("incorrect");
      option.current.classList.remove("correct");
    });
  };

  return (
    <div className="quiz-card-container dashboard-quiz">
      <div className="quiz-card">
        <h1 className="quiz-card-question interactive-question">{question}</h1>
        <ul className="interactive-quiz-list-container">
          <li
            ref={OptionOne}
            onClick={(e) => {
              return checkAnswer(e, answers[0]);
            }}
          >
            {answers[0]}
          </li>
          <li
            ref={OptionTwo}
            onClick={(e) => {
              return checkAnswer(e, answers[1]);
            }}
          >
            {answers[1]}
          </li>
          <li
            ref={OptionThree}
            onClick={(e) => {
              return checkAnswer(e, answers[2]);
            }}
          >
            {answers[2]}
          </li>
          <li
            ref={OptionFour}
            onClick={(e) => {
              return checkAnswer(e, answers[3]);
            }}
          >
            {answers[3]}
          </li>
        </ul>
        <button className="dashboard-reset-quiz-btn" onClick={resetQ}>
          Reset Quiz
        </button>
      </div>
    </div>
  );
}
