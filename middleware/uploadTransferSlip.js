const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "images/transferSlips");
  },
  filename: function(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)/gi)) {
      cb(new Error("Only image file are allowed"));
    } else {
      const file_name = `${Date.now()}.${file.mimetype.split("/")[1]}`;
      cb(null, file_name);
    }
  }
});

module.exports = multer({ storage });
