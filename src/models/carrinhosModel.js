const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

// criar o carrinho
async function create_carrinho (usuario_id) {
    return await prisma.carrinhos.create({
        data: {
            usuario_id
        }
    })
}

// procurar carrinho ativo
async function find_carrinho_ativo (usuario_id) {
    return await prisma.carrinhos.findFirst ( {
        where:{
            usuario_id,
            status: "ativo",
        }, include : {
            itens : true
        }
    })
}

// procurar carrinho
async function find_carrinho (carrinho_id) {
    return await prisma.carrinhos.findUnique ( {
        where: {
            id: carrinho_id
        }
    })
}

// atualizar carrinho
async function update_carrinho (id, total) {
    return await prisma.carrinhos.update({
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
    return await prisma.carrinhos.update ({
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
async function list_carrinho (usuario_id) {
    return await prisma.carrinhos.findMany ({
        where: {
            usuario_id
        }, include : {
            itens: true
        }
    })
}

// listar item do carrinho
async function list_items (carrinho_id) {
    return await prisma.carrinhos.findUnique ({
        where: {
            id: carrinho_id
        }, include: {
            itens: true
        }
    })
}

// remover carrinho
async function remove_carrinho(carrinho_id) {
    return await prisma.carrinhos.delete ({
        where: {
            id: carrinho_id
        }
    })
}

// conta quantos carrinhos tem
async function count_carrinho(usuario_id){
    return await prisma.carrinhos.count({
        where: {
            usuario_id,
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