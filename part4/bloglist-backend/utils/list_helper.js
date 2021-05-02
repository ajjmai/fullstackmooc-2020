/* eslint-disable no-unused-vars */
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likesReducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(likesReducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length < 1) return {}

  const favoriteReducer = (currentFavorite, nextItem) => {
    return currentFavorite.likes < nextItem.likes ? nextItem : currentFavorite
  }

  const favorite = blogs.reduce(favoriteReducer, blogs[0])
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
