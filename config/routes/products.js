'use strict';

var join = require('path').join;
var router = require('express').Router();
var products = require('../../api/controllers/Products');
var config = require('config');
var multer  = require('multer');
var upload = multer({ dest: join(config.root, 'public', 'uploads') });

router.get('/:catId', products.loadAllProductsByCat);
router.get('/:catId/:perPage/:page', products.loadAllProductsByCat);
router.get('/:perPage/:page', products.loadAllProductsByCat);
router.post('', upload.single('image'), products.create);
router.delete('/:productId', products.delete);

module.exports = router;
