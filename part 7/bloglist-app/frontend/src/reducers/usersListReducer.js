import { createSlice } from '@reduxjs/toolkit'

import userService from '../services/users'

const usersListSlice = createSlice({
    name: 'usersList',
    initialState: [],
    reducers: {
        setUsersList(state, action) {
            return action.payload
        },
    },
})

export const { setUsersList } = usersListSlice.actions

export default usersListSlice.reducer

export const initializeUsers = () => {
    return async (dispatch) => {
        const users = await userService.getAll()
        dispatch(setUsersList(users))
    }
}
