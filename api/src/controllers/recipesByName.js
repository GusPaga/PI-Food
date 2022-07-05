const { Diet, Recipe } = require('../db')
const { apiKey } = process.env;
const axios = require('axios');

function FindNeedle(haystack, needle) {
    for (let i = 0; i < haystack.length; i++) {
        if (haystack.slice(i, needle.length + i) === needle) return i;
    }
    return -1;
};

//FIND RECIPES BY NAME //
const recipeByName = async (req, res) => {
    const { name } = req.query;
    try {
        if (!name) {
            res.send('Do not Write name')
        } else if (name) {

            //  FIND IN DB //
            let findDb = await Recipe.findAll({
                include: [{
                    model: Diet,
                }]
            })
            let dbRecipes = findDb.map((e) => {
                return {
                    title: e.title,
                    id: e.id,
                    diet: e.diets.map((e) => e.name),
                    image: e.image.length ? e.image : "not available",
                    summary: e.summary.length ? e.summary : "not available",
                    healthScore: e.healthScore,
                    analyzedInstructions: e.analyzedInstructions ? [e.analyzedInstructions] : ["not available"],
                }
            })
            //console.log('reciper db', dbRecipes)

            filterDb = await dbRecipes.filter((e) => {
                if (FindNeedle(e.title.toLowerCase(), name.toLowerCase()) > -1) {
                    return (e);
                }
            })
            // FIND IN API //
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

            //console.log('reciper api', apiRecipes)

            filterApi = await apiRecipes.filter((e) => {
                if (FindNeedle(e.title.toLowerCase(), name.toLowerCase()) > -1) {
                    return (e);
                }
            })

            const totalRecipes = filterDb.concat(filterApi);
            res.send(totalRecipes)

        } else {
            res.status(400).send('Do not exists this Recipe!')
        }
    }
    catch (error) {
        res.status(400).send({ 'Fail recipeByName': error });
    }
};

module.exports = { recipeByName };
