const { Diet, Recipe } = require('../db')
const { apiKey } = process.env;
const axios = require('axios');


const allRecipe = async (req, res) => {
    try {
        // BUSCAR RECETAS EN LA API //
        const apiInfo = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=100&addRecipeInformation=true`)).data
        let data = apiInfo.results;
        let apiRecipes = data.map((e) => {
            return {
                title: e.title,
                id: e.id,
                diet: e.diets.length ? e.diets : ["not available"],
                image: e.image,
                summary: e.summary.length ? e.summary : "not available",
                healthScore: e.healthScore,
                analyzedInstructions: e.analyzedInstructions.length ? e.analyzedInstructions[0].steps.map((e) => e.step) : ["Analize no available"],
            }
        })
        //console.log('apiRecipes', apiRecipes)
        //BUSCAR RECETAS EN LA DB //
        let findDb = await Recipe.findAll({
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
                analyzedInstructions: [e.analyzedInstructions],
            }
        })

        const totalRecipes = dbRecipes.concat(apiRecipes);
        //console.log('recipes test', totalRecipes)
        res.send(totalRecipes)
    } catch (error) {
        res.status(400).send({ "Fail allRecipe": error })
    }
}

// const allRecipe = (req, res) => {
//     Recipe.findAll({
//         include: {
//             model: Diet
//         }
//     })
//         .then(response => {
//             response.map((e) => {
//                 return {
//                     title: e.title,
//                     id: e.id,
//                     diet: e.diets.map((e) => e.name),
//                     image: e.image,
//                     summary: e.summary,
//                     healthScore: e.healthScore,
//                     analyzedInstructions: [e.analyzedInstructions],
//                 }
//             })
//         }).catch(error=>console.log(error))
// }

module.exports = { allRecipe };

