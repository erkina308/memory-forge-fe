import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchFlashcards } from "../../utils/flashcardApi";
import { deleteFlashcard } from "../../utils/flashcardApi";
import FlippableCard from "../components/FlippableCard";
import Nav from "../components/Nav";

export default function FlashcardTopicPage() {
  const [flashcardsByTopic, setFlashcardsByTopic] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const topic = searchParams.get("topic");

  useEffect(() => {
    fetchFlashcards(topic).then((data) => {
      setFlashcardsByTopic(data);
      setIsLoading(false);
    });
  }, []);

  //get the right id for the key when rendering, used in the .map below
  function getKey(instance) {
    if (instance.tempId) {
      return instance.tempId;
    } else {
      return instance.flashcard_id;
    }
  }

  const confirmDeleteModal = () => {
    setConfirmDelete(true);
  };

  const cancelDeleteModal = () => {
    setConfirmDelete(false);
  };

  function handleFlashDelete(e, id) {
    e.preventDefault();
    console.log(id, "<-- id in handleFlashDelete");

    const newFlashList = flashcardsByTopic.filter((card) => {
      return card.flashcard_id !== id;
    });
    setFlashcardsByTopic(newFlashList);
    deleteFlashcard(id);
    setConfirmDelete(false);
  }

  if (confirmDelete) {
    document.body.classList.add("modal-open");
  } else {
    document.body.classList.remove("modal-open");
  }

  if (isLoading) <p>Page Loading...</p>;
  return (
    <section>
      <Nav />
      <div style={{ marginTop: "8rem" }}>
        <button
          onClick={() => {
            navigate("/flashcards");
          }}
        >
          Back to flashcards
        </button>
      </div>

      <div className="links-listedcards-container topic-page-container">
        {flashcardsByTopic.map((flashcard) => {
          return (
            <div key={getKey(flashcard)}>
              <ul className="flashcard-list">
                <li>
                  <FlippableCard card={flashcard} />
                </li>
              </ul>
              <div className="flash_edit_delete_btn_container">
                <button
                  className="edit_flash_btn"
                  onClick={() =>
                    navigate("/flashcards/edit-flashcard", {
                      state: { flashcard },
                    })
                  }
                >
                  Edit
                </button>
                <button
                  className="edit_flash_btn"
                  onClick={(e) => confirmDeleteModal()}
                >
                  Delete
                </button>
                {confirmDelete && (
                  <div className="confirmation-modal">
                    <p>Are you sure you want to delete this flashcard?</p>
                    <button
                      onClick={(e) =>
                        handleFlashDelete(e, flashcard.flashcard_id)
                      }
                    >
                      Yes
                    </button>
                    <button onClick={(e) => cancelDeleteModal()}>Cancel</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
