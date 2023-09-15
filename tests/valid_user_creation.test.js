const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

test("invalid user is not created and returns error message", async () => {
  const newUser = {
    username: "us",
    password: "pa",
    name: "Invalid User",
  };

  const response = await api.post("/api/users").send(newUser);

  expect(response.status).toBe(400);
  expect(response.body.error).toContain(
    "Username and password must be at least 3 characters long"
  );
});
