const {Router} = require("express");
const postModel = require("../Model/PostModel");
const postRouter = Router();
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../frontend/public/postimages')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname))
    }
  })
const upload = multer({storage:storage})

postRouter.get("/",async(req,res)=>{
    let allPosts = await postModel.find();
    res.send({msg:"All Posts",posts:allPosts});
});

postRouter.get("/:heading",async(req,res)=>{
  let heading = req.params.heading;
  let reqPost = await postModel.find({heading:heading});
  res.send({msg:"Requested Post",post:reqPost});
});

postRouter.patch("/:id",async(req,res)=>{
  let id = req.params.id;
  let addNewComment = req.body;
  let findThePost  = await postModel.find({_id:id});
  let commentsObj={comments : [...findThePost[0]?.comments,addNewComment]}
  let updatePost = await postModel.findOneAndUpdate({_id:id},{$set:commentsObj},{new:true});
  await updatePost.save();
  res.send({msg:"Comment added successfully",post:updatePost});
});

postRouter.post("/addPost",upload.single('image'),async(req,res)=>{
    const {image,heading,desc,content,date,time,genre} = req.body;
    let newPost = new postModel({image:req.file.filename,heading,desc,content,date,time,genre});
    await newPost.save();
    res.send({msg:"Post added successfully",post:newPost})
});

postRouter.patch("/editpost/:heading",upload.single('image'),async(req,res)=>{
  let postheading = req.params.heading;
  let {image,heading,desc,content,genre} = req.body;
  let updatePost = await postModel.findOneAndUpdate({heading:postheading},{$set:{image:req.file.filename,heading,desc,content,genre}},{new:true});
  await updatePost.save();
  res.send({msg:"Post updated successfully",post:updatePost});
});

postRouter.delete("/deletepost/:id",async(req,res)=>{
  let id = req.params.id;
  let deletePost = await postModel.findOneAndDelete({_id:id});
  res.send({msg:"Post deleted successfully",post:deletePost})
})

module.exports = postRouter;