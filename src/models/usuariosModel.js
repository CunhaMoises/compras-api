const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

//criando usuario
async function crate_user(data, hash) {
    return await prisma.usuarios.create({
        data:{
            nome:data.nome,
            email:data.email,
            senha: hash
        }
    })
}

async function login (email) {
    return await prisma.usuarios.findUnique({
        where: {
            email: email
        }
       
    })
}

module.exports = {
    crate_user,
    login
}