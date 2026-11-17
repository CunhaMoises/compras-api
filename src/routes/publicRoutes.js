const express = require('express')
const router = express.Router()
const comprasController = require('../controllers/comprasControllers')

//usuario
router.post('/cadastro', comprasController.crate_user)
router.post('/login', comprasController.login)

module.exports = router