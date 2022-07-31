const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    favouriteGenre: {
        type: String,
        require: true,
    },
})

module.exports = mongoose.model('User', schema)
