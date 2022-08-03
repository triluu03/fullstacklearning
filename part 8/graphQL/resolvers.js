const { UserInputError, AuthenticationError } = require('apollo-server')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

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

            let book = new Book({
                title: args.title,
                published: args.published,
                genres: args.genres,
            })

            try {
                const author = await Author.findOne({ name: args.author })
                if (!author) {
                    const newAuthor = new Author({
                        name: args.author,
                        id: uuid(),
                    })
                    await newAuthor.save()
                    book.author = newAuthor
                    await book.save()
                } else {
                    book.author = author
                    await book.save()
                }
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }

            book = await Book.findById(book.id).populate('author')

            pubsub.publish('BOOK_ADDED', book)

            return book
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
    Subscription: {
        bookAdded: {
            subscibe: () => pubsub.asyncIterator('BOOK_ADDED'),
        },
    },
}

module.exports = resolvers
