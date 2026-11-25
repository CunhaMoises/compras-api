const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const privateRoutes = require('./routes/privateRoutes.js')
const publicRoutes = require('./routes/publicRoutes.js')

const autenticado = require('./middlewares/middlewares.js')


const app = express ();

app.use(express.json())

const dominios = [
    process.env.FRONT_END,
    process.env.FRONT_END2
]

app.use(cors({
    origin: dominios,
    credentials: true
}))

app.use(cookieParser())

app.use('/api', publicRoutes)
app.use('/api', autenticado, privateRoutes)

app.get('/', (req,res)=> {
    res.send('hello world')
})

module.exports = app