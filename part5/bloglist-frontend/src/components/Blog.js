const Blog = ({blogs}) => {
  return (
    <div>
      {blogs.map((blog) => (
        <p key={blog.id}>
          {blog.title} <i>{blog.author}</i>
        </p>
      ))}
    </div> 
  ) 
}

export default Blog