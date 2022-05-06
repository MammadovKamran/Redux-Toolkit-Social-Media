import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { editPost, selectPostsById } from './postsSlice'
import { Form, FormGroup, Input, Label, Button } from 'reactstrap'
import { selectUserById } from './../users/usersSlice'

const EditPostForm = () => {
    const { postID } = useParams()

    const selectedPost = useSelector((state) => selectPostsById(state, postID))
    const selectedUser = useSelector((state) =>
        selectUserById(state, selectedPost.userId)
)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [title, setTitle] = useState(selectedPost.title)
    const [content, setContent] = useState(selectedPost.content)
    const userName = selectedUser.name

    const isDisabled = [title, content].every(Boolean)

    const handleSubmit = (e) => {
        let recommend = prompt(
            'deyisiklik ede bilmek ucun istifadeci adin daxil edin',
            ''
        )

        if (isDisabled) {
            if (recommend && recommend.trim() === userName) {
                dispatch(
                    editPost({
                        title,
                        content,
                        id: postID,
                    })
                )
            }
            navigate(-1)
        }

        e.preventDefault()
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="title">Title</Label>
                    <Input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Type..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="content">Content</Label>
                    <Input
                        type="text"
                        name="content"
                        id="content"
                        placeholder="Type..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </FormGroup>
                <Button disabled={!isDisabled}>Save</Button>
            </Form>
        </div>
    )
}

export default EditPostForm
