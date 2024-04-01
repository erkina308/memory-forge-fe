import Card from "../cards/Card";
import { CSSTransition } from "react-transition-group";
import { useState } from "react";

export default function FlippableCard({ card }) {
  const [showFront, setShowFront] = useState(true);
  return (
    <div className="flippable-card-container">
      <CSSTransition in={showFront} timeout={300} classNames="flip">
        <Card
          card={card}
          onClick={() => {
            setShowFront((flipped) => !flipped);
          }}
        />
      </CSSTransition>
    </div>
  );
}
