const lodash = require('lodash')

// For testing file
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1
}


// Calculating total likes
const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}


// Finding the most liked blog
const favoriteBlog = (blogs) => {
    const mostLike = Math.max(...blogs.map(blog => blog.likes), -Infinity)
    return blogs.find(blog => blog.likes === mostLike)
}


// Finding the author with the most blogs
const mostBlogs = (blogs) => {
    let groupByAuthor = lodash.groupBy(blogs, blog => blog.author)
    Object.keys(groupByAuthor).map(key => {
        groupByAuthor[key] = groupByAuthor[key].length
    })

    const numberBlogs = Object.values(groupByAuthor)
    const mostBlogs = Math.max(...numberBlogs)
    const desiredAuthor = Object.keys(groupByAuthor).find(key => groupByAuthor[key] === mostBlogs)

    return {
        author: desiredAuthor,
        blogs: mostBlogs,
    }
}


// Finding the author with the most likes
const mostLikes = (blogs) => {
    let groupByAuthor = lodash.groupBy(blogs, blog => blog.author)
    Object.keys(groupByAuthor).map(key => {
        const arrayLikes = groupByAuthor[key].map(blog => blog.likes)
        groupByAuthor[key] = arrayLikes.reduce((sum, item) => sum + item, 0)
    })

    const numberLikes = Object.values(groupByAuthor)

    const mostLikes = Math.max(...numberLikes)
    const desiredAuthor = Object.keys(groupByAuthor).find(key => groupByAuthor[key] === mostLikes)

    return {
        author: desiredAuthor,
        likes: mostLikes,
    }
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}