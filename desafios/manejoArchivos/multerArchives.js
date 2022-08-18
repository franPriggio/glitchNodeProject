const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/petUploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(".")[0];
    const fileExtension = file.originalname.split(".")[1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, fileName + "-" + uniqueSuffix + "." + fileExtension);
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
