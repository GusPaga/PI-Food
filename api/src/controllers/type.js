const { Type, Recipe } = require('../db')
const { apiKey } = process.env;
const axios = require('axios');


let getDiets = async (req, res) => {
    try {
        const dbType = await Type.findAll({ include: Recipe })
        res.json(dbType);

    } catch (error) {
        res.status(404).send('get Diet fail!', error)
    }
}

const getApiType = async () => {
    try {
        const apiInfo = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=100&addRecipeInformation=true`)).data;

        //RECETA //
        let data = apiInfo.results

        //MAPEO DIETS, UNO LAS CADENAS Y ELIMINO LOS ESPACIOS VACIOS, LUEGO LOS SEPARO POR LA COMA PARA QUE ME DEVUELVA UN ARRAY DE STRINGS //
        let types = data.map((e) => e.diets)
        let joinReplace = types.join(', ').replace(/ /g, "");
        let separeted = joinReplace.split(",");

        //FILTRAR REPETIDOS //
        let filtrados = separeted.filter((item, index, arr) => arr.indexOf(item) === index)

        //ELIMINO EL VACIO //
        let filtered = filtrados.filter((e) => e.length)

        // ENVIAR DATOS A LA BASE //
        for (let i = 0; i < filtered.length - 1; i++) {
            await Type.findOrCreate({
                where: { diets: filtered[i] }
            })
        }
    } catch (error) {
        console.log('getApiType fail!', error)
    }
}

module.exports = { getDiets, getApiType };