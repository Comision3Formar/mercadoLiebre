var express = require('express');
var router = express.Router();

const mainController = require('../controllers/mainController');

const cookieCheck = require('../middlewares/cookieCheck');

/* GET home page. */
router.get('/',cookieCheck, mainController.index);

module.exports = router;
