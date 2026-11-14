const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

// cria o usuario
async function create_user(data) {
    return await prisma.usuario.create({
        data: {
            nome: data.nome,
            email: data.email,
            senha: data.senha
        }

    })

   
}

// buscar usuario
async function find_user () {
    return prisma.usuario.findMany({
        select: {
            email:true
        }
    })
}


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
// remove todos os itens do carrinho
async function clear_car (id) {
    return await prisma.itens_carrinho.deleteMany ({
        where: {
            carrinho_id : id
        }
    })
}

module.exports = {
    create_user,
    find_user,
    create_item,
    find_item,
    remove_item,
    clear_car
}