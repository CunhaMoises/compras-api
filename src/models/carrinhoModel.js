const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

// criar o carrinho
async function create_carrinho (usuario_id) {
    return await prisma.carrinho.create({
        data: {
            usuario_id
        }
    })
}

// procurar carrinho ativo
async function find_carrinho_ativo (usuario_id) {
    return await prisma.carrinho.findFirst ( {
        where:{
            usuario_id,
            status: "ativo",
        }, include : {
            itens : true
        }
    })
}




// procurar carrinho
async function find_carrinho (id) {
    return await prisma.carrinho.findUnique ( {
        where: {
            id
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

// listar carrinho
async function list_carrinho (idUser) {
    return await prisma.carrinho.findMany ({
        where: {
            idUser
        }, include : {
            itens: true
        }
    })
}

// listar item do carrinho
async function list_items (id) {
    return await prisma.carrinho.findUnique ({
        where: {
            id
        }, include: {
            itens: true
        }
    })
}

// remover carrinho
async function remove_carrinho(id) {
    return await prisma.carrinho.delete ({
        where: {
            id
        }
    })
}

// conta quantos carrinhos tem
async function count_carrinho(idUser){
    return await prisma.carrinho.count({
        where: {
            idUser,
            status: "finalizado"
        }
    })
}



module.exports = {
    create_carrinho,
    find_carrinho_ativo,
    find_carrinho,
    update_carrinho,
    finish_carrinho,
    list_carrinho,
    list_items,
    remove_carrinho,
    count_carrinho
}