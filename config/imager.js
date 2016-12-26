'use strict';

module.exports = {
  variants: {
    product: {
      thumb: {          // preset
        options: {      // preset options
          pool: 5,
          scale: { width: 200, height: 150, type: 'contain' },
          crop: { width: 200, height: 150, x: 0, y: 0 },
          format: 'png',
          rotate: 'auto',
        }
      },
      large: {
        original: true  // upload original image without image processing
      }
    },
    gallery: {
      crop: {
        thumb: '100x100'
      }
    }
  },

  storage: {
    S3: {
      key: process.env.IMAGER_S3_KEY,
      secret: process.env.IMAGER_S3_SECRET,
      bucket: process.env.IMAGER_S3_BUCKET
    }
  },

  debug: true
};
