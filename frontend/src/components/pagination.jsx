import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pagination = [];
  for (let i = 1; i <= totalPages; i++) {
    pagination.push(i);
  }

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            aria-label="Previous"
            onClick={() => onPageChange(currentPage - 1)}
          >
            &laquo;
          </button>
        </li>
        {pagination.map((pageNumber) => (
          <li
            key={pageNumber}
            className={`page-item ${
              currentPage === pageNumber ? "active" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            aria-label="Next"
            onClick={() => onPageChange(currentPage + 1)}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
