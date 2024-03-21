import { useState, useRef, useEffect } from "react";
import "../test.css";

export default function TestPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("This is some text");
  const textareaRef = useRef(null);

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  }, [text]);

  return (
    <div className="container">
      <div className="box">
        <textarea
          className={`textarea ${isEditing ? "editing" : "not-editing"}`}
          value={text}
          onChange={handleChange}
          ref={textareaRef}
          readOnly={!isEditing} // Make textarea read-only when not editing
        />
        <button onClick={handleToggleEdit}>
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
}
