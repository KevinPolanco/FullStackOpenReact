const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate("user", {
      username: 1,
      name: 1
    });
  
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog.toJSON());
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;
  const user = await User.findById(request.user.id);
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url : body.url,
    likes: body.likes || 0,
    user: user.id
  });
  
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();
  
  response
    .status(201)
    .json(savedBlog);
});

blogsRouter.delete("/:id", middleware.userExtractor, async (request, response) => {
  const userId = request.user.id;
  const blog = await Blog.findById(request.params.id);
  const blogUserId = blog.user.toString();
  if(!(userId === blogUserId)) {
    return response.status(401).json({ error: "wrong user"});
  } 
  await Blog.findByIdAndRemove(request.params.id);
  
  response
    .status(204)
    .end();
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url : body.url,
    likes: body.likes,
  };

  let updateBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  response
    .json(updateBlog.toJSON());
});


module.exports = blogsRouter;