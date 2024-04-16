import { useEffect, useState } from "react";
import { fetchGeoQs, fetchScienceQs } from "../../utils/testApi";

function MyComponent() {
  const [geoQuestions, setGeoQuestions] = useState([]);
  const [scienceQuestions, setScienceQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchGeoQs(), fetchScienceQs()]).then(
      ([geoData, scienceData]) => {
        setGeoQuestions(geoData);
        setScienceQuestions(scienceData);
        setIsLoading(false);
      }
    );
  }, []);

  if (isLoading) <p>Page Loading...</p>;
  return (
    <div>
      <h2>Geography Questions</h2>
      <ul>
        {geoQuestions.map((question, index) => (
          <li key={index}>
            {console.log(question, "<--- questions")}
            <strong>Question:</strong> {question.question}
            <br />
            <strong>Correct Answer:</strong> {question.correct_answer}
          </li>
        ))}
      </ul>
      <h2>Science Questions</h2>
      <ul>
        {scienceQuestions.map((question, index) => (
          <li key={index}>
            {console.log(question, "<--- questions")}
            <strong>Question:</strong> {question.question}
            <br />
            <strong>Correct Answer:</strong> {question.correct_answer}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyComponent;
