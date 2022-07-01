const { Diet, Recipe } = require('../db')
const { apiKey } = process.env;
const axios = require('axios');


function FindNeedle(haystack, needle) {
    for (let i = 0; i < haystack.length; i++) {
        if (haystack.slice(i, needle.length + i) === needle) return i;
    }
    return -1;
};

const recipeById = async (req, res) => {
    const { id } = req.params;
    try {
        if (isNaN(Number(id))) {
            // BUSCAR RECETAS EN LA DB //
            let findDb = await Recipe.findAll({
                include: {
                    model: Diet
                }
            })
            let dbRecipes = findDb.map((e) => {
                return {
                    title: e.title,
                    id: e.id,
                    diet: e.diets,
                    image: e.image.length ? e.image : "image not available",
                    summary: e.summary.length ? e.summary : "Summary not available",
                    healthScore: e.healthScore,
                    analyzedInstructions: e.analyzedInstructions.length ? e.analyzedInstructions : "Analyze not available",
                }
            })
            filterDb = await dbRecipes.filter((e) => {
                if (FindNeedle(e.id, id) > -1) {
                    return (e);
                }
            })
            res.send(filterDb);
        } else {
            // BUSCAR RECETAS EN LA API //
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
                diet: e.diets,
                image: e.image,
                summary: e.summary,
                healthScore: e.healthScore,
                analyzedInstructions: e.analyzedInstructions,
            }
        })

        const totalRecipes = dbRecipes.concat(apiRecipes);
        //console.log('recipes test', totalRecipes)
        res.send(totalRecipes)
    } catch (error) {
        res.status(400).send({ "Fail allRecipe": error })
    }
}

//BUSCAR RECETAS POR NOMBRE //
const recipeByName = async (req, res) => {
    const { name } = req.query;
    try {
        if (!name) {
            res.send('Do not Write name')
        } else if (name) {

            // BUSCAR RECETAS EN LA DB //
            let findDb = await Recipe.findAll({
                include: [{
                    model: Diet,
                }]
            })
            let dbRecipes = findDb.map((e) => {
                return {
                    title: e.title,
                    id: e.id,
                    diet: e.diets,
                    image: e.image.length ? e.image : "not available",
                    summary: e.summary.length ? e.summary : "not available",
                    healthScore: e.healthScore,
                    analyzedInstructions: e.analyzedInstructions.length ? e.analyzedInstructions : "Analyze not available",
                }
            })
            //console.log('filter DB', dbRecipes)

            filterDb = await dbRecipes.filter((e) => {
                if (FindNeedle(e.title.toLowerCase(), name.toLowerCase()) > -1) {
                    return (e);
                }
            })
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
            filterApi = await apiRecipes.filter((e) => {
                if (FindNeedle(e.title.toLowerCase(), name.toLowerCase()) > -1) {
                    return (e);
                }
            })
            //console.log('filter api', apiRecipes)

            const totalRecipes = filterDb.concat(filterApi);
            res.send(totalRecipes)

        } else {
            res.status(400).send('Do not exists this Recipe!')
        }
    } catch (error) {
        res.status(400).send({ 'Fail recipeByName': error });
    }
};

module.exports = { allRecipe, recipeByName, recipeById };
