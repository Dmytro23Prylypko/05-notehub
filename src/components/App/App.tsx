import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";
import { createNote, deleteNote, fetchNotes } from "../../services/noteService";
import Pagination from "../Pagination/Pagination";
import { useState } from "react";
import Modal from "../Modal/Modal";
import type { Note } from "../../types/note";
import { useDebounce } from "use-debounce";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import NotFound from "../NotFound/NotFound";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue] = useDebounce(searchQuery, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", currentPage, searchValue],
    queryFn: () => fetchNotes(currentPage, searchValue),
    placeholderData: keepPreviousData,
  });

  const onClose = () => setIsOpen(false);

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (newNote: Note) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes", currentPage, searchQuery],
      });
      setIsOpen(false);
    },
  });

  const onSubmit = (newNote: Note) => {
    createMutation.mutate(newNote);
  };

  const deleteMutation = useMutation({
    mutationFn: (noteId: string) => deleteNote(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes", currentPage, searchQuery],
      });
    },
  });

  const handleDelete = (noteId: string) => {
    deleteMutation.mutate(noteId);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setCurrentPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox handleSearch={handleSearch} />
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageCount={data?.totalPages ?? 0}
        />
        <button className={css.button} onClick={() => setIsOpen(true)}>
          Create note +
        </button>
        {isOpen && <Modal onClose={onClose} onSubmit={onSubmit} />}
      </header>
      {isError && <Error />}
      {data && data?.notes.length > 1 && !isLoading ? (
        <NoteList notes={data?.notes} handleDelete={handleDelete} />
      ) : (
        <NotFound />
      )}
      {isLoading && <Loader />}
    </div>
  );
}

export default App;
