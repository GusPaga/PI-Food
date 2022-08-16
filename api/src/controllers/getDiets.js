const { Diet, Recipe } = require('../db')
const { apiKey } = process.env;
const axios = require('axios');




let getDiets = async (req, res) => {
    try {
        const dbDiet = await Diet.findAll({ include: Recipe })
        res.status(200).json(dbDiet);

    } catch (error) {
        res.status(400).send('get Diet fail!', error)
    }
}

const getApiDiets = async () => {
    try {
        const apiInfo = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=100&addRecipeInformation=true`)).data;

        //RECIPE //
        let data = apiInfo.results

        //MAP DIETS //
        let diets = data.map((e) => e.diets)
        let joinReplace = diets.join(', ').replace(/ /g, "");
        let separeted = joinReplace.split(",");

        //ERASE REPETS //
        let filtrados = separeted.filter((item, index, arr) => arr.indexOf(item) === index)

        // ERASE EMPTY //
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

        // PUSH IN DB //
        for (let i = 0; i < diet.length - 1; i++) {
            await Diet.findOrCreate({
                where: { name: diet[i] }
            })
        }

    } catch (error) {
        console.log('getApiDiets fail!', error)
    }
};


module.exports = { getDiets, getApiDiets };