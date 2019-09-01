import { combineReducers } from "redux";
import busStops from "./StopsReducer";
import map from "./MapReducer";
import settings from "./SettingsReducer";

const rootReducer = combineReducers({
	busStops,
	settings,
	map,
});

export default rootReducer;
