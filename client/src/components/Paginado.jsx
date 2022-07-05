import React from "react";
import "./Paginado.css";

export default function Paginado({
  paginado,
  recipesPerPage, //recetas por página
  totalRecipe, //total de recetas
  page, //pagina actual
}) {
  return (
    <div className="paginado">
      {page > 1 && <button onClick={(e) => paginado(page - 1)}>PREV</button>}
      <button>{page}</button>
      {page < totalRecipe / recipesPerPage && (
        <button onClick={(e) => paginado(page + 1)}>NEXT</button>
      )}
    </div>
  );
}
