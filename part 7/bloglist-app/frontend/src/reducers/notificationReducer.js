import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        notify(state, action) {
            return action.payload
        },
    },
})

export const { notify } = notificationSlice.actions

export const setNotification = (notification) => {
    return (dispatch) => {
        dispatch(notify(notification))
        setTimeout(() => {
            dispatch(notify(null))
        }, 3000)
    }
}

export default notificationSlice.reducer
