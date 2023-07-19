const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const Blog = require("../models/blog");

mongoose.set("bufferTimeoutMS", 30000);


beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

const api = supertest(app);

test("all blogs are returned as json", async () => {
  const response = await api
    .get("/api/blogs")
    .expect("Content-Type", /application\/json/);
    
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("all blogs must have an id property", async () => {
  const response = await api
    .get("/api/blogs");
  
  response.body.forEach((blog) => {
    expect(blog.id).toBeDefined();
  });
});

test("you can add a valid blog" , async () => {
  const newBlog = {
    title: "the importance of async/await in javascript",
    author: "Albert Asynchronous",
    url: "http://blog.asynchronous.com",
    likes: 60,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map(r => r.title);
  expect(titles).toContain(
    "the importance of async/await in javascript"
  );
});

afterAll(() => {
  mongoose.connection.close();
});