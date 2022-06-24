import axios from 'axios';

export const GET_RECIPES = 'GET_RECIPES';
export const GET_DIETS = 'GET_DIETS';
export const FILTER_BY_DIETS = 'FILTER_BY_DIETS';

// función para traer todas las recetas //
export function getRecipes() {
    return async function (dispatch) {
        try {
            let allRecipes = await axios.get('http://localhost:3001/recipes');
            console.log('actions', allRecipes.data)
            return dispatch({
                type: GET_RECIPES,
                payload: allRecipes.data
            });
        } catch (error) {
            console.log('Fail actions.getRecipes', error);
        };
    };
};

// función para traer todas las dietas //
export function getDiets() {
    return async function (dispatch) {
        try {
            let allDiets = await axios.get('http://localhost:3001/diets');
            return dispatch({
                type: GET_DIETS,
                payload: allDiets.data
            });
        } catch (error) {
            console.log('Fail actions.getDiets', error);
        };
    };
};

export function filterByDiets(payload) {
    return {
        type: FILTER_BY_DIETS,
        payload
    };
};