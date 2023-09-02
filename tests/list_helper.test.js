const listHelper = require("../utils/list_helper");

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "64f189a9babd916115fc6ef7",
      title: "The Benefits of Regular Exercise",
      author: "Jane Smith",
      url: "abcdefgh",
      likes: 1000,
      __v: 0,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(1000);
  });

  test("of empty list is zero", () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });
  test("of a bigger list is calculated right", () => {
    const blogs = [
      {
        _id: "64f1852ababd916115fc6ef4",
        title: "Example Blog Title",
        author: "John Doe",
        url: "https://example.com",
        likes: 10,
        __v: 0,
      },
      {
        _id: "64f189a9babd916115fc6ef7",
        title: "The Benefits of Regular Exercise",
        author: "Jane Smith",
        url: "abcdefgh",
        likes: 1000,
        __v: 0,
      },
      {
        _id: "64f20dfa1c84bb4cff2fad45",
        title: "new blog",
        author: "Jane Smith",
        url: "abcde",
        likes: 100,
        __v: 0,
      },
    ];
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(1110);
  });
});
