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
        return res.status(204)
    } catch (error) {
        return res.status(500).json({erro: error.message})
    }
}

module.exports = {
    create_items,
    remove_items
}