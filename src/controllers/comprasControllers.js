const service = require('../services/comprasService')


async function create_items (req,res) {
    try{
        const idUser = req.headers["x-user-id"]
        const item = await service.criar_item (idUser, req.body)
        return res.status(201).json(item)

    } catch (error) {
        return res.status(500).json({erro: error.message})
    }
}

async function remove_items (req,res) {
    const idItem = req.params.id
    try {
        const idUser = req.headers["x-user-id"]
        const item = await service.remover_item(idUser, idItem)
        return res.status(200).json({status: 'o item foi removido com sucesso!'})
    } catch (error) {
        return res.status(500).json({erro: error.message})
        
    }
}

async function finish_car (req, res) {
    try {
        const idUser = req.headers["x-user-id"]
        const carrinho = await service.finalizar_carrinho(idUser)
        return res.status(200).json(carrinho)
    } catch (error) {
        return res.status(500).json({erro: error.message})
    }
}

module.exports = {
    create_items,
    remove_items,
    finish_car
}