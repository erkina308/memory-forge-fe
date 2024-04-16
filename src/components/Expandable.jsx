import { useState } from "react";

export default function Expandable({ text, children }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleOpen() {
    setIsOpen((currentState) => !currentState);
  }

  return (
    <div className="expandable_button_container">
      <button className="expandable_button" onClick={toggleOpen}>
        {text}
      </button>
      <div className={`expandable_content ${isOpen ? "open" : "closed"}`}>
        {children}
      </div>
    </div>
  );
}
