import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxPageButtons = 7; // Maximum number of page buttons to display

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage, endPage;

    if (totalPages <= maxPageButtons) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const maxPagesBeforeCurrentPage = Math.floor(maxPageButtons / 2);
      const maxPagesAfterCurrentPage = Math.ceil(maxPageButtons / 2) - 1;
      if (currentPage <= maxPagesBeforeCurrentPage) {
        startPage = 1;
        endPage = maxPageButtons;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        startPage = totalPages - maxPageButtons + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 mx-1 rounded ${
            currentPage === i
              ? "bg-red-600 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }

    if (startPage > 1) {
      pageNumbers.unshift(
        <button
          key="start-ellipsis"
          className="px-4 py-2 mx-1 rounded bg-gray-700 text-gray-300"
          disabled
        >
          ...
        </button>
      );
      pageNumbers.unshift(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`px-4 py-2 mx-1 rounded ${
            currentPage === 1
              ? "bg-red-600 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
        >
          1
        </button>
      );
    }

    if (endPage < totalPages) {
      pageNumbers.push(
        <button
          key="end-ellipsis"
          className="px-4 py-2 mx-1 rounded bg-gray-700 text-gray-300"
          disabled
        >
          ...
        </button>
      );
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`px-4 py-2 mx-1 rounded ${
            currentPage === totalPages
              ? "bg-red-600 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className="px-4 py-2 mx-1 rounded bg-gray-700 text-gray-300"
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="px-4 py-2 mx-1 rounded bg-gray-700 text-gray-300"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
