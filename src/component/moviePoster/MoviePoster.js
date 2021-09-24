import './moviePoster.css';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'

import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

const MoviePoster = ({ poster }) => {
    const [isFavorite, setIsFavorite] = useState(false)

    const [cookies, setCookies] = useCookies(['favorites'])

    //----------------------------------------------------------------
    //Components functions
    //----------------------------------------------------------------
    //Changes between liked and disliked movie
    const toggleFavorite = () => {
        if(isFavorite) 
            setCookies('favorites', cookies.favorites.filter(fav => poster.imdbID !== fav.imdbID), { path: '/'})
        else 
            if(cookies.favorites)
                setCookies('favorites', [...cookies.favorites, {imdbID: poster.imdbID, rate: 0, watched: false}], { path: '/'})
            else 
                setCookies('favorites', [{imdbID: poster.imdbID, rate: 0, watched: false}], { path: '/'})
        
        setIsFavorite(!isFavorite)
    }

    //----------------------------------------------------------------
    useEffect(() => {
        if(cookies.favorites) 
            cookies.favorites.map(fav => 
                poster.imdbID === fav.imdbID && setIsFavorite(true)) // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) 
    //----------------------------------------------------------------
    return(
        <div className="MoviePoster">
            <fieldset className="MoviePoster-container"> 
                <legend>{poster.Title}</legend>

                <img className="MoviePoster-img"
                alt="poster" 
                src={ poster.Poster} />

                <div className="MoviePoster-info">
                    <div>{`year: ${poster.Year}`}</div>

                    <div>{`type: ${poster.Type}`}</div>

                    <div>{`imdbID: ${poster.imdbID}`}</div>
                   
                    <div className="MoviePoster-favorite" 
                    onClick={() => toggleFavorite()}>
                        {isFavorite 
                            ?<AiFillHeart size={'100px'} color="red"/>
                            :<AiOutlineHeart size={'100px'}/>}
                            
                    </div>
                </div>
            </fieldset> 
        </div>
    )
}

export default MoviePoster