import React from "react";
import ReactPaginate from "react-paginate";

type PaginationProps = {
  page: number;
  pageCount: number;
  onPageChange: (keyList: number | string, selected: number) => void;
  keyList: number | string;
};

const Pagination: React.FC<PaginationProps> = ({ page, pageCount, onPageChange, keyList }) => {
  return (
    <ReactPaginate
      forcePage={page}
      nextLabel=">"
      pageRangeDisplayed={1}
      className="mx-auto flex w-full flex-row items-center justify-center space-x-3 text-base"
      activeClassName="bg-zinc-300 dark:bg-zinc-700 rounded font-bold"
      breakClassName="hidden md:inline-block"
      pageLinkClassName="p-2"
      onPageChange={(event) => onPageChange(keyList, event?.selected + 1)}
      pageCount={pageCount || 1}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
