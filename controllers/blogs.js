const blogsRouter = require("express").Router();
const Blog = require("../models/Blog");
const logger = require("../utils/logger");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  const user = await User.findById(body.userId);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  });

  const result = await blog.save();
  logger.info("saved!");
  user.blogs = user.blogs.concat(result._id);
  await user.save();
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
