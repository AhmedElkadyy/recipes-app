import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
      
    },
    password: {
        type: String,
        required: true,
      
    },
    savedRecipes: [{
        type: Schema.Types.ObjectId,
        ref: 'recipes',
    }]

    
    
    
});


const UserModel = mongoose.model('users', userSchema);

export default UserModel;



