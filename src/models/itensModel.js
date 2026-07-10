const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()


// cria o item
async function create_item (carrinho_id, data) {
    return await prisma.itens_carrinho.create({
        data: {
            nome: data.nome,
            preco:data.preco,
            quantidade:data.quantidade,
            carrinho_id
        }
    })
}

// procura o item
async function find_item (id) {
    return await prisma.itens_carrinho.findFirst ({
        where: {
            id  
        } 
    })

}

// remove o item
async function remove_item (id){
    return await prisma.itens_carrinho.delete({
        where: {
            id
        }
    })
}

module.exports = {
    create_item,
    find_item,
    remove_item
}