const { Diet, Recipe } = require('../db')
const { apiKey } = process.env;
const axios = require('axios');


const recipeById = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        if (isNaN(Number(id))) {
            // FIND RECIPES IN DB//
            let findDb = await Recipe.findByPk(id, {
                include: {
                    model: Diet
                }
            })
            let dbRecipes = findDb.map((e) => {
                return {
                    title: e.title,
                    id: e.id,
                    diet: e.diets.map((e) => e.name),
                    image: e.image,
                    summary: e.summary,
                    healthScore: e.healthScore,
                    analyzedInstructions: e.analyzedInstructions,
                }
            })
            res.send(dbRecipes);

        } else {
            //FIND RECIPES IN API//
            const apiInfo = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=100&addRecipeInformation=true`)).data
            let data = apiInfo.results;
            let apiRecipes = data.map((e) => {
                return {
                    title: e.title,
                    id: e.id,
                    diet: e.diets.length ? e.diets : ["not available"],
                    image: e.image,
                    summary: e.summary.length ? e.summary : "Summary not available",
                    healthScore: e.healthScore,
                    analyzedInstructions: e.analyzedInstructions.length ? e.analyzedInstructions[0].steps.map((e) => e.step) : ["Analize no available"],
                }
            })

            let filterApi = apiRecipes.filter((e) => e.id === Number(id))
            res.send(filterApi);

        }
    } catch (error) {
        res.status(400).send({ 'Fail recipeById': error })
    }
};


module.exports = {recipeById};
