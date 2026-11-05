const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "..", "uploads"));
  },
  filename: (req, file, cb) => {
    const time = new Date().getTime();
    cb(null, `${time}_${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;