import { useState } from "react";

const Blog = ({blogs, updateLike}) => {
  const [visibleBlogs, setVisibleBlogs] = useState({});
  const [buttonText, setButtonText] = useState({});

  const blogStyle = {
    padding: 3,
    paddingLeft: 2,
    border: 'solid',
    boderWidth: 1,
    marginBottom: 5
  };

  const handleToggleVisible = (blogId) => {
    setVisibleBlogs((prevVisibleBlogs) => ({
      ...prevVisibleBlogs,
      [blogId]: !prevVisibleBlogs[blogId]
    }));
    setButtonText((prevButtonText) => ({
      ...prevButtonText,
      [blogId]: prevButtonText[blogId] === "hide" ? "view" : "hide"
    }));
  };

  const handleLike = (blogId) => {
    updateLike(blogId)
  };

  blogs.sort((a, b) => { return a.likes - b.likes})

  return (
    <div >
      {blogs.map((blog) => (
        <div style={blogStyle} key={blog.id}>
          <div>
            {blog.title} <i>{blog.author}</i>
            <button onClick={() => handleToggleVisible(blog.id)}>
            {buttonText[blog.id] || "view"}
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
            </div>
          )}
        </div>
      ))}
    </div> 
  ) 
}
export default Blog