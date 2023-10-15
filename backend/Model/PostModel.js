const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    images : {type:Array},
    heading : {type:String},
    desc : {type:String},
    content : {type:String},
    date : {type:String},
    time : {type:String},
    genre : {type:String},
    comments : {type:Array}
});

const postModel = mongoose.model("posts",postSchema);
module.exports = postModel;