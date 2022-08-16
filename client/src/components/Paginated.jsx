import React from "react";
import "./styles/Paginated.css";

export default function Paginated({ state, page, paginado, recipesPerPage }) {
  return (
    <div className="paginated">
      {page > 1 && <button onClick={() => paginado(page - 1)}>🢀</button>}
      <button>{page}</button>
      {page < state.length / recipesPerPage && (
        <button onClick={() => paginado(page + 1)}>🢂</button>
      )}
    </div>
  );
}
