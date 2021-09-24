export const omdbFindByTitle = async (title) => {
    const respond = await fetch(`https://www.omdbapi.com/?s=${title}&apikey=83b9aeb1`)
    return respond.json()
  }

export const omdbFindById = async (imdbID) => {
    const respond = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=83b9aeb1`)
    return respond.json()
  }
