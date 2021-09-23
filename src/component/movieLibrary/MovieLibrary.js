import './movieLibrary.css';
import MovieFavorite from './movieFavorite/MovieFavorite';

import { IoChevronBack } from 'react-icons/io5'
import { FaCheck, FaTrash } from 'react-icons/fa'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { loading } from '../../state/action-creators/loadingAction'
import { useCookies } from 'react-cookie';

import { Link } from 'react-router-dom'

import { omdbFindById } from '../../req/omdbReq';

const MovieLibrary = () => {
    const [selectedMovie, setSelectedMovie] = useState({})
    const [favorites, setFavorites] = useState([])
    const [cookies, setCookies] = useCookies(['favorites'])

    const dispatch = useDispatch()
    //----------------------------------------------------------------
    //Components functions
    //----------------------------------------------------------------
    const findMovies = () => {
        dispatch(loading(true))

        const buffer = []
        //Map for every favorite saved in cookies
        cookies.favorites && cookies.favorites.map((fav, index) => { 
            //Request by id 
            omdbFindById(fav.imdbID)
                .then((result) => {
                    //Push result to buffer
                    buffer.push(result)
                    //If every movie's info was downloaded updates site
                    if(buffer.length >= cookies.favorites.length)
                        setFavorites(buffer)
                        if(buffer.length > 0)
                            setSelectedMovie(buffer[0])
                })
                .catch(err => alert(err))
        })
        
        setTimeout(() => dispatch(loading(false)), 500)
    }

    const removeFavorite = (imdbID) => {
        setCookies(
            'favorites', 
            cookies.favorites.filter((fav) => fav.imdbID !== imdbID), 
            { path: '/' }
        )
        setFavorites(
            favorites.filter((fav) => fav.imdbID !== imdbID)
        )
        favorites[1]
            ? setSelectedMovie(favorites[1])
            : setSelectedMovie({})
    }

    useEffect(() => {
        findMovies()
    }, [])
    //----------------------------------------------------------------
    return(
        <div className="MovieLibrary">
            
                <Link to={'/'}> 
                    <IoChevronBack className="MovieLibrary-back"
                    size={'60px'}/>
                </Link>

                <div className="MovieLibrary-header"/>

                <div className="MovieLibrary-body">
                    <img className="MovieLibrary-img" 
                    alt="poster" 
                    src={selectedMovie.Poster} />

                    <div className="MovieLibrary-controlers">
                        <FaCheck className="MovieLibrary-watched"
                        size={'10vh'}/>
                        <FaTrash className="MovieLibrary-delete"
                        size={'10vh'}
                        onClick={() => removeFavorite(selectedMovie.imdbID)}/>
                    </div>
                </div>

                <div className="MovieLibrary-info">
                    <p>{`Score: ${ selectedMovie.Ratings && selectedMovie.Ratings[0].Value} / 100`}</p>
                    <p>{`Year: ${ selectedMovie && selectedMovie.Year}`}</p>
                    <p>{`Genre: ${ selectedMovie && selectedMovie.Genre}`}</p>
                    <p>{`Runtime: ${ selectedMovie && selectedMovie.Runtime}`}</p>
                    <p>{`Writer: ${ selectedMovie && selectedMovie.Writer}`}</p>
                    <p>{`Actors: ${ selectedMovie && selectedMovie.Actors}`}</p>
                    <p>{`Plot: ${ selectedMovie && selectedMovie.Plot}`}</p>
                </div>

                <div className="MovieLibrary-container">
                    {favorites && favorites.map(fav => 
                        <MovieFavorite
                        key={fav.imdbID} 
                        favorite={fav}
                        setSelectedMovie={setSelectedMovie}
                        />)}
                </div>

            
        </div>
    )
}

export default MovieLibrary;