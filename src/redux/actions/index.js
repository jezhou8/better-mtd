import {
	FETCH_LOCATION,
	CREATE_EVENT,
	FORM_DATA_CHANGED,
	CLEAR_FORM,
	TOGGLE_CARD_SIZE,
	HIDE_CARD,
	LOAD_CARD_DATA,
	RSVP_EVENT,
	FILTER_EVENT,
} from "./ActionTypes";
import * as Location from "expo-location";

function getLocationAsync() {
	return new Promise((resolve, reject) => {
		Location.getCurrentPositionAsync({}).then(location => {
			coords = {
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
			};
			return resolve(coords);
		});
	});
}

export function setDefaultLocation() {
	return {
		type: FETCH_LOCATION,
		payload: getLocationAsync(),
	};
}

export function toggleCardSize() {
	return {
		type: TOGGLE_CARD_SIZE,
	};
}
