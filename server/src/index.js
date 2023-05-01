import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { usersRouter } from './routes/users.js';



const app = express();
app.use(express.json());
app.use(cors());
app.use('/auth', usersRouter);


mongoose.connect("mongodb+srv://kady:Aa112233@cluster0.b6vzx0t.mongodb.net/?retryWrites=true&w=majority");

app.listen(3001, () => console.log('Server started on port 3001'));
mongoose.connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
}
);

