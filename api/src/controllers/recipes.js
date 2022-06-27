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
                    id: e.id,
                    diet: e.diets,
                    image: e.image,
                    title: e.title,
                    summary: e.summary,
                    healthScore: e.healthScore,
                    analyzedInstructions: e.analyzedInstructions,
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
                    diet: e.diets,
                    image: e.image,
                    title: e.title,
                    summary: e.summary,
                    healthScore: e.healthScore,
                    analyzedInstructions: (e.analyzedInstructions.map((e) => (e.steps.map(e => e.step)))),
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
          // BUSCAR RECETAS EN LA API //
          const apiInfo = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=100&addRecipeInformation=true`)).data
          let data = apiInfo.results;
          let apiRecipes = data.map((e) => {
              return {
                  id: e.id,
                  diet: e.diets,
                  title: e.title,
                  image: e.image,
                  summary: e.summary,
                  healthScore: e.healthScore,
                  analyzedInstructions: (e.analyzedInstructions.map((e) => (e.steps.map(e => e.step)))),
              }
          })
          console.log('apiRecipes', apiRecipes.length)
        // BUSCAR RECETAS EN LA DB //
        let findDb = await Recipe.findAll({
            include: {
                model: Diet
            }
        })
        let dbRecipes = findDb.map((e) => {
            return {
                id: e.id,
                diet: e.diets,
                image: e.image,
                title: e.title,
                summary: e.summary,
                healthScore: e.healthScore,
                analyzedInstructions: e.analyzedInstructions,
            }
        })
        console.log('Total Recipe in DB', findDb.length)    

        const totalRecipes = dbRecipes.concat(apiRecipes);
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
                include: [{
                    model: Diet,
                }]
            })
            let dbRecipes = findDb.map((e) => {
                return {
                    id: e.id,
                    title: e.title,
                    diets: e.diets,
                    image: e.image,
                    summary: e.summary,
                    healthScore: e.healthScore,
                    analyzedInstructions: e.analyzedInstructions,
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
                    diets: e.name,
                    title: e.title,
                    image: e.image,
                    summary: e.summary,
                    healthScore: e.healthScore,
                    analyzedInstructions: (e.analyzedInstructions.map((e) => (e.steps.map(e => e.step)))),
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
