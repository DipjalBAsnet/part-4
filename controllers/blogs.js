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

blogsRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const { likes } = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { likes },
    { new: true }
  );

  if (!updatedBlog) {
    return response.status(404).json({ error: "Blog not found" });
  }
  response.json(updatedBlog);
});

module.exports = blogsRouter;
