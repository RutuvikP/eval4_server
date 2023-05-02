const jwt=require('jsonwebtoken')

const authenticate=(req,res,next)=>{
    const token=req.headers?.authorization?.split(" ")[1];
    if(token){
        const decoded=jwt.verify(token,'eval');
        if(decoded){
            req.body.authorID=decoded.authorID,
            req.body.author=decoded.author
            next()
        }else{
            res.send("Token doesnt match!!")
        }
    }else{
        res.send("Please login!!")
    }
};

module.exports={authenticate};