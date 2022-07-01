import { GET_RECIPES, GET_DIETS, FILTER_BY_RECIPE_TITLE, ORDER_BY, FILTER_BY_DIETS, GET_DETAILS, CREATE_ACTIVITY, FILTER_BY_RECIPE_DIET } from './actions';

const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
    allDiets: [],
    details: [],
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {

        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload,
            }

        case GET_DIETS:
            return {
                ...state,
                diets: action.payload,
                allDiets: action.payload,
            }


        case FILTER_BY_RECIPE_TITLE:
            return {
                ...state,
                recipes: action.payload,
            }

        case FILTER_BY_RECIPE_DIET:
            return {
                ...state,
                recipes: action.payload,
            }

        case ORDER_BY:
            let orderArr;
            if (action.payload === 'A-Z') {
                orderArr = state.recipes.sort(function (a, b) {
                    if (a.title > b.title) {
                        return 1;
                    }
                    if (b.title > a.title) {
                        return -1;
                    }
                    return 0;
                })
            } else if (action.payload === 'Z-A') {
                orderArr = state.recipes.sort(function (a, b) {
                    if (a.title > b.title) {
                        return -1;
                    }
                    if (b.title > a.title) {
                        return 1;
                    }
                    return 0;
                })
            } else if (action.payload === 'Asc') {
                orderArr = state.recipes.sort(function (a, b) {
                    if (a.healthScore > b.healthScore) {
                        return 1;
                    }
                    if (b.title > a.title) {
                        return -1;
                    }
                    return 0;
                })
            } else if (action.payload === 'Des') {
                orderArr = state.recipes.sort(function (a, b) {
                    if (a.healthScore > b.healthScore) {
                        return -1;
                    }
                    if (b.title > a.title) {
                        return 1;
                    }
                    return 0;
                })
            }
            return {
                ...state,
                recipes: orderArr
            }
        case FILTER_BY_DIETS:
            let allDiets = state.allRecipes;
            let filteredDiet = action.payload === 'all' ? allDiets : allDiets.filter((e) => e.diet?.includes(action.payload)) 
            return {
                ...state,
                recipes: filteredDiet
            }

        case GET_DETAILS:
            return {
                ...state,
                details: action.payload
            }

        case CREATE_ACTIVITY:
            return {
                ...state
            }

        default:
            return { ...state }
    }
};



