const { Router } = require('express');
const { getDiets } = require('../controllers/diets');
const { allRecipe } = require('../controllers/allRecipe');
const { recipeByName } = require('../controllers/recipesByName');
const { recipeById } = require('../controllers/recipesById');
const {createRecipes}= require('../controllers/postRecipes');

const router = Router();

router.get('/diets', getDiets);
router.get('/recipes', allRecipe);
router.get('/recipe', recipeByName);
router.get('/recipes/:id', recipeById);
router.post('/recipes', createRecipes);

module.exports = router;