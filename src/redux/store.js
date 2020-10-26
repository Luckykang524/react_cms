import {combineReducers, createStore} from 'redux'
import ListReducer from './ListReducer'
import CollapsedReducer from './CollapsedReducer'

//使用combineReducers将多个reducer(listReducer和collapsedReducer)合并
const reducer = combineReducers({
    ListReducer : ListReducer,
    CollapsedReducer : CollapsedReducer
})
const store = createStore(reducer)
export default store