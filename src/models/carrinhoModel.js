const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

// criar o carrinho
async function create_carrinho (idUser) {
    return await prisma.carrinho.create({
        data: {
            idUser
        }
    })
}

// procurar carrinho
async function find_carrinho (idUser) {
    return await prisma.carrinho.findFirst ( {
        where:{
            idUser,
            status: "ativo",
        }
    })
}

// atualizar carrinho
async function update_carrinho (id, total) {
    return await prisma.carrinho.update({
        where: {
            id
        },
        data: {
            total
        }
    })
}

// finalizar carrinho
async function finish_carrinho (id){
    return await prisma.carrinho.update ({
        where:{
            id,
            status: "ativo"
        },
        data: {
            status: "finalizado"
        }
    })

}

module.exports = {
    create_carrinho,
    find_carrinho,
    update_carrinho,
    finish_carrinho
}