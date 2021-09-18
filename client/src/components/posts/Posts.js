import React from 'react'
import Post from '../post/Post'
import "./Posts.css"
const posts = ({ posts }) => {
    return (
        <div className="posts">
          {posts.map((p) => (
            <Post post={p} />
          ))}
        </div>
      );
}

export default posts
