const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        minLength: 3,
        required: true,
    },
    name: String,
    password: {
        type: String,
        minLength: 3,
        required: true,
    },
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    }
})

module.exports = mongoose.model('User', userSchema)