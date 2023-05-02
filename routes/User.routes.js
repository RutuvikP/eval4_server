const {Router}=require('express');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const { UserModel } = require('../model/user.model');

const userRouter=Router();

userRouter.get("/",(req,res)=>{
    res.send("Welcome to Social Media App");
});

userRouter.post('/register',async(req,res)=>{
    const {name,email,gender,password}=req.body;
    try {
        bcrypt.hash(password,5,async (err,hash)=>{
            const user=new UserModel({name,email,gender,password:hash})
            await user.save();
            res.status(200).send({"msg":"New user registered!"})
        })
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
});

userRouter.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    const user=await UserModel.findOne({email})
    if(user){
        bcrypt.compare(password,user.password,(err,result)=>{
            if(result){
                const token=jwt.sign({author:user.name,authorID:user._id},'eval')
                res.send({"msg":"Login Successfull!!","token":token,"user":user});
            }else{
                res.send({"msg":"Wrong Credentials!!"});
            }
        })
    }else{
        res.send({"msg":"User not found!!"});
    }
});

module.exports=userRouter;