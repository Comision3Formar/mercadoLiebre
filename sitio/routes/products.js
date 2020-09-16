const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

const upImagesProducts = require('../middlewares/upImagesProducts')

router.get('/',productsController.listar);
router.get('/detalle/:id',productsController.detalle);
router.get('/search',productsController.search)

router.get('/add',productsController.agregar);
router.get('/add/form',productsController.agregar);
router.post('/add/form', upImagesProducts.any(), productsController.publicar);

router.get('/show/:id/:flap?',productsController.show);

router.put('/edit/:id', upImagesProducts.any(),productsController.editar)
router.delete('/delete/:id',productsController.eliminar)

module.exports = router;