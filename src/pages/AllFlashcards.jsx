import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { deleteFlashcard } from "../../utils/flashcardApi";
import { fetchFlashcards } from "../../utils/flashcardApi";
import FlippableCard from "../components/FlippableCard";
import Nav from "../components/Nav";
import Pagination from "../components/Pagination";

export default function AllFlashcards() {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // const flashcardsRef = useRef(null);

  useEffect(() => {
    fetchFlashcards().then((data) => {
      setFlashcards(data);
      setIsLoading(false);
    });
  }, []);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentCards = flashcards.slice(firstPostIndex, lastPostIndex);
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
    const newFlashList = flashcards.filter((card) => {
      return card.flashcard_id !== id;
    });
    setFlashcards(newFlashList);
    deleteFlashcard(id);
    setConfirmDelete(false);
  }

  if (confirmDelete) {
    document.body.classList.add("modal-open");
  } else {
    document.body.classList.remove("modal-open");
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);
  const returnToQuizzes = () => {
    navigate("/flashcards");
  };
  if (isLoading) <p>Page Loading...</p>;
  return (
    <section>
      <Nav />
      <div className="return_btn_container">
        <button className="return_to_prev_page_btn" onClick={returnToQuizzes}>
          Return
        </button>
      </div>
      <div className="links-listedcards-container topic-page-container">
        {currentCards.map((flashcard) => {
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
        {flashcards.length > postsPerPage ? (
          <Pagination
            totalPosts={flashcards.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        ) : null}
      </div>
    </section>
  );
}
