const AppError = require('../errors/AppError')
const jwt = require('jsonwebtoken')


function verifica_token (req, res, next) {
    try {
        const token = req.cookies.token

        if (!token) {
            throw new AppError('token não fornecido!', 403)
        }

        const dados = jwt.verify(token, process.env.JWT_SECRET)

        req.usuario_id = dados.id

        console.log('Usuário autenticado:', req.usuario_id)


        next()

    } catch (error) {
        return res.status(401).json({
            erro: error.message
        })
    }

}

module.exports = verifica_token