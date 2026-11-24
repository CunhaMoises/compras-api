
const usuarios_model = require('../models/usuariosModel')
const carrinhos_model = require('../models/carrinhosModel')
const nodemailer = require('../services/nodemailerService')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const AppError = require('../errors/AppError')

const tentativaMax = 3


async function create_user (data) {
    try {
        // verifica os campos invalidos e vazios
        if(!data.nome?.trim() || !data.email?.trim() || !data.senha?.trim()) {
            throw new AppError('Preencha os campos corretamente!', 400)
        }

        // cria a hash da senha e cria o usuario
        const hash = await bcrypt.hash(data.senha, 10)
        let usuario = await usuarios_model.crate_user(data, hash)
        
        // cria o carrinho
        const carrinho = await carrinhos_model.create_carrinho(usuario.id)

        console.log('usuario: ',usuario)
        console.log('id do usuario: ', usuario.id)

        
        // gera o codigo e envia pelo email
        const codigo = crypto.randomInt(100000, 1000000)

        const email = await nodemailer.enviarEmail(data.email,codigo)

        const expiraCodigo = new Date(Date.now())
        
        console.log('tempo do codigo gerado : ', expiraCodigo)

        const verifica = await usuarios_model.email_verification(codigo.toString(), expiraCodigo,usuario.id)

        const token = jwt.sign({id:usuario.id, nome:usuario.nome, email:usuario.email, login: usuario.login}, process.env.JWT_SECRET, { expiresIn: '120m'})
        

        return {
            token, 
            usuario_email:usuario.email
        }

    } catch (error) {
        if(error.code == 'P2002') {
            throw new AppError ('email ja cadastrado!', 400)
        }
        
        throw error
    }
    
}

async function validate_code (data) {
    const usuario = await usuarios_model.find_verification(data.usuario_email)
    const limite = new Date(Date.now() - 2 * 60 * 1000)
    const usadoEM = new Date(Date.now())

    console.log('usuario validado: ', usuario)

    // verifica se o email enviado na requisição é o mesmo digitado na página de cadastro
    if(usuario === null) {
        throw new AppError('E-mail enviado é diferente do E-mail que foi cadastrado',400)
    }

    // impede campos inválidos
    if(!data.usuario_email || !data.codigo) {
        throw new AppError("Insira os dados corretamente!", 400)
    }

    if(data.codigo !== usuario.codigo.codigo) {
        throw new AppError("Código inválido!", 400)
    }

    // verifica se já passou os 2 minutos de validade do código
    if(new Date(limite) >= new Date(usuario.codigo.expiraEM)) {
        throw new AppError('Código expirado, gere outro por favor!', 400)
    }

    const expiraEM = await usuarios_model.update_verification(data.codigo, limite, usuario.id, usadoEM)
    const logado = await usuarios_model.updateLogin(usuario.id)

    return usuario

}

async function resend_code (data) {
    try {

        console.log('data: ', data)
        // gera o codigo e envia pelo email
        const codigo = crypto.randomInt(100000, 1000000)
        const email = await nodemailer.enviarEmail(data.usuario_email,codigo)

        const usuario = await usuarios_model.find_verification(data.usuario_email)

        const expiraCodigo = new Date(Date.now())

        
        console.log('tempo do codigo gerado : ', expiraCodigo)
        
        if(usuario.codigo.tentativas >= tentativaMax) {
            const remove = await usuarios_model.delete_verification(usuario.id)
            throw new AppError('Numero de tentativas máxima atingida, tente novamente mais tarde')
            
        }
        
        const verifica = await usuarios_model.update_verification(codigo.toString(), expiraCodigo,usuario.id)
        

        console.log('usuario reenviado :', usuario)


        return usuario
        
    } catch (error) {
        console.error('erro: ', error)
        throw error
    }
}

async function login (data) {
    
    const usuario = await usuarios_model.find_user(data.email)

    if(!usuario) {
        throw new AppError('Usuario ou senha inválidos!', 400)
    }

    // compara a senha digitada com a salva no banco
    const senha  = await bcrypt.compare(data.senha, usuario.senha)

    if(senha == false) {
        throw new AppError('Usuario ou senha inválidos!', 400)
    }

    const token = jwt.sign({id:usuario.id, nome:usuario.nome, email:usuario.email, login: usuario.login}, process.env.JWT_SECRET, { expiresIn: '120m'})



    return token

}

module.exports = {
    login,
    create_user,
    validate_code,
    resend_code
}
