import {
	TOGGLE_CARD_SIZE,
	EXPAND_CARD_SIZE,
	COLLAPSE_CARD_SIZE,
} from "../actions/ActionTypes";
import { LATITUDE_DELTA, LONGITUDE_DELTA } from "../../constants";

const initialState = {
	region: {
		latitude: 40.104585872069094,
		longitude: -88.23382370182148,
		latitudeDelta: LATITUDE_DELTA,
		longitudeDelta: LONGITUDE_DELTA,
	},
};

export default function SettingsReducer(state = initialState, action) {
	switch (action.type) {
		default:
			return state;
	}
}
