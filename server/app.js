const express =  require("express")
const app = express()
const userModel = require('./models/user')

app.get('/', (req, res)=>{
    res.send('Hello')
})

app.listen(3000)