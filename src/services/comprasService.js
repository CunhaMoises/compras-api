// cria o item, se nao tiver carrinho, cria o carrinho
// adiciona item ao carinho 
// recalcula o total
// remove item do carrinho
// finzaliza o carrinho
// mostra o historico com os carrinhos
// mostra os itens de um carrinho
// exclui carrinho
const itens_model = require('../models/itensModel')
const carrinhos_model = require('../models/carrinhosModel')
const usuarios_model = require('../models/usuariosModel')
const bcrypt = require('bcrypt')
const AppError = require('../errors/AppError')

const TOTAL_CARRINHO_MAXIMO = 5

async function create_user (data) {
    try {

        if(!data.nome?.trim() || !data.email?.trim() || !data.senha?.trim()) {
            throw new AppError('Preencha os campos corretamente!', 400)
        }

        const hash = await bcrypt.hash(data.senha, 10)
        const usuario = await usuarios_model.crate_user(data, hash)

        
        const carrinho = await carrinhos_model.create_carrinho(usuario.id)
        

        return usuario

    } catch (error) {
        if(error.code == 'P2002') {
            throw new AppError ('email ja cadastrado!', 400)
        }
        
        throw error
    }
    
}

async function login (data) {
    
    const usuario = await usuarios_model.login(data.email)

    if(!usuario) {
        throw new AppError('Usuario não encontrado!', 400)
    }

    const senha  = await bcrypt.compare(data.senha, usuario.senha)

    if(senha == false) {
        throw new AppError('Usuario ou senha inválidos!', 400)
    }

    return usuario

}

async function create_items (usuario_id, data) {

    quantidade_carrinho = await carrinhos_model.count_carrinho(usuario_id)

    if(quantidade_carrinho >= TOTAL_CARRINHO_MAXIMO) {
        throw new AppError(
            "Limite de 5 carrinhos finalizados atingido. Exclua um carrinho para criar outro.",
            409
        );
        
    }

    let carrinho = await carrinhos_model.find_carrinho_ativo (usuario_id)
    
    if (!carrinho) {
        carrinho = await carrinhos_model.create_carrinho (usuario_id)
    }
    
    const item = await itens_model.create_items(carrinho.id, data)
    let total = carrinho.total + (item.preco * item.quantidade)

    carrinho = await carrinhos_model.update_carrinho(carrinho.id, total)

    return item
}

async function remove_items(usuario_id, id) {

    let carrinho = await carrinhos_model.find_carrinho_ativo (usuario_id)
    let item = await itens_model.find_item(id)

    if (!carrinho) {
        throw new AppError ('Carrinho não encontrado', 404)
    }

    if(!item) {
        throw new Error ('Item não encontrado', 404)
    }

    let total_item = item.preco * item.quantidade

    if(item.carrinho_id !== carrinho.id) {
        throw new AppError("Item não encontrado no carrinho", 404);
    }

    item = await itens_model.remove_item(id)
    let total = carrinho.total - total_item
    carrinho = await carrinhos_model.update_carrinho(carrinho.id, total)
    
    
}

async function finish_car (usuario_id) {
    let carrinho = await carrinhos_model.find_carrinho_ativo (usuario_id)
    
    if (!carrinho) {
        throw new AppError ('Carrinho não encontrado', 404)
    }

    return carrinho = await carrinhos_model.finish_carrinho(carrinho.id)

}

async function find_car (usuario_id) {
    let carrinho = await carrinhos_model.find_carrinho_ativo(usuario_id)

    if (!carrinho) {
        throw new AppError ('Carrinho não encontrado', 404)
    }

    return carrinho
}

async function list_car (usuario_id) {
    let carrinho = await carrinhos_model.list_carrinho(usuario_id)

    if (!carrinho.length) {
        throw new AppError ('Carrinho não encontrado', 404)
    }

    return carrinho
}

async function list_items (usuario_id, id) {
    let carrinho = await carrinhos_model.find_carrinho(id)
    let user = usuario_id

    if( user !== carrinho.usuario_id) {
        throw new AppError ('Carrinho não econtrado', 404)
    } else {
        carrinho = await carrinhos_model.list_items(id)
    }
        
    return carrinho
}

async function clear_car (usuario_id) {
    let carrinho = await carrinhos_model.find_carrinho_ativo(usuario_id)

    if (!carrinho) {
        throw new AppError ('Carrinho não encontrado', 404)
    }

    await itens_model.clear_car(carrinho.id)

    const total = 0
    carrinho = await carrinhos_model.update_carrinho(carrinho.id, total)
    const vazio = await carrinhos_model.find_carrinho_ativo(usuario_id)
    
    return vazio
}

async function remove_car (usuario_id, id) {
    let carrinho = await carrinhos_model.find_carrinho(id)
    let user = usuario_id

    if (user !== carrinho.usuario_id) {
        throw new AppError ('Carrinho não encontrado', 404)
    } else {
        carrinho = await carrinhos_model.remove_carrinho(id)
    }
   
}

module.exports = {
    login,
    create_user,
    create_items,
    remove_items,
    finish_car,
    find_car,
    list_car,
    list_items,
    clear_car,
    remove_car
}