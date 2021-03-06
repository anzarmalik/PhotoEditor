const sharp = require('sharp');
const imageToBase64 = require('image-to-base64');
// const { errorObj } = require('../config/errors.json');
const { logger, multiStreamLog } = require('../config/logger');
const {
  upload,
} = require('../middleware/imageResize');
const {
  getIPAddress,
} = require('../middleware/get_IPAddress');

/* POST resize image listing here */
const imageResize = (req, res) => {
  try {
    const data = {
      height: +req.query.height || 272,
      width: +req.query.width || 213,
    };
    upload(req, res, async (err) => {
      if (err) {
        multiStreamLog.error(err);
        logger.error(err);
        return new Error(err);
      }
      const IPADDRESS = getIPAddress(req);
      const responseObject = {
        responseCode: '200',
      };
      const fileName = req.file.filename ? req.file.filename : '  file name not present !';
      await sharp(`${__dirname}/../../images/${fileName}`).resize(data.height, data.width)
        .jpeg({ quality: 80 }).toFile(`${__dirname}/../../images/Resized${fileName}`);

      if (req.url.includes('resize.base64')) {
        const resultBas64 = await imageToBase64(`${__dirname}/../../images/Resized${fileName}`);
        responseObject.filePath = 'data:image/jpeg;base64,....';
        multiStreamLog.debug({
          ...{ IPADDRESS },
          ...{ fileName },
          ...data,
          ...responseObject,
        });
        responseObject.filePath = `data:image/jpeg;base64,${resultBas64}`;
        res.send(responseObject);
      } else {
        responseObject.filePath = `/images/Resized${fileName}`;
        multiStreamLog.debug({
          ...{ IPADDRESS },
          ...{ fileName },
          ...data,
          ...responseObject,
        });
        return res.send(responseObject);
      }
    });
  } catch (error) {
    multiStreamLog.error(error);
    logger.error(error);
    return new Error(error);
  }
};

module.exports = {
  imageResize,
};
