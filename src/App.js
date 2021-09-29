import './App.css';
import './variables.css'
import MoviePoster from './component/moviePoster/MoviePoster';
import MovieLibrary from './component/movieLibrary/MovieLibrary';
import {IoLibrary} from 'react-icons/io5'

import { useState, } from 'react';
import { loading } from './state/action-creators/loadingAction'
import { useDispatch } from 'react-redux';

import { Link, Route } from 'react-router-dom';

import { omdbFindByTitle } from './req/omdbReq'

function App() {
  const [title, setTitle] = useState('')
  const [searchResult, setSearchResult] = useState([])

  const dispatch = useDispatch()

  //----------------------------------------------------------------
  //Components functions
  //----------------------------------------------------------------
  //Asks server to find movies by given title and updates state
  const findMovies = () => {
    dispatch(loading(true))
    setSearchResult([])

    omdbFindByTitle(title)
      .then((respond) => {
        setSearchResult(respond.Search)
        setTimeout(() => dispatch(loading(false)), 500)
      })
      .catch((err) => {
        console.log(err.message)
        setTimeout(() => dispatch(loading(false)), 500)
      })
  }

  //----------------------------------------------------------------
  return (
    <div className="App">
      <div className="App-header"></div>

      <Link to='/library/'> 
        <IoLibrary className="App-library" size={'60px'}/>
      </Link>

      <div className="App-search"
      onKeyPress={(e) => e.code === "Enter" && findMovies()}>
        <input type="text"
        placeholder="Enter movie's title"
        value={title}
        onChange={e => setTitle(e.target.value)}/>

        <button 
        onClick={() => findMovies()}>
          search
        </button>
      </div>

      {searchResult && <div className="App-posters">
        {searchResult.map((poster) => <MoviePoster key={poster.imdbID} poster={poster}/>)}
      </div>}


      <Route path="/library/">
        <MovieLibrary backRefresh={findMovies}/>
      </Route>
    </div>
  );
}

export default App;
