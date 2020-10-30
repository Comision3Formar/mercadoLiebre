/*****************MODULOS*********************/
const express = require('express'); //requiero express
const router = express.Router(); //requiero el método Router


/*****************CONTROLADORES*********************/
const controller = require('../controllers/productsController') //requiero el controlador que se hará cargo de la lógica


/*****************VALIDACIONES*********************/
const productValidator = require('../validations/productValidator')


/*****************MIDDLEWARES***********************/
const upImagesProducts = require('../middlewares/upImagesProducts'); //requiero el modulo que se encarga de guardar las imagenes, vía multer
const sessionUserCheck = require('../middlewares/sessionUserCheck'); //chequeo si el usuario levantó sesión

router.get('/list', controller.listar) //construyo la ruta que me visualizará información de prueba
router.get('/search',sessionUserCheck,controller.search); //añado una nueva ruta que se ocupe de la busqueda de productos

router.get('/detail/:id',sessionUserCheck, controller.detalle) // añado la ruta para mostrar los detalles del producto


router.get('/add',controller.agregar) //añado la ruta para mostrar el formulario
router.post('/add', upImagesProducts.any(),productValidator, controller.publicar) //añado ruta para guardar publicacion de producto

// AGREGUÉ UN NUEVO PARAMETRO PARA EL MANEJO DE SOPAPAS!!
router.get('/show/:id/:flap?', controller.show); //creo una ruta para mostrar los detalles del producto y editarlo

router.put('/edit/:id', upImagesProducts.any(), controller.editar); //creo la ruta editar un producto
router.delete('/delete/:id', controller.eliminar); //creo la ruta para eliminar un producto


module.exports = router //exporto router