const blogsRouter = require("express").Router();
const Blog = require("../models/Blog");
const logger = require("../utils/logger");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  console.log("auth header", authorization);
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  console.log("body", body);
  console.log("req", request.params);

  try {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }

    const user = await User.findById(decodedToken.id);

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
  } catch (error) {
    response.status(401).json({ error: "token invalid" });
  }
});

blogsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  await Blog.findByIdAndRemove(id);

  res.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const { likes } = request.body;

  console.log("Updating likes for blog with id:", id);
  console.log("New likes:", likes);

  try {
    // Find the blog by ID and update the likes
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { likes },
      { new: true }
    );

    if (!updatedBlog) {
      return response.status(404).json({ error: "Blog not found" });
    }

    response.json(updatedBlog);
  } catch (error) {
    console.error("Error updating likes:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = blogsRouter;
