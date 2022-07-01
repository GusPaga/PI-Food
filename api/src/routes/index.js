const { Router } = require('express');
const { getDiets } = require('../controllers/diets');
const { allRecipe, recipeByName, recipeById, } = require('../controllers/recipes');
const {createRecipes}= require('../controllers/postRecipe');

const router = Router();

router.get('/diets', getDiets);
router.get('/recipes', allRecipe);
router.get('/recipe', recipeByName);
router.get('/recipes/:id', recipeById);
router.post('/recipes', createRecipes);

module.exports = router;