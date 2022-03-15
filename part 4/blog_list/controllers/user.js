const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
    response.json(users)
})


usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (username === password || password.length < 3) {
        return response.status(400).json({
            error: 'invalid username or password'
        })
    }

    const existingUser = await User.findOne({ username })
    if (existingUser) {
        return response.status(400).json({
            error: 'username has been used'
        })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    console.log(passwordHash)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    try {
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch {
        return response.status(400).json({
            error: 'invalid username or password'
        })
    }
})

module.exports = usersRouter