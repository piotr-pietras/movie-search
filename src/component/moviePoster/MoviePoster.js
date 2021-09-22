import './moviePoster.css';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

const MoviePoster = ({ poster }) => {
    const [isFavorite, setIsFavorite] = useState(false)

    const [cookies, setCookies] = useCookies(['favorites'])

    //----------------------------------------------------------------
    //Components functions
    //----------------------------------------------------------------
    const toggleFavorite = () => {
        if(isFavorite) setCookies('favorites', cookies.favorites.filter(fav => poster.imdbID !== fav.imdbID), { path: '/'})
        else setCookies('favorites', [...cookies.favorites, poster], { path: '/'})

        setIsFavorite(!isFavorite)
    }

    useEffect(() => {
        cookies.favorites.map(fav => poster.imdbID === fav.imdbID && setIsFavorite(true))
    })
    //----------------------------------------------------------------
    return(
        <div className="MoviePoster">
            <fieldset className="MoviePoster-container"> 
                <legend>{poster.Title}</legend>

                <div className="MoviePoster-img">
                    <img alt="poster" src={ poster.Poster} />
                </div>

                <div className="MoviePoster-info">
                    <div>{`type: ${poster.Type}`}</div>
                    
                    <div>{`year: ${poster.Year}`}</div>
                   
                    <div className="MoviePoster-favorite" 
                    onClick={() => toggleFavorite()}>
                        {isFavorite 
                            ?<AiFillStar size={'100px'} color="yellow"/>
                            :<AiOutlineStar size={'100px'}/>}
                            
                    </div>
                </div>
            </fieldset> 
        </div>
    )
}

export default MoviePoster