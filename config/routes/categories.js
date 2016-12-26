'use strict';

var router = require('express').Router(),
    categories = require('../../api/controllers/Categories');

router.get('/', categories.loadAllCategories);
router.post('/', categories.create);

module.exports = router;
