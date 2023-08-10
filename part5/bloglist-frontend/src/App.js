import { useState, useEffect, useRef  } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const notificationMessage = (message, isError) => {
    setMessage(message)
    setIsError(isError)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notificationMessage('Wrong credentials', true)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      if (returnedBlog.title) blogFormRef.current.toggleVisibility()
      notificationMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author}`, false)
      setBlogs(blogs.concat(returnedBlog))
    } catch (exception) {
      notificationMessage(exception.response.data.error, true)
    }
  }

  const updateLike = async (id) => {
    try {
      const blogToUpdate =  blogs.find(blog => blog.id === id)
      const blogObject = {
        likes: blogToUpdate.likes + 1,
        author: blogToUpdate.author,
        title: blogToUpdate.title,
        url: blogToUpdate.url
      }
      const returnedBlog = await blogService.update(id, blogObject)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog ))
    } catch (exception) {
      notificationMessage(exception.response.data.error, true)
    }
  }

  const removeBlog = async (id) => {
    try {
      const blog = blogs.find((blog) => blog.id === id)
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
        await blogService.remove(id)
        notificationMessage(`${blog.title} by ${blog.author} has been deleted`, false)
        setBlogs(blogs.filter((blog) => blog.id !== id))
      }
    } catch (exception) {
      notificationMessage(exception.response.statusText, true)
    }
  }

  return (
    <div>
      {!user && 
      <>
         <Notification message={message} isError={isError}/>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </>
      }
      {user &&
      <div>
        <h2>Blogs</h2>
        <Notification message={message} isError={isError}/>
        <p>
          <strong>{user.name}</strong> logged in
          <button onClick={handleLogout}>logout</button>
        </p>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog}/>
        </Togglable>
        <Blog
          blogs={blogs}
          updateLike={updateLike}
          user={user}
          removeBlog={removeBlog}
        />
      </div>
      }
    </div>
  )
}

export default App