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

const TOTAL_CARRINHO_MAXIMO = 5

async function criar_item (idUser, data) {

    quantidade_carrinho = await carrinho_model.count_carrinho(idUser)

    if(quantidade_carrinho >= TOTAL_CARRINHO_MAXIMO) {
        throw new Error("limite máximo de carrinhos atigindo, exclua 1 carrinho do seu histórico para poder criar.");
        
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
        throw new Error ('carrinho não encontrado')
    }

    if(!item) {
        throw new Error ('item não encontrado')
    }

    let total_item = item.preco * item.quantidade

    if(item.carrinho_id !== carrinho.id) {
        throw new Error("item não encontrado no carrinho");
    }

    item = await itens_model.remove_item(id)
    let total = carrinho.total - total_item
    carrinho = await carrinho_model.update_carrinho(carrinho.id, total)
    
    
}

async function finalizar_carrinho (idUser) {
    let carrinho = await carrinho_model.find_carrinho_ativo (idUser)
    
    if (!carrinho) {
        throw new Error ('carrinho não encontrado')
    }

    return carrinho = await carrinho_model.finish_carrinho(carrinho.id)

}

async function mostrar_carrinho (idUser) {
    let carrinho = await carrinho_model.list_carrinho(idUser)

    if (!carrinho.length) {
        throw new Error ('Carrinho não encontrado')
    }

    return carrinho
}

async function mostrar_item (idUser, id) {
    let carrinho = await carrinho_model.find_carrinho(id)
    let user = idUser

    if( user !== carrinho.idUser) {
        throw new Error ('carrinho não econtrado')
    } else {
        carrinho = await carrinho_model.list_items(id)
    }
        
    return carrinho
}

async function remover_carrinho (idUser, id) {
    let carrinho = await carrinho_model.find_carrinho(id)
    let user = idUser

    if (user !== carrinho.idUser) {
        throw new Error ('carrinho não encontrado')
    } else {
        carrinho = await carrinho_model.remove_carrinho(id)
    }
   
}
module.exports = {
    criar_item,
    remover_item,
    finalizar_carrinho,
    mostrar_carrinho,
    mostrar_item,
    remover_carrinho
}