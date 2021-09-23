import './movieFavorite.css'

const MovieFavorite = ({ favorite, setSelectedMovie }) => {

    return(
        <div className="MovieFavorite"
        onClick={() => {
            setSelectedMovie(favorite)
            console.log(favorite)
            }}>
           <fieldset className="MovieFavorite-container">
               <legend>{favorite.Title}</legend>
               <img alt="poster" src={ favorite.Poster} />
           </fieldset>
        </div>
    ) 
}

export default MovieFavorite