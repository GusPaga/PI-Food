import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import { getRecipes, getDiets, filterByDiets } from "../redux/actions";
import './Home.css';

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes); //traer estado del reducer
  const allDiets = useSelector((state) => state.diets);

  console.log("state.recipes", allRecipes);

  // CARGAR TODAS LAS RECETAS EN EL ESTADO //
  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  // CARGAR TODAS LAS DIETAS EN EL ESTADO //
  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  // BOTÓN PARA BORRAR TODOS LOS FILTROS //
  function handleClick(e) {
    e.preventDefault();
    // setActivity("");
    // setName("");
    dispatch(getRecipes());
  }

  //PAGINADO//

  const [page, setPage] = useState(1);

  //cantidad paises por página
  let recipesPerPage = 0;
  if (page === 1) {
    recipesPerPage = 9;
  } else if (page !== 1) {
    recipesPerPage = 10;
  }

  //índice del ultimo país de página
  const indexOfLastRecipe = page * recipesPerPage; //10, 20, 30, 40

  //índice de el primer país de la pagina
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage; // 0, 10, 20, 30

  // me devuelve un array con los indices seleccionedos ej: pág 1 index 0 a 10, pág 2 index 10 a 20, )
  const currentRecipe = allRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const paginado = (pageNumber) => {
    setPage(pageNumber);
  };
  //ESTADO LOCAL PARA FILTRAR POR DIETA//
  const [diets, setDiets] = useState("");

  //ESTADO LOCAL PARA SEGÚN EL FILTRO//
  const [, setOrder] = useState("");

  //FUNCIÓN PARA ORDENAR POR DIETA
  function handleFilterByDiet(e) {
    dispatch(filterByDiets(e.target.value));
    setPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  return (
    <div className="home">
      <nav className="home-nav">
        <div className="home-logo">
          <img
            src="https://assets.soyhenry.com/henry-landing/assets/Henry/logo-white.png"
            alt="logo Henry"
            height="20px"
            width="100px"
          ></img>
        </div>

        <div>
        <Paginado 
      page={page}
      recipesPerPage={recipesPerPage}
      totalRecipe={allRecipes.length}
      paginado={paginado}
      />
        </div>

        <div className="home-buttons">
          <Link to="/activities">
            <button>CREATE</button>
          </Link>
          <Link to="/">
            <button>LANDING</button>
          </Link>
        </div>
      </nav>

      <div className="home-search">
        <button
          onClick={(e) => {
            handleClick(e);
          }}
        >
          CLEAR
        </button>
      </div>

      <p>Diet</p>
      <select value={diets} onChange={(e) => handleFilterByDiet(e)}>
        <option value="">All</option>
        {allDiets.map((e) => (
          <option value={e.diet} key={e.id}>
            {e.diet}
          </option>
        ))}
      </select>

      <div className="home-tarjetas">
        {currentRecipe.length
          ? currentRecipe?.map((e) => {
              return (
                <Link to={"/home/" + e.id} key={e.id}>
                  <Card title={e.title} image={e.image} diet={e.diets} />
                </Link>
              );
            })
          : alert("¡IN THIS MOMENT DO NOT EXISTS THIS RECIPE!")}
      </div>
      
    </div>
  );
}
