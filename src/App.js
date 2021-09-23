import './App.css';
import MoviePoster from './component/moviePoster/MoviePoster';
import MovieLibrary from './component/movieLibrary/MovieLibrary';

import {IoLibrary} from 'react-icons/io5'
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

import { loading } from './state/action-creators/loadingAction'
import { useDispatch} from 'react-redux';

import { Link, Route } from 'react-router-dom';

function App() {
  const [title, setTitle] = useState('')
  const [searchResult, setSearchResult] = useState([])

  const [cookies, setCookies, removeCookies] = useCookies(['favorites']);

  const dispatch = useDispatch()

  //----------------------------------------------------------------
  //Components functions
  //----------------------------------------------------------------
  const findMovie = (title) => {
    dispatch(loading(true))

    //Ask to find movies by title
    askToFindMovies(title)
      .then((respond) => {
        console.log(respond.Search) //dev log

        //If any movie is found asks server for their extra info by id
        if(respond.Response === "True"){
          const buffer = []
          respond.Search.map((movie, index) => {
            askToExtendeMovieInfo(movie.imdbID)
              .then((info) => {
                buffer[index] = info

                //If every movie was asked for extra info updates site
                if(buffer.length >= respond.Search.length)
                  setSearchResult(buffer)    
              })
              .catch((err) => alert(err))
          })
          setTimeout(() => dispatch(loading(false)), 500)
        } else {
          setSearchResult([])
          alert(`${respond.Error} :<`)
          setTimeout(() => dispatch(loading(false)), 500)
        }
      })
      .catch((err) => {
        alert(err)
      })
  }

  //----------------------------------------------------------------
  //Server's requests
  //----------------------------------------------------------------
  const askToFindMovies = async (title) => {
    const respond = await fetch(`http://www.omdbapi.com/?s=${title}&apikey=83b9aeb1`)
    return respond.json()
  }

  const askToExtendeMovieInfo = async (imdbID) => {
    const respond = await fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=83b9aeb1`)
    return respond.json()
  }


  //----------------------------------------------------------------
  return (
    <div className="App">
      <div className="App-header"></div>

      <Link to='/library/'> 
        <IoLibrary className="App-library"
        size={'60px'}/>
      </Link>

      <div className="App-search">
        <input type="text"
        placeholder="Enter movie's title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value)
        }}
        />

        <button
        onClick={() => findMovie(title)}>
          search
        </button>

        <button
        onClick={() => console.log(cookies.favorites)}>
          chck(DEV)
        </button>

        <button
        onClick={() => setCookies('favorites', undefined, { path: '/'})
        //removeCookies()
        }>
          clr(DEV)
        </button>
      </div>

      <div className="App-posters">
        {searchResult.map((poster) => 
          <MoviePoster 
          key={poster.imdbID}
          poster={poster}/>
        )}
      </div>


      <Route path="/library/">
        <MovieLibrary />
      </Route>
    </div>
  );
}

export default App;
