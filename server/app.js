const express = require("express")
const app = express()
const userModel = require('./models/user')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser')
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

app.get('/', (req, res) => {
    res.send('Hello')
})

app.post('/create', (req, res) => {
    const { name, username, email, age, password } = req.body
    let user = userModel.findOne({ email })
    if (user) {
        return res.status(500).send("This Email Is Already Registered")
    }
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let user = await userModel.create({ name, username, email, age, password: hash })
            let token = jwt.sign({ email: email, userdid: user._id }, 'key')
            res.cookie("token", token)
        })
    })
})

app.get('/getusers', async (req, res) => {
    try {
        const users = await userModel.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

app.listen(3000)