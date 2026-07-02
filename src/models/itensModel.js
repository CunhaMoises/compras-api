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


module.exports = {
    create_item
}