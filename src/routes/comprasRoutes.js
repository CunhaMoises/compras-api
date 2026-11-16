const express = require('express')
const router = express.Router()
const comprasController = require('../controllers/comprasControllers')

router.post('/cadastro', comprasController.crate_user)
router.post('/login', comprasController.login)

router.post('/carrinho/item', comprasController.create_items)
router.delete('/carrinho/item/:id', comprasController.remove_items)
router.patch('/carrinho/finalizar', comprasController.finish_car)
router.get('/carrinho/ativo',comprasController.find_car)
router.get('/carrinho',comprasController.list_car)
router.get('/carrinho/item/:id', comprasController.list_items)
router.delete('/carrinho/limpar', comprasController.clear_car)
router.delete('/carrinho/:id', comprasController.remove_car)

module.exports = router