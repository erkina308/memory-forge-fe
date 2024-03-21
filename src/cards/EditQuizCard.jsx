import { deleteQuiz } from "../../utils/quizzesApi";
import { useNavigate } from "react-router-dom";
export default function EditQuizCard({ quiz }) {
  const navigate = useNavigate();
  //   const { question, choices, correct_answer } = quiz;
  // const [isEditing, setIsEditing] = useState(false);
  // const [question, setQuestion] = useState(quiz.question);
  // const [choices, setChoices] = useState([...quiz.choices]);
  // const [correctAnswer, setCorrectAnswer] = useState(quiz.correct_answer);

  function handleQuizDelete(e, id) {
    e.preventDefault();

    const newQuizList = quizzes.filter((quiz) => {
      return quiz.quiz_id !== id;
    });
    setQuizzes(newQuizList);
    deleteQuiz(id);
  }

  return (
    <div className="quiz-card-container">
      <div className="quiz-card">
        <div>
          <h1 className="quiz-card-question">Question: {quiz.question}</h1>
        </div>
        <div className="quiz-card-choice-container">
          <div>
            <h1 className="quiz-card-choices">Choices: </h1>
          </div>
        </div>
        <div className="quiz-card-list-container">
          {quiz.choices.map((choice) => {
            return (
              <div key={choice}>
                <div className="quiz-card-list">
                  <ul>
                    <li>{choice}</li>
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <h2 className="quiz-card-answer">
            Correct answer: {quiz.correct_answer}
          </h2>
        </div>
        <div>
          <button
            className="edit-quiz-button"
            onClick={() => {
              navigate("/quizzes/edit-quiz", { state: { quiz } });
            }}
          >
            Edit Quiz
          </button>
          <button
            className="edit-quiz-button"
            onClick={(e) => handleQuizDelete(e, quiz.quiz_id)}
          >
            Delete Quiz
            {/* This needs to have a confirm popup, to confirm whether the user really wants to delete the quiz */}
          </button>
        </div>
      </div>
    </div>
    // <div className="quiz-card-container">
    //   <div className="quiz-card">
    //     <div>
    //       <h1 className="quiz-card-question">Question: {quiz.question}</h1>
    //     </div>
    //     <div className="quiz-card-choice-container">
    //       <div>
    //         <h1 className="quiz-card-choices">Choices: </h1>
    //       </div>
    //     </div>
    //     <div className="quiz-card-list-container">
    //       {quiz.choices.map((choice) => {
    //         return (
    //           <div key={choice}>
    //             <div className="quiz-card-list">
    //               <ul>
    //                 <li>{choice}</li>
    //               </ul>
    //             </div>
    //           </div>
    //         );
    //       })}
    //     </div>
    //     <div>
    //       <h2 className="quiz-card-answer">
    //         Correct answer: {quiz.correct_answer}
    //       </h2>
    //     </div>
    //     <div>
    //       <button
    //         className="edit-quiz-button"
    //         onClick={() => {
    //           navigate("/quizzes/edit-quiz", { state: { quiz } });
    //         }}
    //       >
    //         Edit Quiz
    //       </button>
    //       <button
    //         className="edit-quiz-button"
    //         onClick={(e) => handleQuizDelete(e, quiz.quiz_id)}
    //       >
    //         Delete Quiz
    //         {/* This needs to have a confirm popup, to confirm whether the user really wants to delete the quiz */}
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
}

// function QuizCard({ quiz, handleEdit }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [question, setQuestion] = useState(quiz.question);
//   const [choices, setChoices] = useState([...quiz.choices]);
//   const [correctAnswer, setCorrectAnswer] = useState(quiz.correct_answer);

//   const handleSave = () => {
//     setIsEditing(false);
//     handleEdit({
//       ...quiz,
//       question: question,
//       choices: choices,
//       correct_answer: correctAnswer,
//     });
//   };

//   return (
//     <div className="quiz-card-container">
//       <div className="quiz-card">
//         <div>
//           <h1 className="quiz-card-question">
//             Question:{" "}
//             {isEditing ? (
//               <input
//                 type="text"
//                 value={question}
//                 onChange={(e) => setQuestion(e.target.value)}
//               />
//             ) : (
//               quiz.question
//             )}
//           </h1>
//         </div>
//         <div className="quiz-card-choice-container">
//           <div>
//             <h1 className="quiz-card-choices">Choices: </h1>
//           </div>
//         </div>
//         <div className="quiz-card-list-container">
//           {choices.map((choice, index) => (
//             <div key={index} className="quiz-card-list">
//               <ul>
//                 <li>
//                   {isEditing ? (
//                     <input
//                       type="text"
//                       value={choice}
//                       onChange={(e) => {
//                         const updatedChoices = [...choices];
//                         updatedChoices[index] = e.target.value;
//                         setChoices(updatedChoices);
//                       }}
//                     />
//                   ) : (
//                     choice
//                   )}
//                 </li>
//               </ul>
//             </div>
//           ))}
//         </div>
//         <div>
//           <h2 className="quiz-card-answer">
//             Correct answer:{" "}
//             {isEditing ? (
//               <input
//                 type="text"
//                 value={correctAnswer}
//                 onChange={(e) => setCorrectAnswer(e.target.value)}
//               />
//             ) : (
//               quiz.correct_answer
//             )}
//           </h2>
//         </div>
//         <div>
//           <button
//             className="edit-quiz-button"
//             onClick={() => setIsEditing(!isEditing)}
//           >
//             {isEditing ? "Cancel" : "Edit Quiz"}
//           </button>
//           {isEditing && (
//             <button className="edit-quiz-button" onClick={handleSave}>
//               Save
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
