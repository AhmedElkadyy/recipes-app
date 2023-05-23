import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name:{
        type: String,
        required: true,

    },
    ingredients:[ {
        type: String,
        required: true,

    }],
    instructions: {
        type: String,
        required: true,

    },
    imageUrl: {
        type: String,
        required: true,

    },
    cookingTime: {
        type: Number,
        required: true,

    },
    userOwner: {
        type : Schema.Types.ObjectId,
        ref : 'users',
        required: true,
    }
});

const RecipeModel = mongoose.model('recipes', recipeSchema);

export default RecipeModel;

