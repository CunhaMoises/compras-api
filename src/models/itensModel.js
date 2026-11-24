const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()


// cria o item
async function create_items (carrinho_id, data) {
    return await prisma.itens_carrinho.create({
        data: {
            nome: data.nome,
            preco: Number(data.preco),
            quantidade: Number(data.quantidade),
            carrinho_id
        }
    })
}

// procura o item
async function find_item (item_id) {
    return await prisma.itens_carrinho.findFirst ({
        where: {
            id: item_id  
        } 
    })

}

// remove o item
async function remove_item (item_id){
    return await prisma.itens_carrinho.delete({
        where: {
            id: item_id
        }
    })
}
// remove todos os itens do carrinho
async function clear_car (id) {
    return await prisma.itens_carrinho.deleteMany ({
        where: {
            carrinho_id : id
        }
    })
}

module.exports = {
    create_items,
    find_item,
    remove_item,
    clear_car
}