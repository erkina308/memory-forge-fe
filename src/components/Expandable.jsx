import { useState } from "react";

export default function Expandable({ text, children }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleOpen() {
    setIsOpen((currentState) => !currentState);
  }

  return (
    <div>
      <button onClick={toggleOpen}>{text}</button>
      {isOpen ? children : null}
    </div>
  );
}
