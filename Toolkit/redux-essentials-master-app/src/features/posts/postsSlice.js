import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

const initialState = {
    status: 'idle',
    error: null,
    selectedPost: {},
    posts: [],
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    let url = 'http://localhost:3000/posts'

    try {
        let request = await fetch(url)
        return await request.json()
    } catch (error) {
        throw new Error(error)
    }
})

export const addPosts = createAsyncThunk(
    'posts/addPosts',
    async (paramsPost) => {
        let url = 'http://localhost:3000/posts'

        try {
            let request = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(paramsPost),
                headers: { 'Content-type': 'application/json' },
            })

            return await request.json()
        } catch (error) {
            throw new Error(error)
        }
    }
)

const postsSlice = createSlice(sliceInvoker())

function sliceInvoker() {
    return {
        name: 'posts',
        initialState,
        reducers: {
            addPost: {
                reducer: (state, action) => {
                    state.posts.push(action.payload)
                },
                prepare: (title, content, userId) => {
                    return {
                        payload: {
                            title,
                            content,
                            userId,
                            id: nanoid(),
                            date: new Date().toISOString(),
                        },
                    }
                },
            },

            editPost: (state, action) => {
                const { id, title, content } = action.payload

                const findedPost = state.posts.find(
                    (p) => p.id === parseInt(id)
                )

                if (findedPost) {
                    findedPost.title = title
                    findedPost.content = content
                }
            },
        },
        extraReducers: {
            [fetchPosts.pending]: (state, action) => {
                state.status = 'loading'
            },
            [fetchPosts.fulfilled]: (state, action) => {
                state.status = 'succeeded'
                state.posts = state.posts.concat(action.payload)
            },
            [fetchPosts.rejected]: (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            },
            [addPosts.pending]: (state, action) => {
                state.status = 'loading'
            },
            [addPosts.fulfilled]: (state, action) => {
                state.status = 'succeeded'
                state.posts = state.posts.concat(action.payload)
            },
            [addPosts.rejected]: (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            },
        },
    }
}

export const selectAllPosts = (state) => state.posts.posts

export const selectPostsById = (state, postId) => {
    return state.posts.posts.find((post) => post.id === parseInt(postId))
}

export const { addPost, editPost } = postsSlice.actions

export default postsSlice.reducer
