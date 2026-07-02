const express = require('express')
const router = require('./routes/comprasRoutes')

const app = express ();

app.use(express.json())

app.use('/api', router)

app.get('/', (req,res)=> {
    res.send('hello world')
})

module.exports = app