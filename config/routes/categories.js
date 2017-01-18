'use strict';

var router = require('express').Router();
var categories = require('../../api/controllers/Categories');

router.get('/', categories.loadAllCategories);
router.post('/', categories.create);

module.exports = router;
