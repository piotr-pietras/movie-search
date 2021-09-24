import './movieLibrary.css';
import MovieFavorite from './movieFavorite/MovieFavorite';
import StarVoter from './starVoter/StarVoter';
import { IoChevronBack } from 'react-icons/io5'
import { FaCheck, FaTrash } from 'react-icons/fa'

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { loading } from '../../state/action-creators/loadingAction'
import { useCookies } from 'react-cookie';

import { Link } from 'react-router-dom'

import { omdbFindById } from '../../req/omdbReq';

const MovieLibrary = ({ backRefresh }) => {
    const [selectedMovie, setSelectedMovie] = useState()
    const [favorites, setFavorites] = useState()
    const [cookies, setCookies] = useCookies(['favorites'])

    const dispatch = useDispatch()
    //----------------------------------------------------------------
    //Components functions
    //----------------------------------------------------------------
    //Asks server to find movies
    const findMovies = () => {
        dispatch(loading(true))

        const buffer = []
        //Maps for every favorite saved in cookies
        cookies.favorites && cookies.favorites.forEach(fav => { 
            //Requests by id 
            omdbFindById(fav.imdbID)
                .then((result) => {
                    //Pushs result to buffer
                    buffer.push(result)
                    //If every movie's info was downloaded updates site
                    if(buffer.length >= cookies.favorites.length)
                        setFavorites(buffer)
                        //Sets selected one of firsts favorite movie
                        if(buffer.length > 0)
                            setSelectedMovie(buffer[0])
                })
                .catch(err => console.log(err.message))
        })
        
        setTimeout(() => dispatch(loading(false)), 500)
    }

    //Removes favorite from cookies and state
    const removeFavorite = (imdbID) => {
        //Changes favorites cookie
        setCookies(
            'favorites', 
            cookies.favorites.filter((fav) => fav.imdbID !== imdbID), 
            { path: '/' }
        )
        //Changes favorites state 
        setFavorites(favorites.filter((fav) => fav.imdbID !== imdbID))
        //After that selects next movie
        favorites[1] ? setSelectedMovie(favorites[1]) : setSelectedMovie()
    }

    //Change whether movie was watched or not
    const toggleWatched = () => {
        cookies.favorites.forEach((fav, index) => { 
            if(fav.imdbID === selectedMovie.imdbID) {
                const buffer = cookies.favorites
                //Toggles buffer element's watched property 
                buffer[index] = {
                    imdbID: fav.imdbID,
                    rate: buffer[index].rate,
                    watched: !buffer[index].watched
                }
                //Updates site
                setCookies('favorites', buffer, {path: '/'})
            }
        })
    }

    //----------------------------------------------------------------
    useEffect(() => {
        findMovies() // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    //----------------------------------------------------------------
    return(
        <div className="MovieLibrary">
            
                <Link to={'/'}
                onClick={() => backRefresh()}> 
                    <IoChevronBack className="MovieLibrary-back"
                    size={'60px'}/>
                </Link>

                <div className="MovieLibrary-header"/>

                {selectedMovie && <div className="MovieLibrary-body">
                    <div className="MovieLibrary-body-top">
                        <img className="MovieLibrary-img" 
                        alt="poster" 
                        src={selectedMovie.Poster} />

                        <div className="MovieLibrary-controlers">
                            <FaCheck className="MovieLibrary-watched"
                            size={'10vh'}
                            onClick={() => toggleWatched()}
                            style={{
                                color: cookies.favorites.find(fav => fav.imdbID === selectedMovie.imdbID)?.watched 
                                    ? 'green' 
                                    : 'white'
                                }}/>

                            <FaTrash className="MovieLibrary-delete"
                            size={'10vh'}
                            onClick={() => removeFavorite(selectedMovie.imdbID)}/>
                        </div>
                    </div>

                    <StarVoter 
                    imdbID={selectedMovie.imdbID} 
                    rate={cookies.favorites.find(fav => fav.imdbID === selectedMovie.imdbID)?.rate}/>
                </div>}

                {selectedMovie && <div className="MovieLibrary-info">
                    <p>{`Score: ${selectedMovie.Ratings[0] && selectedMovie.Ratings[0].Value} / 100`}</p>
                    <p>{`Year: ${selectedMovie.Year}`}</p>
                    <p>{`Genre: ${selectedMovie.Genre}`}</p>
                    <p>{`Runtime: ${selectedMovie.Runtime}`}</p>
                    <p>{`Writer: ${selectedMovie.Writer}`}</p>
                    <p>{`Actors: ${selectedMovie.Actors}`}</p>
                    <p>{`Plot: ${selectedMovie.Plot}`}</p>
                </div>}

                {favorites && <div className="MovieLibrary-container">
                    {favorites.map(fav => 
                        <MovieFavorite key={fav.imdbID} 
                        favorite={fav}
                        watched={cookies.favorites.find(favCookie => favCookie.imdbID === fav.imdbID).watched}
                        setSelectedMovie={setSelectedMovie}/>
                        )}
                </div>}
         
        </div>
    )
}

export default MovieLibrary;