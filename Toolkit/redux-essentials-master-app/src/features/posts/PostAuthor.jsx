import React from 'react'
import { selectUserById } from './../users/usersSlice'
import { useSelector } from 'react-redux'

const PostAuthor = ({ userId }) => {
    const author = useSelector((state) => selectUserById(state, userId))

    return (
        <div>
            <i>author: {author ? author.name : 'unknown user'}</i>
        </div>
    )
}

export default PostAuthor
