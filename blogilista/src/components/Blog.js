import { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({ blog, likeBlog, removeBlog, currentUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [expanded, setExpanded] = useState(false)
  const displayRemove = blog.user.username === currentUser.username ? true : false

  if (expanded) {
    return (
      <div style={blogStyle}>
        {blog.title} <button onClick={() => setExpanded(false)}>Hide</button>
        <br></br>
        {blog.url}
        <br></br>
        Likes: {blog.likes} <button onClick={() => likeBlog(blog)}>Like</button>
        <br></br>
        Author: {blog.author}
        <br></br>
        {displayRemove && <button onClick={() => removeBlog(blog)}>Remove</button>}
      </div>
    )
  }

  return (
    <div>
      {blog.title} {blog.author} <button onClick={() => setExpanded(true)}>View</button>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired
}

export default Blog