const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/auth')

const userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    age: Number,
    password: String,
})

module.exports = mongoose.model('user', userSchema)