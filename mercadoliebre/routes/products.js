const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController')

router.get('/',productsController.listar);
router.get('/detalle/:id',productsController.detalle);
router.get('/search',productsController.search)

module.exports = router;