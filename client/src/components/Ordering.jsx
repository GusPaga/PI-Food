import React from "react";
import { useDispatch } from "react-redux";
import { orderBy } from "../redux/actions";

export default function Ordering({ setPage, setOrder }) {
  const dispatch = useDispatch();
  //ordenamientos alfa y healthScore
  function handleOrder(e) {
    e.preventDefault();
    dispatch(orderBy(e.target.value));
    setOrder(`Ordenado ${e.target.value}`);
    setPage(1);
  }

  return (
    <div className="home-filtros">
      <select className="home-filtros-select" onChange={(e) => handleOrder(e)}>
        <option value="A-Z">Name 🡇</option>
        <option value="Z-A">Name 🡅</option>
        <option value="Asc">Health Score 🡇</option>
        <option value="Des">Health Score 🡅</option>
      </select>
    </div>
  );
}
