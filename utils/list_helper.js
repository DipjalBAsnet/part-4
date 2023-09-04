const dummy = (blogs) => {
  return 1;
};

const favouriteBlog = (blogs) => {
  const mostLikedBlog = blogs.reduce((max, blog) =>
    blog.likes > max.likes ? blog : max
  );

  return {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes,
  };
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
};
