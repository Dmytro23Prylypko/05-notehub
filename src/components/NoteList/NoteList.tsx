import type { Note } from "../../types/note";
import css from "./NoteList.module.css";

interface NoteProps {
  notes: Note[];
  handleDelete: (noteId: string) => void;
}

function NoteList({ notes, handleDelete }: NoteProps) {
  return (
    <ul className={css.list}>
      {notes.map(({title, content, tag, id}) => (
        <li key={id} className={css.listItem}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.content}>{content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{tag}</span>
            <button onClick={() => handleDelete(id as string)} className={css.button}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;
