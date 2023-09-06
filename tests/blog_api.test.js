const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/Blog");

const api = supertest(app);

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 10000);

test('blog has "_id" property', async () => {
  const response = await api.get("/api/blogs");
  console.log(response.body);
  const firstBlog = response.body[0];

  expect(firstBlog.id).toBeDefined();
}, 10000);

test("a new blog post can be created", async () => {
  const newBlog = {
    title: "Test Blog",
    author: "Test Author",
    url: "http://testurl.com",
    likes: 41,
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAfterPost = await Blog.find({});
  expect(blogsAfterPost).toHaveLength(3);

  const savedBlog = blogsAfterPost[0];
  expect(savedBlog.title).toBe(newBlog.title);
  expect(savedBlog.author).toBe(newBlog.author);
  expect(savedBlog.url).toBe(newBlog.url);
  expect(savedBlog.likes).toBe(newBlog.likes);

  expect(response.body.title).toBe(newBlog.title);
  expect(response.body.author).toBe(newBlog.author);
  expect(response.body.url).toBe(newBlog.url);
  expect(response.body.likes).toBe(newBlog.likes);
}, 10000);

test("a new blog post with missing 'likes' defaults to 0", async () => {
  const newBlog = {
    title: "Test Blog",
    author: "Test Author",
    url: "http://testurl.com",
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  expect(response.body.likes).toBe(0);
}, 10000);

afterAll(async () => {
  await mongoose.connection.close();
});
