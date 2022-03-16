const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userExtractor = async (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        const token = authorization.substring(7)
        const decodedToken = jwt.verify(token, process.env.SECRET)

        if (!decodedToken.id) {
            response.status(401).send({ error: 'token missing or invalid' })
        } else {
            request.user = await User.findById(decodedToken.id)
        }
    }
    next()
}


module.exports = { userExtractor }