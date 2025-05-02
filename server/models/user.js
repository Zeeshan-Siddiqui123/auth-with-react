const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/auth-with-react')

const userSchema = new mongoose.Schema({
    name: String,
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    age: Number,
    password: String

})

module.exports = mongoose.model("users", userSchema)
