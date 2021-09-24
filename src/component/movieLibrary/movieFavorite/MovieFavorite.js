import './movieFavorite.css'
import { FaCheck } from 'react-icons/fa'

const MovieFavorite = ({ favorite, watched, setSelectedMovie }) => {

    return(
        <div className="MovieFavorite"
        onClick={() => setSelectedMovie(favorite)}>
           <fieldset className="MovieFavorite-container">
               <legend>{favorite.Title}</legend>

               <img alt="poster" src={ favorite.Poster} />

               {watched && <FaCheck className="MovieFavorite-watched" size={'70px'}/>}
           </fieldset>
        </div>
    ) 
}

export default MovieFavorite