import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'

import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        newBlog(state, action) {
            return state.concat(action.payload)
        },
        removeBlog(state, action) {
            return state.filter((blog) => blog.id !== action.payload)
        },
        modify(state, action) {
            const id = action.payload.id
            const updatedBlog = action.payload.updatedBlog
            return state.map((blog) => (blog.id !== id ? blog : updatedBlog))
        },
    },
})

export const { setBlogs, newBlog, removeBlog, modify } = blogSlice.actions

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
    }
}

export const createBlog = (blogObject) => {
    return async (dispatch) => {
        const createdBlog = await blogService.create(blogObject)
        dispatch(newBlog(createdBlog))
        dispatch(
            setNotification({
                message: `a new blog "${createdBlog.title}" by ${createdBlog.author} added`,
                type: 'info',
            })
        )
    }
}

export const deleteBlog = (id) => {
    return async (dispatch) => {
        await blogService.remove(id)
        dispatch(removeBlog(id))
    }
}

export const updateBlog = (id, blogObject) => {
    return async (dispatch) => {
        const updatedBlog = await blogService.update(id, blogObject)
        dispatch(modify({ id, updatedBlog }))
    }
}

export default blogSlice.reducer
