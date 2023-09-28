const {Router} = require("express");
const postModel = require("../Model/PostModel");
const postRouter = Router();
const {storage} = require("../Configs/cloudinaryConfig");
const multer = require("multer");
const upload = multer({storage:storage});

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

postRouter.post("/addPost",upload.single("image"),async(req,res)=>{
  const{heading,content,desc,genre,time,date} = req.body;
  const imageURL = req.file.path;

  let postExist = await postModel.find({heading});
  if(postExist.length){
    res.send({msg:"Post already exist"})
  }else{
    let newPost = new postModel({image:imageURL,heading,comments:[],content,desc,date,time,genre});
    await newPost.save();
    console.log("Newpost:",newPost)
    res.send({msg:"Post added successfully",post:newPost});
  }

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