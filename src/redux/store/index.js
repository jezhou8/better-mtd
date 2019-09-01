import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";

const store = createStore(
	rootReducer,
	applyMiddleware(thunk, promiseMiddleware)
);

export default store;
