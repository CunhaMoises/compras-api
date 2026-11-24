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

async function email_verification (codigo, expiraCodigo,usuario_id) {
    return await prisma.verificacao_email.create ({
        data: {
            codigo: codigo,
            expiraEM: expiraCodigo,
            usuario_id
        }
    })
}



async function updateLogin (usuario_id) {
    return await prisma.usuarios.update({
        where: {
            id: usuario_id
        },
        data: {
            login: true
        }    
    })
}

async function find_user (email) {
    return await prisma.usuarios.findUnique({
        where: {
            email: email
        }
       
    })
}

async function find_verification (email) {
    return await prisma.usuarios.findUnique({
        where: {
            email:email
        }, include: {
            codigo: true
        }
        
    })
}

async function delete_verification (usuario_id) {
    return await prisma.usuarios.delete({
        where: {
            id: usuario_id,
            login: false
        }
    })
}

async function update_verification (codigo,expiraCodigo,usuario_id,usadoEM) {
    return await prisma.verificacao_email.update({
        where: {
            usuario_id: usuario_id
        }, data:{
            codigo: codigo,
            expiraEM: expiraCodigo,
            usadoEM: usadoEM,
            tentativas: {
                increment: 1
            } 

        }
    })
}

module.exports = {
    crate_user,
    email_verification,
    updateLogin,
    find_user,
    find_verification,
    delete_verification,
    update_verification
}