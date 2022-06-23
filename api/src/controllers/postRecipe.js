const { Type, Recipe } = require('../db')

// CREAR RECETAS //
const createRecipes = async (req, res) => {
    try {
        const { title, summary, healthScore, analyzedInstructions, image, diets } = req.body;

        //busco si la receta ya existe //
        let findByRecipe = await Recipe.findOne({
            where: {
                title,
                summary,
                healthScore
            }
        })

        // busco todos los tipos de dietas //
        let addtype = await Type.findAll({ where: { diets } });

        if (!findByRecipe) {
            let newRecipe = await Recipe.create({
                image,
                title,
                summary,
                healthScore,
                analyzedInstructions,
            })
            await newRecipe.addType(addtype);
            res.send('Recipe Created');

        } else {
            await findByRecipe.addType(addtype);
            res.send('This Recipe is exists');
        }
    } catch (error) {
        res.status(404).send('Post to Recipes Fail...')
    }
};
module.exports = { createRecipes };