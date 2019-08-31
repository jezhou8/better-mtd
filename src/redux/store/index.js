import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import promiseMiddleware from "redux-promise-middleware";

const store = createStore(rootReducer, applyMiddleware(promiseMiddleware));

export default store;
