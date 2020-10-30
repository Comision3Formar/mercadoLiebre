var express = require('express');
var router = express.Router();

const mainController = require('../controllers/mainController');
const categorieValidator = require('../validations/categorieValidator');
const sessionAdminCheck = require('../middlewares/sessionAdminCheck');
const upLogos = require('../middlewares/upLogos');




const cookieCheck = require('../middlewares/cookieCheck');

/* GET home page. */
router.get('/',cookieCheck, mainController.index);

router.get('/admin/categorieList',mainController.listCategories)
router.get('/admin/categorieAdd',sessionAdminCheck,mainController.addCategorie)
router.post('/admin/categorieAdd',upLogos.any(),categorieValidator, mainController.saveCategorie)


module.exports = router;
