import {
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";
import {  fetchNotes } from "../../services/noteService";
import Pagination from "../Pagination/Pagination";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { useDebounce } from "use-debounce";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import NotFound from "../NotFound/NotFound";
import NoteForm from "../NoteForm/NoteForm";

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

  const onSearch = (text: string) => {
    setSearchQuery(text);
    setCurrentPage(1);
  };

  const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={onSearch} />
        {data && data?.totalPages > 1 && <Pagination
          currentPage={currentPage}
          onPageChange={onPageChange}
          pageCount={data?.totalPages ?? 0}
        />}
        <button className={css.button} onClick={() => setIsOpen(true)}>
          Create note +
        </button>
        {isOpen && (
          <Modal onClose={onClose}>
            <NoteForm onClose={onClose} />
          </Modal>
        )}
      </header>
      {isError && <Error />}
      {data && data?.notes.length > 0 ? (
        <NoteList notes={data?.notes} />
      ) : data && (
        <NotFound />
      )}
      {isLoading && <Loader />}
    </div>
  );
}

export default App;
