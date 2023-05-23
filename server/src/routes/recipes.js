import RecipeModel from "../models/Recipes";
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; 




const router = express.Router();



router.get('/', async (req, res) => {
    const recipes = await RecipeModel.find();
    res.json(recipes);
});

router.post('/', async (req, res) => {
    const { name, ingredients, instructions, imageUrl, cookingTime } = req.body;

   
    const newRecipe = new RecipeModel({ name , ingredients, instructions, imageUrl, cookingTime, userOwner:"60b9b0b0e1b0c71f1c0b0b1e" });

    await newRecipe.save();
    res.json(newRecipe);
});

router.put('', async (req, res) => {
   
    const recipe = await RecipeModel.findById(req.body.recipeId);
    const user = await UserModel.findById(req.body.userId);


    user.savedRecipes.push(recipe);
    await user.save();
    res.json({savedRecipes: user.savedRecipes});




 
});



router.get('/saved/ids', async (req, res) => {
    
    const user = await UserModel.findById(req.body.userId)
    res.json({savedRecipes: user?.savedRecipes});
});

router.get('/saved', async (req, res) => {

    const user = await UserModel.findById(req.body.userId)
    const savedRecipes = await RecipeModel.find({_id: {$in: user.savedRecipes}});

    res.json({savedRecipes});
});




        












export  {router as recipesRouter};