import { useState, useRef } from "react";

export default function InteractiveQuizCard({ quizzes }) {
  let [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(quizzes[index]);
  const [lock, setLock] = useState(false);
  const [result, setResult] = useState(false);

  const OptionOne = useRef(null);
  const OptionTwo = useRef(null);
  const OptionThree = useRef(null);
  const OptionFour = useRef(null);

  const optionArr = [OptionOne, OptionTwo, OptionThree, OptionFour];

  const checkAnswer = (e, ans) => {
    if (lock === false) {
      if (question.correct_answer === ans) {
        e.target.classList.add("correct");
        setLock(true);
      } else {
        e.target.classList.add("incorrect");
        setLock(true);
        optionArr[
          question.choices.indexOf(question.correct_answer)
        ].current.classList.add("correct");
      }
    }
  };

  const nextQ = () => {
    if (lock === true) {
      if (index === quizzes.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(quizzes[index]);
      setLock(false);
      optionArr.map((option) => {
        option.current.classList.remove("incorrect");
        option.current.classList.remove("correct");
      });
    }
  };

  const resetQ = () => {
    setIndex(0);
    setQuestion(quizzes[0]);
    setLock(false);
    setResult(false);
  };

  return (
    <div className="quiz-card-container">
      <div className="quiz-card">
        {result ? (
          <></>
        ) : (
          <>
            <h1 className="quiz-card-question interactive-question">
              {index + 1}. {question.question}
            </h1>
            <ul className="interactive-quiz-list-container">
              <li
                ref={OptionOne}
                onClick={(e) => {
                  return checkAnswer(e, question.choices[0]);
                }}
              >
                {question.choices[0]}
              </li>
              <li
                ref={OptionTwo}
                onClick={(e) => {
                  return checkAnswer(e, question.choices[1]);
                }}
              >
                {question.choices[1]}
              </li>
              <li
                ref={OptionThree}
                onClick={(e) => {
                  return checkAnswer(e, question.choices[2]);
                }}
              >
                {question.choices[2]}
              </li>
              <li
                ref={OptionFour}
                onClick={(e) => {
                  return checkAnswer(e, question.choices[3]);
                }}
              >
                {question.choices[3]}
              </li>
            </ul>
            <button onClick={nextQ}>Next Question</button>
          </>
        )}
        {result ? (
          <>
            <h2>Well done for completing the quiz</h2>
            <button onClick={resetQ}>Reset</button>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

//need to bring the quiz card format from the ViewQuiz.jsx and the handleChoice functionality from this page when actually interacting and using the quizzes, this page should just become the navigation page to view quizzes, edit quizzes, delete quizzes
