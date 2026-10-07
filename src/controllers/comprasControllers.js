const service = require('../services/comprasService')


async function create_items (req,res) {
    try{
        const idUser = req.headers["x-user-id"]
        const item = await service.criar_item (idUser, req.body)
        return res.status(201).json(item)

    } catch (error) {

        if (error.statusCode) {
            return res.status(error.statusCode).json({
                erro: error.message
            });
        }

        return res.status(500).json({
            erro: "Erro interno do servidor"
        });
    }
}

async function remove_items (req,res) {
    try {
        const idUser = req.headers["x-user-id"]
        const idItem = req.params.id
        const item = await service.remover_item(idUser, idItem)
        return res.status(200).json({status: 'o item foi removido com sucesso!'})
    } catch (error) {

        if (error.statusCode) {
            return res.status(error.statusCode).json({
                erro: error.message
            });
        }

        return res.status(500).json({
            erro: "Erro interno do servidor"
        });
    }
}

async function finish_car (req, res) {
    try {
        const idUser = req.headers["x-user-id"]
        const carrinho = await service.finalizar_carrinho(idUser)
        return res.status(200).json(carrinho)
    } catch (error) {

        if (error.statusCode) {
            return res.status(error.statusCode).json({
                erro: error.message
            });
        }

        return res.status(500).json({
            erro: "Erro interno do servidor"
        });
    }
}

async function find_car (req, res) {
    try {
        const idUser = req.headers["x-user-id"]
        const carrinho = await service.procurar_carrinho(idUser)
        return res.status(200).json(carrinho)

    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).json({
                erro: error.message
            });
        }

        return res.status(500).json({
            erro: "Erro interno do servidor"
        });
    }
}

async function list_car (req, res) {
    try {
        const idUser = req.headers["x-user-id"]
        const carrinho = await service.mostrar_carrinho(idUser)
        return res.status(200).json(carrinho)
    } catch (error) {

        if (error.statusCode) {
            return res.status(error.statusCode).json({
                erro: error.message
            });
        }

        return res.status(500).json({
            erro: "Erro interno do servidor"
        });
    }
}

async function list_items (req, res) {
    try {
        const idUser = req.headers["x-user-id"]
        const id = req.params.id
        const carrinho = await service.mostrar_item(idUser, id)
        return res.status(200).json(carrinho)
    } catch (error) {

        if (error.statusCode) {
            return res.status(error.statusCode).json({
                erro: error.message
            });
        }

        return res.status(500).json({
            erro: "Erro interno do servidor"
        });
    }
}

async function remove_car (req, res) {
    try {
        const id = req.params.id
        const idUser = req.headers["x-user-id"]
        const carrinho = await service.remover_carrinho(idUser,id)
        return res.status(200).json({message:'item removido com sucesso!'})
    } catch (error) {

        if (error.statusCode) {
            return res.status(error.statusCode).json({
                erro: error.message
            });
        }

        return res.status(500).json({
            erro: "Erro interno do servidor"
        });
    }
}

module.exports = {
    create_items,
    remove_items,
    finish_car,
    find_car,
    list_car,
    list_items,
    remove_car
}