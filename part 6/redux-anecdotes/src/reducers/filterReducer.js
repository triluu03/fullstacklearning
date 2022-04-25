import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
    name: 'filtering',
    initialState: '',
    reducers: {
        filter(state, action) {
            console.log(state)
            return action.payload
        }
    }
})


export const { filter } = filterSlice.actions
export default filterSlice.reducer