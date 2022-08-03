const { UserInputError, AuthenticationError } = require('apollo-server')

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const { v1: uuid } = require('uuid')

const jwt = require('jsonwebtoken')
const JWT_SECRET = 'THIS_IS_FOR_TOKEN'

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

module.exports = resolvers
