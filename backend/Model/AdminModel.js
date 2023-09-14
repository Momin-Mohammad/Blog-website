const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    name : {type:String},
    email : {type:String,require:true},
    password : {type:String,require:true}
});

const adminModel = mongoose.model("admins",adminSchema);

module.exports = adminModel;