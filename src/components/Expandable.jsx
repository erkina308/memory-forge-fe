import { useState, useEffect, useRef } from "react";

export default function Expandable({ text, children, arrayProp }) {
  const [isOpen, setIsOpen] = useState(false);
  const arr = children.props[arrayProp];
  const previousSizeOfArr = useRef(0);

  function toggleOpen() {
    setIsOpen((currentState) => !currentState);
  }

  useEffect(() => {
    if (arr.length > previousSizeOfArr.current) {
      setIsOpen(false);
    }
    previousSizeOfArr.current = arr.length;
  }, [arr, isOpen]);

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
