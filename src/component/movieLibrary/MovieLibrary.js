import './movieLibrary.css';
import MovieFavorite from './movieFavorite/MovieFavorite';
import MovieCard from './movieCard/MovieCard';

import { IoChevronBack } from 'react-icons/io5'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { loading } from '../../state/action-creators/loadingAction'
import { useCookies } from 'react-cookie';

import { Link } from 'react-router-dom'

import { omdbFindById } from '../../req/omdbReq';

const MovieLibrary = () => {
    const [selectedMovie, setSelectedMovie] = useState({})
    const [favorites, setFavorites] = useState([])
    const [cookies] = useCookies(['favorites'])

    const dispatch = useDispatch()
    //----------------------------------------------------------------
    //Components functions
    //----------------------------------------------------------------
    const findMovies = () => {
        dispatch(loading(true))

        const buffer = []
        //Map for every favorite saved in cookies
        cookies.favorites.map((fav, index) => { 
            //Request by id 
            omdbFindById(fav.imdbID)
                .then((result) => {
                    //Push result to buffer
                    buffer.push(result)
                    //If every movie's info was downloaded updates site
                    if(buffer.length >= cookies.favorites.length)
                        setFavorites(buffer)
                })
                .catch(err => alert(err))
        })
        
        setTimeout(() => dispatch(loading(false)), 500)
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

                <div className="MovieLibrary-header">
                    <h2>{selectedMovie && selectedMovie.Title}</h2>
                </div>

                <div className="MovieLibrary-selected">
                    <MovieCard selectedMovie={selectedMovie} />
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