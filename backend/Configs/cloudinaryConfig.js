const cloudinary  = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary");
require("dotenv").config();

cloudinary.config({
cloud_name : process.env.cloud_name,
api_key : process.env.cloudinary_key,
api_secret : process.env.cloudinary_secret,
secure : true
});

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder : "BlogSiteImages",
        allowedFormats: ['jpeg', 'png', 'jpg', 'gif'],
    }
})

module.exports = {storage};