import React from 'react'
import AddPostFrom from '../posts/AddPostFrom'
import PostsLists from '../posts/PostsLists'
const Dashboard = () =>
{
    return (
        <div>
            <AddPostFrom />
            <PostsLists />
        </div>
    )
}

export default Dashboard