import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login"
import Notification from './components/Notification'
import Error from './components/Error'
import LoginForm from './components/Login'
import CreateBlogForm from './components/CreateBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [notificationMessage, setNotificationMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")


  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await blogService.getAll()
      setBlogs(response)
    }

    const checkLoggedInUser = async () => {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
        setNotificationMessage(`User ${user.username} logged in`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      }
    }
    fetchBlogs()
    checkLoggedInUser()
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password, })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
      setNotificationMessage(`User ${user.username} logged in`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = async (event) => {
    event.preventDefault()
    if (user) {
      if (window.localStorage.getItem("loggedBlogappUser")) {
        window.localStorage.removeItem("loggedBlogappUser")
        console.log("removed user from local storage")
        setUser(null)
        blogService.setToken(null)
        setNotificationMessage("logged out succesfully")
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      }
    }
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    try {
      const response = await blogService.createBlog({ title, author, url })
      setNotificationMessage(`Added blog ${title} by ${author}`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    }
  }

  if (user === null) {
    return (
      <div>
        <Notification message={notificationMessage} />
        <Error message={errorMessage} />
        <div>
          <h2>Log in to application</h2>
          <LoginForm
            onSubmit={handleLogin}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        </div>
      </div>
    )
  }

  return (
    <div>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
      <h2>{user.username} is logged in</h2>
      <button onClick={handleLogOut}>Log out</button>
      <div>
        <CreateBlogForm
          onSubmit={handleCreateBlog}
          title={title}
          author={author}
          url={url}
          setAuthor={setAuthor}
          setTitle={setTitle}
          setUrl={setUrl}
        />
      </div>
      <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}
export default App