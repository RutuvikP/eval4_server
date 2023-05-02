const {Router}=require('express');
const { PostModel } = require('../model/post.model');

const postRoutes=Router();

postRoutes.get('/',async(req,res)=>{
    const {device}=req.query;
    let query={authorID:req.body.authorID};
    if(device){
        query.device=device;
    }
    try {
        const posts= await PostModel.find(query);
        res.send(posts);
    } catch (error) {
        res.send({"msg":error.message});
    }
});

postRoutes.post('/create',async(req,res)=>{
    try {
        const post=new PostModel(req.body);
        await post.save();
        res.send({"msg":"Post created successfully!!"});
    } catch (error) {
        res.send({"msg":error.message});
    }
});

postRoutes.patch('/update/:postID',async(req,res)=>{
    const {postID}=req.params
    const post=await PostModel.findOne({_id:postID})
    if(post){
        if(req.body.authorID===post.authorID){
            await PostModel.findByIdAndUpdate({_id:postID},req.body)
            res.send({"msg":`Post with ${postID} has been updated!!`})
        }else{
            res.send("Not Authorised to update this!!")
        }
    }else{
        res.send({"msg":"Post not found!!"});
    }
});

postRoutes.delete('/delete/:postID',async(req,res)=>{
    const {postID}=req.params
    const post=await PostModel.findOne({_id:postID})
    if(post){
        if(req.body.authorID===post.authorID){
            await PostModel.findByIdAndDelete({_id:postID})
            res.send({"msg":`Post with ${postID} has been deleted!!`})
        }else{
            res.send("Not Authorised to delete this!!")
        }
    }else{
        res.send({"msg":"Post not found!!"});
    }
})

module.exports=postRoutes;