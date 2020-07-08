import {applyMiddleware, combineReducers, createStore} from "redux";
import reducer from "./reducer";
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";

const rootReducer = combineReducers({reducer: reducer})


type RootReducerType = typeof rootReducer// ()=> AppStateType
export type AppStateType = ReturnType<RootReducerType>


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
export default store;