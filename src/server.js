const app = require('./app.js')

const port = process.env.PORT || 8080;
require('./services/comprasService.js')

app.get('/',(req,res) => {
    res.send('hello world')
})
app.listen(port,()=> console.log(`servidor ouvindo na porta ${port}`));