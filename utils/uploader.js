require("dotenv").config();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "restaurantImg",
    format: async (req, file) => "png",
    public_id: (req, file) => {
      const uniqueFilename = Date.now() + "-" + file.originalname;
      return uniqueFilename;
    },
  },
});

const uploader = multer({ storage: storage });

module.exports = uploader;
