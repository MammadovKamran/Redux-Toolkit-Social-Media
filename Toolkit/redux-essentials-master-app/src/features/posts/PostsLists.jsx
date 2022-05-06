import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectAllPosts } from './postsSlice'
import TimeAgo from './TimeAgo'
import PostAuthor from './PostAuthor';
const PostsLists = () =>
{
  const postsData = useSelector( selectAllPosts )
  let renderedPosts;
if(postsData.length === 0) {
  renderedPosts = <h3 className='text-danger'>No posts yet</h3>
}else {
  renderedPosts = postsData.map( ( post ) =>
  {
    return (
      <div key={post.id} className="post_container">
        <h2>{post.title}</h2>
        <PostAuthor userId={post.userId} />
        <TimeAgo stringDate={post.date} />
        <p>{post.content}</p>
        <button className="btn btn-primary self_end"><Link to={`/posts/${ post.id }`}>Post page</Link></button>
      </div>
    )
  } )
}



  return (
    <div>
      <h1 className="py-2 text-muted">Posts</h1>
      {renderedPosts}
    </div>
  )
}

export default PostsLists
