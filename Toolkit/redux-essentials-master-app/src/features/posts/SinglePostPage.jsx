import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import PostAuthor from './PostAuthor';
import { selectPostsById } from './postsSlice';


const SinglePostPage = () =>
{

  const { postID } = useParams();

  const selectedPost = useSelector( state => selectPostsById( state, postID ) );

  if ( selectedPost )
  {
    return (
      <div key={selectedPost.id} className="post_container">
        <h2>{selectedPost.title}</h2>
        <PostAuthor userId={selectedPost.userId} />
        <p>{selectedPost.content}</p>
        <button className="btn btn-primary self_end"><Link to={`/posts/editpost/${ selectedPost.id }`}>Edit post</Link></button>
      </div>
    )
  }


  return (
    <div>
      <h1>Post not found</h1>
    </div>
  )
}

export default SinglePostPage