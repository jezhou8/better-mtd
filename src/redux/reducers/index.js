import { combineReducers } from "redux";
import stops from "./StopsReducer";
import map from "./MapReducer";
import settings from "./SettingsReducer";

const rootReducer = combineReducers({
	stops,
	settings,
});

export default rootReducer;
