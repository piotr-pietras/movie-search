import loadingReducer from './loadingReducer'

import { combineReducers } from 'redux'

const reducers = combineReducers({
    loading: loadingReducer,
})

export default reducers