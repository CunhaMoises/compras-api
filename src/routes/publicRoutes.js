const express = require('express')
const router = express.Router()
const comprasController = require('../controllers/comprasControllers')

//usuario
router.post('/cadastro', comprasController.crate_user)
router.post('/cadastro/codigo',comprasController.validate_code)
router.post('/cadastro/codigo/reenviar',comprasController.resend_code)
router.post('/login', comprasController.login)

module.exports = router