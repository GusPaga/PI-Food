import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDiets, recipesCreator } from "../redux/actions";
import "./Form.css";

function validate(input) {
  let errors = {};
  if (!input.title) {
    errors.title = "Write a title!";
  } else if (!input.healthScore) {
    errors.healthScore = "Write a HealthScore";
  } else if (input.healthScore < 0 || input.healthScore > 101) {
    errors.healthScore = "Write a number beetween 1 and 100";
  } else if (!input.summary) {
    errors.summary = "Write a litle Summary";
  } else if (!input.analyzedInstructions) {
    errors.analyzedInstructions = "Write the Instructions";
  } else if (!input.diet) {
    errors.season = "Select type of Diet";
  }
  return errors;
}

export default function Form() {
  //LISTADO DE DIETAS //
  const diets = useSelector((state) => state.diets);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    title: "",
    diet: [],
    summary: "",
    healthScore: "",
    analyzedInstructions: "",
  });

  // FUNCIÓN PARA CARGAR LAS DIETAS EN EL REDUCER //
  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !input.title ||
      !input.diet.length ||
      !input.summary ||
      !input.healthScore ||
      !input.analyzedInstructions ||
      Object.values(errors).filter((e) => e !== "").length > 0
    ) {
      alert("hay campos vacios o con errores!!");
      return;
    }
    dispatch(recipesCreator(input));
    setInput({
      title: "",
      diet: [],
      summary: "",
      healthScore: "",
      analyzedInstructions: "",
    });
    console.log("input", input);
    alert("Receta Creada con Exito");
  }

  //FUNCIÓN PARA CAPTURAR LOS VALORES DE SELECT DE DIETS //
  function handleSelect(e) {
    const currentIndex = input.diet.indexOf(e.target.value);
    if (currentIndex === -1 && e.target.value !== "") {
      setInput({
        ...input,
        diet: [...input.diet, e.target.value],
      });
    }
  }

  // función para borrar la selección de dietas//
  function onClose() {
    setInput({
      ...input,
      diet: [],
    });
  }

  //FUNCIÓN PARA CAPTURAR LA INFO DE LOS INPUTS //
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  return (
    <div>
      <nav className="act-nav">
        <div className="act-logo">
          <img
            src="https://assets.soyhenry.com/henry-landing/assets/Henry/logo-white.png"
            alt="logo Henry"
            height="20px"
            width="100px"
          ></img>
        </div>
        <div className="act-buttons">
          <Link to={"/home"}>
            <button>HOME</button>
          </Link>
          <Link to={"/landing"}>
            <button>LANDING</button>
          </Link>
        </div>
      </nav>
      <h1>CREATE YOUR SELF RECIPE!</h1>

      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="div">
          <label>NAME OF THE RECIPE</label>
          <input
            type="text"
            name="title"
            value={input.title}
            onChange={(e) => handleChange(e)}
          />

          <label>HEALTH SCORE</label>
          <input
            type="number"
            min={1}
            max={100}
            name="healthScore"
            value={input.healthScore}
            onChange={(e) => handleChange(e)}
          />

          <label>SUMMARY</label>
          <input
            type="text"
            name="summary"
            value={input.summary}
            onChange={(e) => handleChange(e)}
          />

          <label>STEP BY STEP</label>
          <input
            type="text"
            name="analyzedInstructions"
            value={input.analyzedInstructions}
            onChange={(e) => handleChange(e)}
          />

          <div className="div">
            <label>TYPE OF DIET</label>
            <select
              onChange={(e) => handleSelect(e)}
              defaultValue=""
              className="selects"
            >
              <option name="" disabled>
                Select Diet
              </option>
              {diets?.map((e) => (
                <option value={e.name} key={e.id}>
                  {e.name}
                </option>
              ))}
            </select>

            <ul className="div">
              <li>
                {input.diet.length > 0 &&
                  input.diet.map((e) => <p key={e.id}>{e}</p>)}
                {input.diet.length > 0 && (
                  <button onClick={(e) => onClose(e)}>Clear All Diet</button>
                )}
              </li>
            </ul>
          </div>
          {errors.diet && <p className="errors">{errors.diet}</p>}
          {errors.title && <p className="errors">{errors.title}</p>}
          {errors.summary && <p className="errors">{errors.summary}</p>}
          {errors.healthScore && <p className="errors">{errors.healthScore}</p>}
          {errors.analyzedInstructions && (
            <p className="errors">{errors.analyzedInstructions}</p>
          )}
        </div>
        <button>CREATE</button>
      </form>
    </div>
  );
};

//RESUMEN: Importar React en el componente, crear la acción y el caso del reducer, luego, crear los componentes del form; botones, inputs, titulos, etc. Después darle funcionalidad, creando los estados y los handles necesarios.
//Luego de probar que funcione todo hacer las validaciones.
