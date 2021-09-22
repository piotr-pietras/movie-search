import loadingReducer from './loadingReducer'
import favoriteMoviesReducer from './favoriteMoviesReducer'
import { combineReducers } from 'redux'

const reducers = combineReducers({
    loading: loadingReducer,
    favoriteMovies: favoriteMoviesReducer
})

export default reducers