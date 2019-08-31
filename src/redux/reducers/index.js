import { combineReducers } from "redux";
import stops from "./StopsReducer";

const rootReducer = combineReducers({
	stops,
});

export default rootReducer;
