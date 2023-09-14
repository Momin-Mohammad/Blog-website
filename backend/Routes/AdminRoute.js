const {Router} = require("express");
const adminRouter = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const adminModel = require("../Model/AdminModel");
require("dotenv").config();

adminRouter.get("/",async(req,res)=>{
    let admin = await adminModel.find();
    res.send({msg:admin})
});

adminRouter.post("/reg",async(req,res)=>{
    const {name,email,password} = req.body;
    try{
        bcrypt.hash(password,7,async(err,hash)=>{
            if(err){
                res.send({msg:err})
            }else{
                let checkIfAdminExist = await adminModel.find({email});
                if(checkIfAdminExist.length){
                    res.send({msg:"You are already registered as Admin, Please login"})
                }else{
                    let registerAdmin = new adminModel({name,email,password:hash});
                    await registerAdmin.save();
                    res.send({msg:"Congrats! You are an Admin now"})
                }
            }
        })

    }catch(err){
        res.send({msg:err})
    }
});

adminRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try{
        let findAdmin = await adminModel.find({email});
        if(findAdmin.length){
            bcrypt.compare(password,findAdmin[0].password,async(err,result)=>{
                if(err){
                    res.send({msg:err})
                }
                if(result){
                   let token = jwt.sign({adminId:findAdmin[0]._id},process.env.key);
                   res.send({msg:"Welcome Admin",token:token})
                }else{
                    res.send({msg:"Wrong Password"})
                }
            })
        }else{
            res.send({msg:"You are not an Admin. Please check email and password"})
        }

    }catch(err){
        res.send({msg:err})
    }
});

module.exports = adminRouter;