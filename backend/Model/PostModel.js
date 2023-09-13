const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    image : {type:String},
    heading : {type:String},
    desc : {type:String},
    content : {type:String},
    date : String,
    time : String,
    genre : {type:String},
    comments : {type:Array}
});

const postModel = mongoose.model("posts",postSchema);
module.exports = postModel;