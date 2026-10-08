// cria o item, se nao tiver carrinho, cria o carrinho
// adiciona item ao carinho 
// recalcula o total
// remove item do carrinho
// finzaliza o carrinho
// mostra o historico com os carrinhos
// mostra os itens de um carrinho
// exclui carrinho
const itens_model = require('../models/itensModel')
const carrinho_model = require('../models/carrinhoModel')
const AppError = require('../errors/AppError')

const TOTAL_CARRINHO_MAXIMO = 5

async function criar_item (idUser, data) {

    quantidade_carrinho = await carrinho_model.count_carrinho(idUser)

    if(quantidade_carrinho >= TOTAL_CARRINHO_MAXIMO) {
        throw new AppError(
            "Limite de 5 carrinhos finalizados atingido. Exclua um carrinho para criar outro.",
            409
        );
        
    }

    let carrinho = await carrinho_model.find_carrinho_ativo (idUser)
    
    if (!carrinho) {
        carrinho = await carrinho_model.create_carrinho (idUser)
    }
    
    const item = await itens_model.create_item(carrinho.id, data)
    let total = carrinho.total + (item.preco * item.quantidade)

    carrinho = await carrinho_model.update_carrinho(carrinho.id, total)

    return item
}

async function remover_item(idUser, id) {

    let carrinho = await carrinho_model.find_carrinho_ativo (idUser)
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
    carrinho = await carrinho_model.update_carrinho(carrinho.id, total)
    
    
}

async function finalizar_carrinho (idUser) {
    let carrinho = await carrinho_model.find_carrinho_ativo (idUser)
    
    if (!carrinho) {
        throw new AppError ('Carrinho não encontrado', 404)
    }

    return carrinho = await carrinho_model.finish_carrinho(carrinho.id)

}

async function procurar_carrinho (idUser) {
    let carrinho = await carrinho_model.find_carrinho_ativo(idUser)

    if (!carrinho) {
        throw new AppError ('Carrinho não encontrado', 404)
    }

    return carrinho
}

async function mostrar_carrinho (idUser) {
    let carrinho = await carrinho_model.list_carrinho(idUser)

    if (!carrinho.length) {
        throw new AppError ('Carrinho não encontrado', 404)
    }

    return carrinho
}

async function mostrar_item (idUser, id) {
    let carrinho = await carrinho_model.find_carrinho(id)
    let user = idUser

    if( user !== carrinho.idUser) {
        throw new AppError ('Carrinho não econtrado', 404)
    } else {
        carrinho = await carrinho_model.list_items(id)
    }
        
    return carrinho
}

async function limpar_carrinho (idUser) {
    const carrinho = await carrinho_model.find_carrinho_ativo(idUser)

    if (!carrinho) {
        throw new AppError ('Carrinho não encontrado', 404)
    }

    await itens_model.clear_car(carrinho.id)

    const vazio = await carrinho_model.find_carrinho_ativo(idUser)
    
    return vazio
}

async function remover_carrinho (idUser, id) {
    let carrinho = await carrinho_model.find_carrinho(id)
    let user = idUser

    if (user !== carrinho.idUser) {
        throw new AppError ('Carrinho não encontrado', 404)
    } else {
        carrinho = await carrinho_model.remove_carrinho(id)
    }
   
}
module.exports = {
    criar_item,
    remover_item,
    finalizar_carrinho,
    procurar_carrinho,
    mostrar_carrinho,
    mostrar_item,
    limpar_carrinho,
    remover_carrinho
}