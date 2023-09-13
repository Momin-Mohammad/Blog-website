const express = require("express");
const cors = require("cors");
const connection = require("./Configs/db");
const userRouter = require("./Routes/UserRoute");
const postRouter = require("./Routes/PostRoute");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({origin:"*"}));
app.use("/user",userRouter);
app.use("/posts",postRouter);

app.get("/",(req,res)=>{
    res.send("Working");
})

app.listen(process.env.port,async()=>{
    try{
        connection;
        console.log("Connected to DB at port 8000");
    }catch(e){
        console.log(e)
    }
})