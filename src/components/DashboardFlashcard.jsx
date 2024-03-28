import FlashcardDashboard from "../cards/FlashcardDashboard";
import { CSSTransition } from "react-transition-group";
import { useState } from "react";

function DashboardFlashcard({ frontText, backText }) {
  const [showFront, setShowFront] = useState(true);
  return (
    <div className="flippable-card-container dashboard-flashcard">
      <CSSTransition in={showFront} timeout={300} classNames="flip">
        <FlashcardDashboard
          frontText={frontText}
          backText={backText}
          onClick={() => {
            setShowFront((flipped) => !flipped);
          }}
        />
      </CSSTransition>
    </div>
  );
}
export default DashboardFlashcard;
