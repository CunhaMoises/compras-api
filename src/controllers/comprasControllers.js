const service = require('../services/comprasService')

async function crate_user (req,res) {
    try {
    const usuario = await service.create_user(req.body)
    return res.status(201).json({usuario})
        

    } catch (error) {
        if(error.statusCode) {
            return res.status(error.statusCode).json({
                erro: error.message
            })
        }

        return res.status(500).json({erro: error.message})
    }
}

async function login (req,res) {
    try {
        const usuario = await service.login(req.body)

        return res.status(200).json(usuario)
    } catch (error) {
        
        if(error.statusCode) {
            return res.status(error.statusCode).json({
                erro: error.message
            })
        }
        return res.status(500).json({erro: error.message})
    }
}

async function create_items (req,res) {
    try{
        const item = await service.create_items (idUser, req.body)
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
        const item = await service.remove_items(idUser, idItem)
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
        const carrinho = await service.finish_car(idUser)
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
        const carrinho = await service.find_car(idUser)
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
        const carrinho = await service.list_car(idUser)
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
        const carrinho = await service.list_items(idUser, id)
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

async function clear_car (req, res) {
    try {
        const idUser = req.headers["x-user-id"]
        const carrinho = await service.clear_car(idUser)
        return res.status(200).json(carrinho)

    }catch (error) {

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
        const carrinho = await service.remove_car(idUser,id)
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
    crate_user,
    login,
    create_items,
    remove_items,
    finish_car,
    find_car,
    list_car,
    list_items,
    clear_car,
    remove_car
}