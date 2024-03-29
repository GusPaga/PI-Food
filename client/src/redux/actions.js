import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const GET_DIETS = "GET_DIETS";
export const FILTER_BY_DIETS = "FILTER_BY_DIETS";
export const FILTER_BY_RECIPE_TITLE = "FILTER_BY_RECIPE_TITLE";
export const ORDER_BY = "ORDER_BY";
export const GET_DETAILS = "GET_DETAILS";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const FILTER_BY_RECIPE_DIET = "FILTER_BY_RECIPE_DIET";

// función para traer todas las recetas //
export function getRecipes() {
  return async function (dispatch) {
    try {
      let allRecipes = await axios.get("/recipes");
      return dispatch({
        type: GET_RECIPES,
        payload: allRecipes.data,
      });
    } catch (error) {
      console.log({ "Fail actions getRecipes": error });
    }
  };
}

// función para traer todas las dietas //
// export function getDiets() {
//     return async function (dispatch) {
//         try {
//             let allDiets = await axios.get('http://localhost:3001/diets');
//             return dispatch({
//                 type: GET_DIETS,
//                 payload: allDiets.data
//             });
//         } catch (error) {
//             console.log({ 'Fail actions getDiets': error });
//         };
//     };
// };

export function getDiets() {
  return function (dispatch) {
    axios
      .get("/diets")
      .then((response) => {
        return dispatch({
          type: GET_DIETS,
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
  };
}

//función para buscar por nombre //
export function findByTitle(name) {
  return async function (dispatch) {
    try {
      let titles = await axios.get(`/recipe?name=${name}`);
      return dispatch({
        type: FILTER_BY_RECIPE_TITLE,
        payload: titles.data,
      });
    } catch (error) {
      console.log({ "Fail actions findByTitle": error });
    }
  };
}

export function getDetails(id) {
  return async function (dispatch) {
    try {
      let details = await axios.get(`/recipes/${id}`);
      //console.log('details', details.data[0])
      return dispatch({
        type: GET_DETAILS,
        payload: details.data[0],
      });
    } catch (error) {
      console.log({ "Fail action getDetails": error });
    }
  };
}
//función para ordenar por alfabeto y healthScore
export function orderBy(payload) {
  return {
    type: ORDER_BY,
    payload,
  };
}

// ESTA FUNCIÓN RECIBE LA INFO DEL "FORM" y DESPACHA EL PEDIDO AL BACK CON LA INFO DEL FRONT(PAYLOAD) PARA CREAR LA RECETA
export function recipesCreator(payload) {
  return async function (dispatch) {
    try {
      let creator = await axios.post("/recipes", payload);
      return dispatch({
        type: CREATE_ACTIVITY,
        payload: creator.data,
      });
    } catch (error) {
      console.log({ "Fail recipesCreator": error });
    }
  };
}

export function filterBydiets(payload) {
  return {
    type: FILTER_BY_DIETS,
    payload,
  };
}
