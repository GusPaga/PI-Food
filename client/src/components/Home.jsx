import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getRecipes, getDiets, filterBydiets } from "../redux/actions";
import { Link } from "react-router-dom";
import Paginated from "./Paginated";
import Ordering from "./Ordering";
import SearchBar from "./SearchBar";
import Card from "./Card";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes); //traer estado del reducer
  //console.log("state.recipes", allRecipes);
  const allDiets = useSelector((state) => state.diets);
  // console.log("state.recipes", allDiets.length);

  // ESTADO PARA BUSCAR POR NOMBRE DE LAS RECETAS//
  const [name, setName] = useState("");

  //ESTADO LOCAL PARA ORDENAR SEGÚN EL FILTRO//
  const [, setOrder] = useState("");

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
    setName("");
    setPage(1);
    dispatch(getDiets());
    dispatch(getRecipes());
  }

  //FILTRAR RECETAS POR DIETA //
  function handleFilterBydiets(e) {
    e.preventDefault();
    dispatch(filterBydiets(e.target.value));
    //setOrder(`Ordenado ${e.target.value}`);
    setPage(1);
  }

  //PAGINADO//
  const [page, setPage] = useState(1);

  const paginado = (pageNumber) => {
    setPage(pageNumber);
  };

  //cantidad recetas por página
  let recipesPerPage = 0;
  if (page === 1) {
    recipesPerPage = 9;
  } else if (page > 1) {
    recipesPerPage = 10;
  }
  //índice del ultimo país de página
  const indexOfLastRecipe = page * recipesPerPage; //10, 20, 30, 40

  //índice de el primer país de la pagina
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage; // 0, 10, 20, 30

  // me devuelve un array con los indices seleccionedos ej: pág 1 index 0 a 10, pág 2 index 10 a 20, )
  const currentRecipe = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  //console.log("current", currentRecipe);


  return (
    // NAV-BAR
    //LOGO

    <div className="home">
      <nav className="home-nav">
        <div className="home-logo">
          <img
            src="https://assets.soyhenry.com/henry-landing/assets/Henry/logo-white.png"
            alt="logo Henry"
            height="20px"
            width="100px"
          />
        </div>

        {/* PAGINADO */}

        <div>
          <Paginated
            state={allRecipes}
            page={page}
            paginado={paginado}
            recipesPerPage={recipesPerPage}
          />
        </div>

        {/* NAVIGATION BUTTONS */}

        <div className="home-nav-buttons">
          <Link to="/form">
            <button>CREATE</button>
          </Link>
          <Link to="/">
            <button>LANDING</button>
          </Link>
        </div>
      </nav>

      <div className="home-filters">
        {/* FILTROS */}

        {/* DIET FILTER */}

        <select
          className="home-filtros-select"
          onChange={(e) => handleFilterBydiets(e)}
          >
          <option value="all">All Diets</option>

          {allDiets?.map((e) =>
            e.name ? (
              <option value={e.name} key={e.id}>
                {e.name}
              </option>
            ) : (
              <option value={e.name} key={e.id}>
                {e}
              </option>
            )
          )}
        </select>

        {/* ORDENAMIENTOS */}

        <Ordering setPage={setPage} setOrder={setOrder} />

          {/* FIND BY NAME FILTER */}
        <SearchBar
          setName={setName}
          setPage={setPage}
          setOrder={setOrder}
          name={name}
        />

        {/* CLEAR BUTTON */}

        <div className="home-clear-buttons">
          <button
            onClick={(e) => {
              handleClick(e);
            }}
          >
            CLEAR
          </button>
        </div>
      </div>

      {/* COMPONENT CARDS */}

      <div className="home-tarjetas">
        {currentRecipe.length ? (
          currentRecipe?.map((e) => {
            return (
              <Link to={"/home/" + e.id} key={e.id}>
                <Card title={e.title} image={e.image} diet={e.diet} />
              </Link>
            );
          })
        ) : (
          <h3>Await a few second..!</h3>
        )}
      </div>
    </div>
  );
}
