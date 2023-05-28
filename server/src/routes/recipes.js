import RecipeModel from "../models/Recipes";
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/Users.js';




const router = express.Router();




router.get('/', async (req, res) => {
    const recipes = await RecipeModel.find();
    res.json(recipes);
});

router.post('/', async (req, res) => {
    const { name, ingredients, instructions, imageUrl, cookingTime,userOwner } = req.body;
   
    const newRecipe = new RecipeModel({ name , ingredients, instructions, imageUrl, cookingTime, userOwner});

    await newRecipe.save();
    res.json(newRecipe);
});
router.put('/', async (req, res) => {
  const { recipeId, userId } = req.body;

  try {
    const recipe = await RecipeModel.findById(recipeId);
    const user = await UserModel.findById(userId);

    if (!recipe || !user) {
      return res.status(404).json({ error: 'Recipe or user not found' });
    }

    user.savedRecipes.push(recipe);
    await user.save();

    res.json({ savedRecipes: user.savedRecipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

  


router.get('/saved/ids:userId', async (req, res) => {
    
    const user = await UserModel.findById(req.body.userId)
    res.json({savedRecipes: user?.savedRecipes});
});

router.get('/saved', async (req, res) => {

    const user = await UserModel.findById(req.body.userId)
    const savedRecipes = await RecipeModel.find({_id: {$in: user.savedRecipes}});

    res.json({savedRecipes});
});




        












export  {router as recipesRouter};