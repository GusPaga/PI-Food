import React from "react";
import { useDispatch } from "react-redux";
import { findByTitle } from "../redux/actions";

//import "./SearchBar.css";

export default function SearchBar({ setPage, name, setName, setOrder }) {
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
      alert("must write an ingredient");
      return;
    }
    dispatch(findByTitle(name));
    setName("");
    setPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  return (
    <div>
      <input
        name={name}
        type="text"
        placeholder="write a Recipe..."
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Find
      </button>
    </div>
  );
}
