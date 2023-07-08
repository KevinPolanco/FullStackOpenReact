const listHelper = require("../utils/list_helper");

describe("blog", () => {
  test("dummy returns one", () => {
    const blogs = [];
  
    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });

  test("dummy returns three", () => {
    const blogs = [2];
  
    const result = listHelper.dummy(blogs);
    expect(result).toBe(3);
  });
});