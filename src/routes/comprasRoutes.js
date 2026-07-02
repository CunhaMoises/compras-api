const express = require('express')
const router = express.Router()
const comprasController = require('../controllers/comprasControllers')

router.post('/carrinho/item', comprasController.create_items)

module.exports = router