// @ts-nocheck
import React, { useState, useEffect } from 'react'
import { unwrapResult } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { addPosts } from './postsSlice'
import { fetchUsers, selectAllUsers } from '../users/usersSlice'

const AddPostFrom = () =>
{
  const [ title, setTitle ] = useState( '' )
  const [ content, setContent ] = useState( '' )
  const [ status, setStatus ] = useState( 'idle' )
  const [ userId, setUserId ] = useState( {} )

  const users = useSelector( selectAllUsers )

  const isDisabled = [ title, content ].every( Boolean ) && status === 'idle'

  const renderedUsers = users.map( ( user ) =>
  {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    )
  } )

  const dispatch = useDispatch()

  const handleSubmit = ( e ) =>
  {
    if ( isDisabled )
    {
      e.preventDefault()
      setStatus( 'pending' )
      let result = dispatch(
        addPosts( { title, content, userId, date: new Date().toISOString() } )
      )
      setTitle('')
      setContent('')
      setUserId('')
      return unwrapResult( result )
    }

    setStatus( 'idle' )
    e.preventDefault()
  }

  useEffect( () =>
  {
    dispatch( fetchUsers() )
  }, [ dispatch ] )

  return (
    <div className="p-md-20">
      <h1>Add Posts</h1>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          value={title}
          onChange={( e ) => setTitle( e.target.value )}
        />
        <input
          type="text"
          className="form-control mt-2"
          placeholder="content"
          value={content}
          onChange={( e ) => setContent( e.target.value )}
        />
        <select
          className="form-control mt-2"
          value={userId}
          onChange={( e ) => setUserId( e.target.value )}
        >
          <option>Choose user</option>
          {renderedUsers}
        </select>
        <div className="d-grid gap-2 mt-2">
          <button
            disabled={!isDisabled}
            className="btn btn-primary"
            type="submit"
          >
            Button
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddPostFrom
