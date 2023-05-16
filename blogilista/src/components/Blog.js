import { useState } from "react"

const Blog = ({ blog, likeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const [expanded, setExpanded] = useState(false)

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
      </div>
    )
  }

  return (
    <div>
      {blog.title} {blog.author} <button onClick={() => setExpanded(true)}>View</button>
    </div>
  )
}

export default Blog