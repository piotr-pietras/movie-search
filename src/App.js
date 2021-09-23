import './App.css';
import MoviePoster from './component/moviePoster/MoviePoster';
import MovieLibrary from './component/movieLibrary/MovieLibrary';

import {IoLibrary} from 'react-icons/io5'
import { useState, } from 'react';
import { useCookies } from 'react-cookie';

import { loading } from './state/action-creators/loadingAction'
import { useDispatch } from 'react-redux';

import { Link, Route } from 'react-router-dom';

import { omdbFindByTitle } from './req/omdbReq'

function App() {
  const [title, setTitle] = useState('')
  const [searchResult, setSearchResult] = useState([])

  const [cookies, setCookies] = useCookies(['favorites']);

  const dispatch = useDispatch()

  //----------------------------------------------------------------
  //Components functions
  //----------------------------------------------------------------
  const findMovies = (title) => {
    dispatch(loading(true))

    omdbFindByTitle(title)
      .then((respond) => {
        //console.log(respond.Search) //dev log
        setSearchResult(respond.Search)
        setTimeout(() => dispatch(loading(false)), 500)
      })
      .catch((err) => {
        alert(err)
        setTimeout(() => dispatch(loading(false)), 500)
      })
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
        onClick={() => findMovies(title)}>
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
