const express = require('express');

const router = express.Router();

const { imageResize } = require('../controller/resize');

router.post('/resize', imageResize);
router.post('/resize.base64', imageResize);

module.exports = router;
