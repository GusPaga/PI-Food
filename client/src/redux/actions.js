import axios from 'axios';

export const GET_RECIPES = 'GET_RECIPES';
export const GET_DIETS = 'GET_DIETS';
export const FILTER_BY_DIETS = 'FILTER_BY_DIETS';
export const FILTER_BY_RECIPE_TITLE = 'FILTER_BY_RECIPE_TITLE';
export const ORDER_BY = 'ORDER_BY';
export const GET_DETAILS = 'GET_DETAILS';
export const CREATE_ACTIVITY = 'CREATE_ACTIVITY'

// función para traer todas las recetas //
export function getRecipes() {
    return async function (dispatch) {
        try {
            let allRecipes = await axios.get('http://localhost:3001/recipes');
            //console.log('actions', allRecipes.data)
            return dispatch({
                type: GET_RECIPES,
                payload: allRecipes.data
            });
        } catch (error) {
            console.log({ 'Fail actions getRecipes': error });
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
            console.log({ 'Fail actions getDiets': error });
        };
    };
};

//función para buscar por nombre //
export function findByTitle(name) {
    return async function (dispatch) {

        try {
            let titles = await axios.get(`http://localhost:3001/recipe?name=${name}`)
            return dispatch({
                type: FILTER_BY_RECIPE_TITLE,
                payload: titles.data,
            })
        } catch (error) {
            console.log({ 'Fail actions findByTitle': error })
        }
    }
}

//función para ordenar por alfabeto y healthScore
export function orderBy(payload) {
    return {
        type: ORDER_BY,
        payload
    }
}

//FUNCIÓN PARA FILTRAR POR DIETAS
export function filterBydiets(payload) {
    return {
        type: FILTER_BY_DIETS,
        payload
    }
}

export function getDetails(id) {
    return async function (dispatch) {
        try {
            let details = await axios.get(`http://localhost:3001/recipes/${id}`);
            //console.log('actions getDetais', details.data[0])
            return dispatch({
                type: GET_DETAILS,
                payload: details.data[0]
            })
        } catch (error) {
            console.log({ 'Fail getDetails': error })
        }
    }
}

// ESTA FUNCIÓN RECIBE LA INFO DEL "FORM" y DESPACHA EL PEDIDO AL BACK CON LA INFO DEL FRONT(PAYLOAD) PARA CREAR LA RECETA
export function recipesCreator(payload) {
    return async function (dispatch) {
        try {
            console.log('pre-llamado', payload)
            let creator = await axios.post('http://localhost:3001/recipes', payload);
            console.log('post-llamado', creator)
            return dispatch({
                type: CREATE_ACTIVITY,
                payload: creator.data
            })
        } catch (error) {
            console.log({ 'Fail recipesCreator': error })   
        }
    };
};