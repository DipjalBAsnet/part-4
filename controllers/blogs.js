const blogsRouter = require("express").Router();
const Blog = require("../models/Blog");
const logger = require("../utils/logger");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);

  const result = await blog.save();
  logger.info("saved!");
  response.status(201).json(result);
});

blogsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  await Blog.findByIdAndRemove(id);

  res.status(204).end();
});

module.exports = blogsRouter;
