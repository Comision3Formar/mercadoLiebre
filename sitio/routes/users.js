var express = require('express');
var router = express.Router();

const usersController = require('../controllers/usersController')

router.get('/profile',usersController.profile);

module.exports = router;
