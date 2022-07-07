const { Router } = require('express');
const { getDiets } = require('../controllers/getDiets');
const { allRecipe } = require('../controllers/allRecipe');
const { recipeById } = require('../controllers/recipeById');
const { recipeByName } = require('../controllers/recipesByName');
const { createRecipes } = require('../controllers/createRecipes');

const router = Router();

router.get('/diets', getDiets);
router.get('/recipes', allRecipe);
router.get('/recipe', recipeByName);
router.get('/recipes/:id', recipeById);
router.post('/recipes', createRecipes);

module.exports = router;