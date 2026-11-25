const comprasService = require('../services/comprasService')
const usuariosService = require('../services/usuariosService')




async function crate_user (req,res) {
    try {
        const usuario_email = await usuariosService.create_user(req.body)
        
        
        return res.status(201).json({message: "usuario criado com sucesso!",
            usuario_email
        })
        

    } catch (error) {
        if(error.statusCode) {
            return res.status(error.statusCode).json({
                erro: error.message
            })
        }

        return res.status(500).json({erro: error.message})
    }
}

async function validate_code (req, res) {
    try {
        const token = await usuariosService.validate_code(req.body)

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 120 * 60 * 1000,
        });
        return res.status(200).json({message:"codigo valido, usuario cadastrado"})
    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).json({
                erro: error.message
            })
        }

        return res.status(500).json({
            erro: error.message
        })
    }
}

async function resend_code (req, res) {
    try {
        const codigo = await usuariosService.resend_code(req.body)

        return res.status(200).json({message:"codigo reenviado com sucesso!"})

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
        const token = await usuariosService.login(req.body)

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 120 * 60 * 1000,
        });

        


        return res.status(200).json({message: "usuario logado!"})
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
        
        const item = await comprasService.create_items (req.usuario_id, req.body)
        

        return res.status(201).json(item)

    } catch (error) {

        if (error.statusCode) {
            return res.status(error.statusCode).json({
                erro: error.message
            });
        }
        
        return res.status(500).json({
            erro: "Erro interno do servidorr"
            
        });
    }
}

async function list_items (req, res) {
    try {
        const carrinho_id = req.params.id
        const carrinho = await comprasService.list_items(req.usuario_id, carrinho_id)
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

async function remove_items (req,res) {
    try {
        
        const idItem = req.params.id
        const item = await comprasService.remove_items(req.usuario_id, idItem)
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
        const carrinho = await comprasService.finish_car(req.usuario_id)
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
        const carrinho = await comprasService.find_car(req.usuario_id)
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
        const carrinho = await comprasService.list_car(req.usuario_id)
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
        const carrinho = await comprasService.clear_car(req.usuario_id)
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
        const carrinho_id = req.params.id
        const carrinho = await comprasService.remove_car(req.usuario_id, carrinho_id)

        return res.status(200).json({message:'carrinho removido com sucesso!'})
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
    validate_code,
    resend_code,
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