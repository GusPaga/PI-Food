const { Router } = require('express');
const { getDiets } = require('../controllers/getDiets');
const { allRecipe } = require('../controllers/allRecipe');
const { recipeById } = require('../controllers/recipesById');
const { createRecipes } = require('../controllers/postRecipes');
const { recipeByName } = require('../controllers/recipesByName');

const router = Router();

router.get('/diets', getDiets);
router.get('/recipes', allRecipe);
router.get('/recipe', recipeByName);
router.get('/recipes/:id', recipeById);
router.post('/recipes', createRecipes);

module.exports = router;