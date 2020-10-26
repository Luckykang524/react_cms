import {combineReducers, createStore,applyMiddleware,compose} from 'redux'
import ListReducer from './reducers/ListReducer'
import CollapsedReducer from './reducers/CollapsedReducer'
//引入redux-promise中间件
import reduxPromise from 'redux-promise'
//引入redux-chunk中间件
import reduxThunk from 'redux-thunk'
//使用combineReducers将多个reducer(listReducer和collapsedReducer)合并
const reducer = combineReducers({
    ListReducer : ListReducer,
    CollapsedReducer : CollapsedReducer
})

//配置redux-devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//applyMiddleware(reduxPromise)应用reduxPromise这个中间件
const store = createStore(reducer,composeEnhancers(applyMiddleware(reduxPromise,reduxThunk)))
export default store