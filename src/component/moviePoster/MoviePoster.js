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
        if(isFavorite) 
            setCookies('favorites', JSON.stringify(cookies.favorites.filter(fav => poster.imdbID !== fav.imdbID)), { path: '/'})
        else 
            if(cookies.favorites)
                setCookies('favorites', JSON.stringify([...cookies.favorites, {imdbID: poster.imdbID}]), { path: '/'})
            else 
                setCookies('favorites', JSON.stringify([{imdbID: poster.imdbID}]), { path: '/'})
        
        setIsFavorite(!isFavorite)
    }

    useEffect(() => {
        if(cookies.favorites) 
            cookies.favorites.map(fav => poster.imdbID === fav.imdbID && setIsFavorite(true)) // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) 

    //----------------------------------------------------------------
    return(
        <div className="MoviePoster">
            <fieldset className="MoviePoster-container"> 
                <legend>{poster.Title}</legend>

                <div className="MoviePoster-img">
                    <img alt="poster" src={ poster.Poster} />
                </div>

                <div className="MoviePoster-info">
                    <div>{`year: ${poster.Year}`}</div>

                    <div>{`type: ${poster.Type}`}</div>

                    <div>{`imdbID: ${poster.imdbID}`}</div>
                   
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