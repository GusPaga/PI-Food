const { Type, Recipe } = require('../db')
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
                attributes: ['id', 'title', 'summary', 'healthScore', 'analyzedInstructions', 'image'],
                include: [{
                    model: Type,
                }]
            })
            let dbRecipes = findDb.map((e) => {
                return {
                    id: e.id,
                    title: e.title,
                    summary: e.summary,
                    healthScore: e.healthScore,
                    diets: e.diets,
                    analyzedInstructions: e.analyzedInstructions,
                    image: e.image
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
                    id: e.id,
                    title: e.title,
                    summary: e.summary,
                    healthScore: e.healthScore,
                    diets: e.diets,
                    analyzedInstructions: (e.analyzedInstructions.map((e) => (e.steps.map(e => e.step)))),
                    image: e.image
                }
            })

            let filterApi = apiRecipes.filter((e) => e.id === Number(id))
            res.send(filterApi);
        }
    } catch (error) {
        res.status(404).send('Fail recipeById', error)
    }
};

const allRecipe = async (req, res) => {
    try {
        // BUSCAR RECETAS EN LA DB //
        let findDb = await Recipe.findAll({
            attributes: ['id', 'title', 'summary', 'healthScore', 'analyzedInstructions', 'image'],
            include: [{
                model: Type,
            }]
        })
        let dbRecipes = findDb.map((e) => {
            return {
                id: e.id,
                title: e.title,
                summary: e.summary,
                healthScore: e.healthScore,
                diets: e.diets,
                analyzedInstructions: e.analyzedInstructions,
                image: e.image
            }
        })

        // BUSCAR RECETAS EN LA API //
        const apiInfo = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=100&addRecipeInformation=true`)).data
        let data = apiInfo.results;
        let apiRecipes = data.map((e) => {
            return {
                id: e.id,
                title: e.title,
                summary: e.summary,
                healthScore: e.healthScore,
                diets: e.diets,
                analyzedInstructions: (e.analyzedInstructions.map((e) => (e.steps.map(e => e.step)))),
                image: e.image
            }
        })

        const totalRecipes = dbRecipes.concat(apiRecipes);
        //console.log(totalRecipes)
        res.send(totalRecipes)
    } catch (error) {
        res.status(404).send('Fail allRecipe', error)
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
                attributes: ['id', 'title', 'summary', 'healthScore', 'analyzedInstructions', 'image'],
                include: [{
                    model: Type,
                }]
            })
            let dbRecipes = findDb.map((e) => {
                return {
                    id: e.id,
                    title: e.title,
                    summary: e.summary,
                    healthScore: e.healthScore,
                    diets: e.diets,
                    analyzedInstructions: e.analyzedInstructions,
                    image: e.image
                }
            })

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
                    id: e.id,
                    title: e.title,
                    summary: e.summary,
                    healthScore: e.healthScore,
                    diets: e.diets,
                    analyzedInstructions: (e.analyzedInstructions.map((e) => (e.steps.map(e => e.step)))),
                    image: e.image
                }
            })
            filterApi = await apiRecipes.filter((e) => {
                if (FindNeedle(e.title.toLowerCase(), name.toLowerCase()) > -1) {
                    return (e);
                }
            })

            const totalRecipes = filterDb.concat(filterApi);
            res.send(totalRecipes)

        } else {
            res.status(404).send('Do not exists this Recipe!')
        }
    } catch (error) {
        res.status(404).send('Fail recipeByName', error);
    }
};

module.exports = { allRecipe, recipeByName, recipeById };
