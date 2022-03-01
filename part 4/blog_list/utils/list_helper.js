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


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
}