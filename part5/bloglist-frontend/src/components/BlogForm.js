import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            id='blog-title-input'
          />
        </div>
        <div>
            author
          <input
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            id='blog-author-input'
          />
        </div>
        <div>
            url
          <input
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            id='blog-url-input'
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm