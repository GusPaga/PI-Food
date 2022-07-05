import React from "react";
import { useDispatch } from "react-redux";
import { findByTitle } from "../redux/actions";
import "./SearchBar.css";

export default function SearchBar({ setPage, name, setName }) {
  const dispatch = useDispatch();

  // FUNCIÓN PARA CAPTURAR EL INPUT Y EVITAR QUE SE RECARGUE LA PÁGINA//
  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }

  //FUNCIÓN PARA DESPACHAR BUSQUEDA POR TÍTULO DE RECETA//
  //TAMBIEN EVITA QUE SE DISPARE EL PEDIDO SI EL INPUT ESTA VACIO//
  function handleSubmit(e) {
    e.preventDefault();
    if (name === "") {
      alert("must write an recipe");
      return;
    }
    dispatch(findByTitle(name));
    setPage(1);
    setName("");
  }

  return (
    <div className="searchB">
      <input
      className="search-filtros-select"
        value={name}
        type="text"
        placeholder="write a Recipe..."
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        FIND
      </button>
    </div>
  );
}
