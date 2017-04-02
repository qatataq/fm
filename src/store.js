import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import player from './reducers/playerReducer'
import tracks from './reducers/tracksReducer'

const middleware = [thunk]

if (process.env.NODE_ENV === 'development') {
  middleware.push(createLogger())
}

export default createStore(
  combineReducers({
    player,
    tracks,
  }),
  {},
  applyMiddleware(...middleware)
)
