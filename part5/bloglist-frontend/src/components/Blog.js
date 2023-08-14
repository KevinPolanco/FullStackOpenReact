import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blogs, updateLike, user, removeBlog }) => {
  const [visibleBlogs, setVisibleBlogs] = useState({})
  const [buttonText, setButtonText] = useState({})

  const blogStyle = {
    padding: 3,
    paddingLeft: 2,
    border: 'solid',
    boderWidth: 1,
    marginBottom: 5
  }

  const handleToggleVisible = (blogId) => {
    setVisibleBlogs((prevVisibleBlogs) => ({
      ...prevVisibleBlogs,
      [blogId]: !prevVisibleBlogs[blogId]
    }))
    setButtonText((prevButtonText) => ({
      ...prevButtonText,
      [blogId]: prevButtonText[blogId] === 'hide' ? 'view' : 'hide'
    }))
  }

  const handleLike = (blogId) => {
    updateLike(blogId)
  }

  blogs.sort((a, b) => { return b.likes - a.likes})

  const handleRemoveButton = (blogId) => {
    removeBlog(blogId)
  }

  const visibilityRemoveButton = (user, blog) => {
    if (user.name === blog.user[0].name) {
      return (
        <div>
          <button onClick={() => handleRemoveButton(blog.id)}>
            remove
          </button>
        </div>
      )
    }
  }

  return (
    <div id='blog-list'>
      {blogs.map((blog) => (
        <div className='blog' style={blogStyle} key={blog.id}>
          <div>
            {blog.title} <i>{blog.author}</i>
            <button onClick={() => handleToggleVisible(blog.id)}>
              {buttonText[blog.id] || 'view'}
            </button>
          </div>
          {visibleBlogs[blog.id] && (
            <div>
              <div>
                <a rel="noopener noreferrer" target="_blank" href={blog.url}>
                  {blog.url}
                </a>
              </div>
              <div>
                {blog.likes}
                <button onClick={() => handleLike(blog.id)}>
                  like
                </button>
              </div>
              <div>
                {blog.user[0].name}
              </div>
              {visibilityRemoveButton(user, blog)}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

Blog.propTypes = {
  blogs: PropTypes.array.isRequired,
  updateLike: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog