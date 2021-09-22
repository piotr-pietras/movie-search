import './App.css';
import MoviePoster from './component/moviePoster/MoviePoster';

import {IoLibrary} from 'react-icons/io5'
import { useState } from 'react';
import { useCookies } from 'react-cookie';

import { loading } from './state/action-creators/loadingAction'
import { useDispatch} from 'react-redux';

function App() {
  const [title, setTitle] = useState('')
  const [searchResult, setSearchResult] = useState([])

  const [cookies, setCookies] = useCookies(['favorites']);

  const dispatch = useDispatch()

  //----------------------------------------------------------------
  //Components functions
  //----------------------------------------------------------------
  const findMovie = (title) => {
    dispatch(loading(true))

    askToFindMovie(title)
      .then((respond) => {
        console.log(respond.Search) //dev log

        if(respond.Response === "True"){
          setSearchResult(respond.Search)
          setTimeout(() => dispatch(loading(false)), 500)
        }else {
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
  const askToFindMovie = async (title) => {
    const respond = await fetch(`http://www.omdbapi.com/?s=${title}&apikey=83b9aeb1`)
    return respond.json()
  }
  
  return (
    <div className="App">


      <div className="App-header"></div>

      <IoLibrary className="App-library"
      size={'60px'}
      onClick={() => console.log("test")}/>


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
        onClick={() => setCookies('favorites', [], { path: '/'})}>
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
    </div>
  );
}

export default App;
