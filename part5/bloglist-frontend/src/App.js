import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const notificationMessage = (message, isError) => {
    setMessage(message)
      setIsError(isError)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault();
   
    try {
      const user = await loginService.login({
        username, password,
      });

      window.localStorage.setItem(
        "loggedBlogappUser", JSON.stringify(user)
      )
      blogService.setToken(user.token);
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notificationMessage("Wrong credentials", true)
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null)
  };

  const handleAddBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title,
      author,
      url
    };
    try {
      const returnedBlog = await blogService.create(blogObject);
      notificationMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author}`, false)
      setBlogs(blogs.concat(returnedBlog));
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (exception) {
      notificationMessage(exception.response.data.error, true)
    }
  };

  const loginForm = () => (
    <>
      <h2>Log in to application</h2>
      <Notification message={message} isError={isError}/>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form> 
    </>
  )

  const addBlogForm = () => (
    <>
      <h2>Create new</h2>
      <form onSubmit={handleAddBlog}>
        <div>
        title
            <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
            <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
            <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form> 
    </>
  )

  return (
  <>
    {user === null ?
        loginForm() :
        <>
          <h2>Blogs</h2>
          <Notification message={message} isError={isError}/>
          <p>
            <strong>{user.name}</strong> logged in  
            <button onClick={handleLogout}>logout</button>
          </p>
          {addBlogForm()}
            <Blog 
              blogs={blogs} 
            />
        </>
      }
  </>
  )
}

export default App