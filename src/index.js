const { app, logger } = require('./config/index.js');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`Server listening at http://localhost:${port}`);
});
