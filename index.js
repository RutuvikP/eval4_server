const express=require('express');
const { connection } = require('./configs/db');
const cors=require('cors')
const userRouter = require('./routes/User.routes');
const postRoutes = require('./routes/Posts.route');
const { authenticate } = require('./middlewares/authenticate');
require('dotenv').config();
const app=express();
app.use(cors());
app.use(express.json());

app.use('/users',userRouter);

app.use(authenticate)
app.use('/posts',postRoutes);

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected too DB")        
    } catch (error) {
        console.log("Something went wrong")
    }
    console.log("Server is running");
});