const dummy = (blogs) => {
  return 1;
};

const totalLikes = (listBlogs) => {
  let totalLikes = listBlogs.reduce((sum, item) => {
    return sum + item.likes ; 
  },0);
  return totalLikes;
};

module.exports = {
  dummy,
  totalLikes
};

