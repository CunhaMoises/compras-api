// cria o item, se nao tiver carrinho, cria o carrinho
// adiciona item ao carinho 
// recalcula o total
// remove item do carrinho
// finzaliza o carrinho
// mostra o historico com os carrinhos
const itens_model = require('../models/itensModel')
const carrinho_model = require('../models/carrinhoModel')


async function criar_item (idUser, data) {

    
    let carrinho = await carrinho_model.find_carrinho (idUser)
    
    if (!carrinho) {
        carrinho = await carrinho_model.create_carrinho (idUser)
    }
    
    const item = await itens_model.create_item(carrinho.id, data)
    let total = carrinho.total + (item.preco * item.quantidade)

    carrinho = await carrinho_model.update_carrinho(carrinho.id, total)
    
    return item
}

async function remover_item(idUser, id) {

    let carrinho = await carrinho_model.find_carrinho(idUser)
    
    let item = await itens_model.remove_item(id)
    let total = carrinho.total - (item.preco * item.quantidade)

    carrinho = await carrinho_model.update_carrinho(carrinho.id, total)
}

module.exports = {
    criar_item,
    remover_item
}