const { Diet, Recipe } = require('../db')

// CREAR RECETAS //
const createRecipes = async (req, res) => {
    try {
        const { title, summary, healthScore, analyzedInstructions, image, diet } = req.body;

        //busco si la receta ya existe //
        let findByRecipe = await Recipe.findOne({
            where: {
                title,
                summary,
                healthScore
            }
        })

        // busco todos los tipos de dietas //
        let addDiet = await Diet.findAll({ where: {name:diet} });

        if (!findByRecipe) {
            let newRecipe = await Recipe.create({
                image,
                title,
                summary,
                healthScore,
                analyzedInstructions,
            })
            await newRecipe.addDiet(addDiet);
            res.send('Recipe Created');

        } else {
            await findByRecipe.addDiet(addDiet);
            res.send('This Recipe is exists');
        }
    } catch (error) {
        res.status(404).send('Post to Recipes Fail...')
    }
};
module.exports = { createRecipes };