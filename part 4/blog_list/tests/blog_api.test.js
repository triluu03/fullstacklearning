const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)


// Examplary blogs list
const testBlogs = [
    {
        title: "Improving Fairness in Machine Learning",
        author: "Kenneth Holstein, et al.",
        url: "https://doi.org/10.1145/3290605.3300830",
        likes: 50,
    },
    {
        title: "A Minimal Turing Test: Can You Prove that You Are a Human?",
        author: "Luu, Duc Tri",
        url: "https://blogs.helsinki.fi/sahoo/2021/11/25/a-minimal-turing-test-can-you-prove-that-youre-a-human/",
        likes: 10,
    }
]


// Updating the MongoDB
beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(testBlogs[0])
    await blogObject.save()
    blogObject = new Blog(testBlogs[1])
    await blogObject.save()
})


// Testing the data type returned
test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 100000)


// Testing the ID of the blogs are defined
test('blogs identifier are named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
    expect(response.body[1].id).toBeDefined()
})


// Testing posting new blogs
test('a new blog can be added', async () => {
    const newBlog = {
        title: "Truth About Organic Food",
        author: "Sze Wing Fung",
        url: "https://blogs.helsinki.fi/sahoo/2021/11/30/truth-about-organic-food/",
        likes: 15,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const blogsAfter = await api.get('/api/blogs')
    expect(blogsAfter.body).toHaveLength(testBlogs.length + 1)

    const titles = blogsAfter.body.map(b => b.title)
    expect(titles).toContain(
        'Truth About Organic Food'
    )
})


// Testing missing likes property
test('default likes number is 0', async () => {
    const newBlog = {
        title: "All-In-One: A Single Solution to Three of the Biggest Conundrums about Reality",
        author: "Tuomas Ihamuotila",
        url: "https://blogs.helsinki.fi/sahoo/2021/11/29/all-in-one-a-single-solution-to-three-of-the-biggest-conundrums-about-reality/",
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const addedBlog = response.body.find(blog => blog.title === 'All-In-One: A Single Solution to Three of the Biggest Conundrums about Reality')

    expect(addedBlog.likes).toBe(0)
})


// Testing non-valid title and author field
test('missing title and author blog is not added', async () => {
    const newBlog = {
        title: "",
        author: "",
        url: "https://blogs.helsinki.fi/sahoo/2021/11/30/truth-about-organic-food/",
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})


afterAll(() => {
    mongoose.connection.close()
})