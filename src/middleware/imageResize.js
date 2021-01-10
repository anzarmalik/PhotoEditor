const multer = require('multer');
const fs = require('fs');
// const mime = require('mime');
// const { logger, multiStreamLog } = require('../config/logger');

const storage = multer.diskStorage({
  destination(req, file, callback) {
    const folder = 'images';
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }
    callback(null, `./${folder}`);
  },
  filename(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
}).single('resizeImage');

module.exports = {
  upload,
};
