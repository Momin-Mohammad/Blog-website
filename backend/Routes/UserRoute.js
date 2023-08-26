const {Router} = require("express");
const userModel = require("../Model/UserModel");
const userRouter = Router();

userRouter.get("/",async(req,res)=>{
    const allUsers = await userModel.find();
    res.send({users:allUsers})
});

userRouter.post("/subscribe",async(req,res)=>{
    const{name,email} = req.body;
    const userExist = await userModel.findOne({email});
    if(userExist){
        res.send({msg:"You have already subscribed",userEmail:email})
    }else{
        let newUser = new userModel({name,email});
        await newUser.save();
        res.send({msg:"Thank You for subscribing",userEmail:email});
    }
});

module.exports = userRouter;