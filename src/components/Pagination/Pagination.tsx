import css from "./Pagination.module.css";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

function Pagination({
  pageCount,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const maxPageIndex = Math.max(pageCount - 1, 0);
  const safeForcePage = Math.min(Math.max(currentPage - 1, 0), maxPageIndex);

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="→"
      onPageChange={({ selected }) => setCurrentPage(selected + 1)}
      forcePage={safeForcePage}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="←"
      renderOnZeroPageCount={null}
      activeClassName={css.active}
      containerClassName={css.pagination}
    />
  );
}

export default Pagination;
