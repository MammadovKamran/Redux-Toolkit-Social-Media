
import React from 'react'
import Navi from '../navigation/Navi'
import Dashboard from './Dashboard'
import EditPostForm from './../posts/EditPostForm'
import { Routes, Route } from 'react-router-dom'
import SinglePostPage from '../posts/SinglePostPage'

const App = () => {
  return (
    <div className="container">
      <Navi />
      <Routes>
        <Route  path="/" element={<Dashboard />} />
        <Route path="/posts/:postID" element={<SinglePostPage />} />
        <Route path="/posts/editpost/:postID" element={<EditPostForm />}/>
      </Routes>
    </div>
  )
}

export default App
