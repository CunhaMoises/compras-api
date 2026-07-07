const express = require('express')
const router = express.Router()
const comprasController = require('../controllers/comprasControllers')

router.post('/carrinho/item', comprasController.create_items)
router.delete('/carrinho/item/:id', comprasController.remove_items)
router.patch('/carrinho/finalizar', comprasController.finish_car)

module.exports = router