const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const Blog = require("../models/blog");
const bcrypt = require("bcrypt");
const User = require("../models/user");

mongoose.set("bufferTimeoutMS", 30000);


beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

const api = supertest(app);

describe("when there is initially some blogs saved", () => {
  test("all blogs are returned as json", async () => {
    const response = await api
      .get("/api/blogs")
      .expect("Content-Type", /application\/json/);
      
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("all must have an id property", async () => {
    const response = await api
      .get("/api/blogs");
    
    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });
});

describe("addition of a new blog", () => {
  test("succeeds with valid data" , async () => {
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

  test("If the like property does not exist, it will be 0 by default", async () => {
    const newBlog = {
      title: "the importance of async/await in javascript",
      author: "Albert Asynchronous",
      url: "http://blog.asynchronous.com"
    };
  
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0);
  });

  test("fails with status code 400 if data invalid", async () => {
    const newBlog = {
      author: "Albert Asynchronous"
    };
  
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400);
  });
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    );

    const titles = blogsAtEnd.map(r => r.title);

    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe("updating of a blog", () => {
  test("is updated correctly", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const update = {
      likes: 5
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(update)
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd[0].likes).toBe(update.likes);
  });
});

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(u => u.username);
    expect(usernames).toContain(newUser.username);
  });

});

describe("Add a new user with invalid data", () => {
  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("`username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("fails with status code 400 if name is less than 3 characters", async () => {
    const newUser = {
      username: "john",
      name: "12",
      password: "pass",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400);
  });

  test("fails with correct status code and message if password is less than 3 characters", async () => {
    const newUser = {
      username: "miles",
      name: "Miles Davis",
      password: "pw",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400);

    expect(result.body.error).toContain("password must have a minimum of 3 characters");
  });
});


afterAll(() => {
  mongoose.connection.close();
});
