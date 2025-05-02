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

app.use(cors({
    origin: "http://localhost:5173", // Update as per frontend origin
    credentials: true
}))


app.get('/', (req, res) => {
    res.send('Hello')
})


app.post('/create', async (req, res) => {
    try {
        const { name, username, email, age, password } = req.body
        const existinguser = await userModel.findOne({ email })
        if (existinguser) {
            return res.status(400).json({ message: "This Email Is Already Registered" })
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        let user = await userModel.create({ name, username, email, age, password: hash })
        let token = jwt.sign({ email: email, userdid: user._id }, 'key')
        res.cookie("token", token)
        res.status(201).json({ message: "User created successfully", token })
    } catch (error) {
        console.error("Error creating user:", error)
        res.status(500).json({ message: "Server error", error })
    }


})

app.get('/getusers', async (req, res) => {
    try {
        const users = await userModel.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});


app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const existUser = await userModel.findOne({ email })
        if (!existUser) {
            return res.status(400).json({ message: "This Email Is Not Registered" })
        }
        bcrypt.compare(password, existUser.password, (err, result) => {
            if (result) {
                let token = jwt.sign({ email: existUser.email, userdid: existUser._id }, 'key')
                res.cookie("token", token)
                res.status(201).json({ message: "You Can Login", token })
            } else {
               res.status(401).json({ message: "Incorrect Email Or Password" })
            }
        })
    } catch (error) {
        console.error("Error Login user:", error)
        res.status(500).json({ message: "Server error", error })
    }
})

app.listen(3000, () => console.log("Server running on http://localhost:3000"))

