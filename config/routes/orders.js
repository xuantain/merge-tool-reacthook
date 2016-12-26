'use strict';

var router = require('express').Router(),
    orders = require('../../api/controllers/Orders');

router.get('/:perPage/:page/:shopId/:status', orders.loadAllOrdersByShop);
router.get('/:perPage/:page/:shopId', orders.loadAllOrdersByShop);
router.get('/:perPage/:page', orders.loadAllOrdersByShop);
router.post('', orders.create);

module.exports = router;
