const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const express = require('express')
const http = require('http')

const mongoose = require('mongoose')

const User = require('./models/user')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const jwt = require('jsonwebtoken')
const JWT_SECRET = 'THIS_IS_FOR_TOKEN'

const MONGODB_URI =
    'mongodb+srv://triluu:180302@learnwebdev.4lppr.mongodb.net/libraryApp?retryWrites=true&w=majority'
console.log('connecting to', MONGODB_URI)

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB', error.message)
    })

const start = async () => {
    const app = express()
    const httpServer = http.createServer(app)

    const schema = makeExecutableSchema({ typeDefs, resolvers })

    const server = new ApolloServer({
        schema,
        context: async ({ req }) => {
            const auth = req ? req.headers.authorization : null
            if (auth && auth.toLowerCase().startsWith('bearer ')) {
                const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
                const currentUser = await User.findById(decodedToken.id)
                return { currentUser }
            }
        },
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    })

    await server.start()

    server.applyMiddleware({
        app,
        path: '/',
    })

    const PORT = 4000

    httpServer.listen(PORT, () =>
        console.log(`Server is now running on http://localhost:${PORT}`)
    )
}

start()
