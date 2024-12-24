export default function pagination({ totalItems, totalPages, cuurentPage }) {
  const pagination = [];
  for (let i = 1; i <= totalPages; i++) {
    pagination.push(i);
  }
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {pagination.map((pageNumber) => (
          <li key={pageNumber} className="page-item active" aria-current="page">
            <span className="page-link">{pageNumber}</span>
          </li>
        ))}
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
