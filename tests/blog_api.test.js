const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

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

afterAll(async () => {
  await mongoose.connection.close();
});
