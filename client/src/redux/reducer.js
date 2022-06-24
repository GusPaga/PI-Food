import { GET_RECIPES, GET_DIETS, FILTER_BY_DIETS } from './actions';

const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
    allDiets: [],
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

        case FILTER_BY_DIETS:
            const diets = state.diets;
            const filteredDiets = diets.filter((e) => e.diet === action.payload)
            let recipes = filteredDiets.map((e) => {
                return {
                    image: e.recipes.image,
                    name: e.recipes.name,
                    diet: e.recipes.diet
                }
            })
            return {
                ...state,
                recipes: recipes,
                allDiets: filteredDiets,
            }

        default:
            return { ...state }
    }
};

