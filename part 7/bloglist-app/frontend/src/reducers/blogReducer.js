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
    },
})

export const { setBlogs, newBlog } = blogSlice.actions

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

export default blogSlice.reducer
