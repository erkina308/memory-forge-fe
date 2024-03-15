import { useState } from "react";

export default function Expandable({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleOpen() {
    setIsOpen((currentState) => !currentState);
  }

  return (
    <div>
      <button onClick={toggleOpen}>Make new flashcard</button>
      {isOpen ? children : null}
    </div>
  );
}
