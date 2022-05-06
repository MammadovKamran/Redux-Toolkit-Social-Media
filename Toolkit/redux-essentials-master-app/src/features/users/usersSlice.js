// @ts-nocheck
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: 'idle',
    error: null,
    selectedUser: {},
    users: [],
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    let url = 'http://localhost:3000/users'

    try {
        let request = await fetch(url)
        return await request.json()
    } catch (error) {
        return new Error(error)
    }
})

const sliceInvoker = () => {
    return {
        name: 'users',
        initialState,
        reducers: {},
        extraReducers: {
            [fetchUsers.pending]: (state, action) => {
                state.status = 'loading'
            },
            [fetchUsers.fulfilled]: (state, action) => {
                state.status = 'succeeded'
                while (state.users.length > 0) {
                    state.users.pop()
                }
                state.users = state.users.concat(action.payload)
            },
            [fetchUsers.rejected]: (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            },
        },
    }
}

const usersSlice = createSlice(sliceInvoker())

export const selectAllUsers = (state) => state.users.users

export const selectUserById = (state, userId) => {
    return state.users.users.find((user) => user.id === parseInt(userId))
}

export default usersSlice.reducer
