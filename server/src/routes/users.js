import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; 
import UserModel from '../models/Users.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    if (user) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();

    res.json(newUser);
});



router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
        res.status(400).json({ message: 'User does not exist' });
        return;
    }


    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        res.status(400).json({ message: 'Invalid password' });
        return;
    }

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username,
        },
        "secret",
    );
        
    res.json({ token , user});
});





    


export { router as usersRouter};

