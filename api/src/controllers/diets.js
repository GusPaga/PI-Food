const { Diet, Recipe } = require('../db')
const { apiKey } = process.env;
const axios = require('axios');



let getDiets = async (req, res) => {
    try {
        const dbDiet = await Diet.findAll({ include: Recipe })
        res.json(dbDiet);

    } catch (error) {
        res.status(404).send('get Diet fail!', error)
    }
}

const getApiDiets = async () => {
    try {
        const apiInfo = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=100&addRecipeInformation=true`)).data;

        //RECETA //
        let data = apiInfo.results

        //MAPEO DIETS, UNO LAS CADENAS Y ELIMINO LOS ESPACIOS VACIOS, LUEGO LOS SEPARO POR LA COMA PARA QUE ME DEVUELVA UN ARRAY DE STRINGS //
        let diets = data.map((e) => e.diets)
        let joinReplace = diets.join(', ').replace(/ /g, "");
        let separeted = joinReplace.split(",");

        //FILTRAR REPETIDOS //
        let filtrados = separeted.filter((item, index, arr) => arr.indexOf(item) === index)

        //ELIMINO EL VACIO //
        let filtered = filtrados.filter((e) => e.length)
        //console.log(filtered)

        function correction(filtered) {
            switch (filtered) {
                case "glutenfree":
                    return "gluten free";
                case "dairyfree":
                    return "dairy free";
                case "lactoovovegetarian":
                    return "lacto ovo vegetarian";
                case "vegan":
                    return "vegan";
                case "paleolithic":
                    return "paleolithic";
                case "primal":
                    return "primal";
                case "whole30":
                    return "whole 30";
                case "pescatarian":
                    return "pescatarian";
                case "ketogenic":
                    return "ketogenic";
                case "fodmapfriendly":
                    return "fod map friendly";
                default:
                    return;
            }
        }

        let result = [];
        for (let i = 0; i < filtered.length - 1; i++) {
            result.push((correction(filtered[i])))
        }

        let diet = result.sort()
    
        // ENVIAR DATOS A LA BASE //
        for (let i = 0; i < diet.length - 1; i++) {
            await Diet.findOrCreate({
                where: { name: diet[i] }
            })
        }

    } catch (error) {
        console.log('getApiDiets fail!', error)
    }
};

// //BUSCAR RECETAS POR DIETA //
// const recipeByDiet = async (req, res) => {
//     const { diet } = req.query;
//     try {
//         if (!name) {
//             res.send('Do not Write name')
//         } else if (name) {

//             // BUSCAR RECETAS EN LA DB //
//             let findDb = await Recipe.findAll({
//                 include: [{
//                     model: Diet,
//                 }]
//             })
//             let dbRecipes = findDb.map((e) => {
//                 return {
//                     title: e.title,
//                     id: e.id,
//                     diet: e.diets,
//                     image: e.image.length ? e.image : "image not available",
//                     summary: e.summary.length ? e.summary : "Summary not available",
//                     healthScore: e.healthScore,
//                     analyzedInstructions: e.analyzedInstructions.length ? e.analyzedInstructions : "Analyze not available",
//                 }
//             })

//             filterDb = await dbRecipes.filter((e) => {
//                 if (FindNeedle(e.title.toLowerCase(), name.toLowerCase()) > -1) {
//                     return (e);
//                 }
//             })
//             // BUSCAR RECETAS EN LA API //
//             const apiInfo = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=100&addRecipeInformation=true`)).data
//             let data = apiInfo.results;
//             let apiRecipes = data.map((e) => {
//                 return {
//                     title: e.title,
//                     id: e.id,
//                     diet: e.diets.length ? e.diets : "Diet not available",
//                     image: e.image,
//                     summary: e.summary.length ? e.summary : "Summary not available",
//                     healthScore: e.healthScore,
//                     analyzedInstructions: e.analyzedInstructions.length ? e.analyzedInstructions[0].steps.map((e) => e.step) : ["Analize no available"],
//                 }
//             })
//             filterApi = await apiRecipes.filter((e) => {
//                 if (FindNeedle(e.title.toLowerCase(), name.toLowerCase()) > -1) {
//                     return (e);
//                 }
//             })

//             const totalRecipes = filterDb.concat(filterApi);
//             console.log(totalRecipes)
//             res.send(totalRecipes)

//         } else {
//             res.status(400).send('Do not exists this Recipe!')
//         }
//     } catch (error) {
//         res.status(400).send({ 'Fail recipeByName': error });
//     }
// };

module.exports = { getDiets, getApiDiets };