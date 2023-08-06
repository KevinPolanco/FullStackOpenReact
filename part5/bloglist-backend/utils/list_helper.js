const dummy = (blogs) => {
  return 1;
};

const totalLikes = (arrayBlogs) => {
  let totalLikes = arrayBlogs.reduce((sum, item) => {
    return sum + item.likes ; 
  },0);
  return totalLikes;
};

const favoriteBlog = (arrayBlogs) => {
  arrayBlogs.sort((a, b) => b.likes - a.likes);

  return arrayBlogs[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};

