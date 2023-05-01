import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; 
import UserModel from '../models/Users.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    res.json({user})
  




    
});

router.post('/getUsers', async (req, res) => {
    const users = await UserModel.find({});
    res.json(users);
}
);

router.post('/insertUser', async (req, res) => {
    const { username, password } = req.body;

    const newUser = new UserModel({ username, password });
    await newUser.save();

    res.json(newUser);
    
}
);
    


router.post('getUsers', async (req, res) => {
    const users = await UserModel.find({});
    res.json(users);
}
);
   



export { router as usersRouter};

