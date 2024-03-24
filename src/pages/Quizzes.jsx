import { useState, useEffect } from "react";
import { fetchQuizzes } from "../../utils/quizzesApi";
import { Link } from "react-router-dom";
import InteractiveQuizCard from "../cards/InteractiveQuizCard";

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0); //this needs to move to the start quiz page after making it
  const [question, setQuestion] = useState(quizzes[index]); //this needs to move to the start quiz page after making it

  useEffect(() => {
    fetchQuizzes().then((quizzes) => {
      setQuizzes(quizzes);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p>Page Loading...</p>;
  console.log(quizzes, "<-- within quiz page");
  console.log(question, "<--- ???");
  return (
    <section>
      <div>
        <Link to={"/quizzes/quiz"}>Start Quiz</Link>
      </div>
      <div>
        <Link to={"/quizzes/view-quizzes"}>View Questions and Answers</Link>
      </div>
      <div>{/* <Link to={"/quizzes/make-a-quiz"}>Make a Quiz</Link> */}</div>
      <div>
        <div className="quiz-card-container">
          <div className="quiz-card">
            <div className="interactive-quiz-container">
              <h1 className="quiz-card-question interactive-question">
                {index + 1}
                {question.question}
              </h1>
              <div className="interactive-quiz-card-grid">
                <ul>
                  <li>{question.choices[0]}</li>
                  <li>{question.choices[1]}</li>
                  <li>{question.choices[2]}</li>
                  <li>{question.choices[3]}</li>
                </ul>
                {/* {quiz.choices.map((choice, index) => {
                  return (
                    <div
                      className={`quiz-card-list interactive-card-list ${
                        correctChoiceClicked
                          ? "selected-correct-choice"
                          : "selected-incorrect-choice"
                      }`}
                      key={index}
                      onClick={() => handleChoice(choice)}
                    >
                      <ul>
                        <li>{choice}</li>
                      </ul>
                    </div>
                  );
                })} */}
              </div>
            </div>
          </div>
        </div>
        {/* {quizzes.map((quiz) => {
          return (
            <div key={quiz.quiz_id}>
              <InteractiveQuizCard
                quiz={quiz}
                quizAnswer={quiz.correct_answer}
              />
            </div>
          );
        })} */}
        <InteractiveQuizCard quizzes={quizzes} />
      </div>
      {/* this quiz.map should eventually leave this page */}
    </section>
  );
}
