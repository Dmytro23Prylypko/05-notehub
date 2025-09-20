import { createPortal } from "react-dom";
import css from "./Modal.module.css"
import NoteForm from "../NoteForm/NoteForm";
import { useEffect } from "react";
import type { Note } from "../../types/note";

interface ModalProps {
  onClose: () => void;
  onSubmit: (newNote: Note) => void;
}

function Modal({ onClose, onSubmit }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    }
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div onClick={handleBackdropClick} className={css.backdrop} role="dialog" aria-modal="true">
      <div className={css.modal}>
        <NoteForm onClose={onClose} onSubmit={onSubmit} />
      </div>
    </div>,
    document.body
  );
}

export default Modal;
