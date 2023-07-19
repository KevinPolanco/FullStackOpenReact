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

afterAll(() => {
  mongoose.connection.close();
});