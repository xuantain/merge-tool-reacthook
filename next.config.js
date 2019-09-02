const dotenv = require('dotenv');
const withImages = require('next-images');

dotenv.config();

const { DROPBOX_TOKEN, DROPBOX_APP_KEY } = process.env;

module.exports = withImages({
  env: { DROPBOX_TOKEN, DROPBOX_APP_KEY }
});
