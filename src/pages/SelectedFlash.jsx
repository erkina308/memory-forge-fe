import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteFlashcard } from "../../utils/flashcardApi";
import FlippableCard from "../components/FlippableCard";
import Nav from "../components/Nav";

export default function SelectedFlash() {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const flashcard = location.state.selectedCard;

  const confirmDeleteModal = () => {
    setConfirmDelete(true);
  };

  const cancelDeleteModal = () => {
    setConfirmDelete(false);
  };

  function handleFlashDelete(e, id) {
    e.preventDefault();
    deleteFlashcard(id);
    setConfirmDelete(false);
    navigate("/flashcards");
  }

  if (confirmDelete) {
    document.body.classList.add("modal-open");
  } else {
    document.body.classList.remove("modal-open");
  }

  return (
    <section>
      <Nav />
      <div className="selected_card_page">
        <FlippableCard card={flashcard} />
        <div className="selected_flash_btns_container">
          <div className="flash_edit_delete_btn_container">
            <button
              onClick={() =>
                navigate("/flashcards/edit-flashcard", { state: { flashcard } })
              }
              className="edit_flash_btn"
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
                  onClick={(e) => handleFlashDelete(e, flashcard.flashcard_id)}
                >
                  Yes
                </button>
                <button onClick={(e) => cancelDeleteModal()}>Cancel</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
