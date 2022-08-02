const {
    ApolloServer,
    gql,
    UserInputError,
    AuthenticationError,
} = require('apollo-server')
const mongoose = require('mongoose')

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

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

const { v1: uuid } = require('uuid')

const typeDefs = gql`
    type Author {
        name: String!
        born: Int
    }

    type Book {
        title: String!
        author: Author!
        published: Int!
        genres: [String!]!
    }

    type User {
        username: String!
        favouriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
        favouriteGenre: String!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book
        editAuthor(name: String!, setBornTo: Int!): Author
        createUser(username: String!, favouriteGenre: String!): User
        login(username: String!, password: String!): Token
    }
`

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            if (!args.author && !args.genre) {
                return Book.find({}).populate('author')
            }

            const book = await Book.find({
                genres: { $in: [args.genre] },
            })
            return book
        },
        allAuthors: async () => {
            return Author.find({})
        },
        me: (root, args, context) => context.currentUser,
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new AuthenticationError('not authenticated')
            }

            const author = await Author.findOne({ name: args.author })
            if (!author) {
                const newAuthor = new Author({
                    name: args.author,
                    id: uuid(),
                })
                try {
                    await newAuthor.save()
                    const book = new Book({
                        ...args,
                        author: newAuthor,
                        id: uuid(),
                    })
                    await book.save()
                    return book
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                }
            } else {
                try {
                    const book = new Book({
                        ...args,
                        author: author,
                        id: uuid(),
                    })
                    await book.save()
                    return book
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                }
            }
        },
        editAuthor: async (root, args) => {
            const author = await Author.findOne({ name: args.name })
            if (!author) {
                return null
            }

            try {
                author.born = args.setBornTo
                await author.save()

                return author
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
        },
        createUser: async (root, args) => {
            const user = new User({ ...args })
            return user.save().catch((error) => {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secret') {
                throw new UserInputError('wrong credentials')
            }

            const userForToken = {
                username: user.username,
                favouriteGenre: user.favouriteGenre,
                id: user._id,
            }

            return {
                value: jwt.sign(userForToken, JWT_SECRET),
                favouriteGenre: user.favouriteGenre,
            }
        },
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    },
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
