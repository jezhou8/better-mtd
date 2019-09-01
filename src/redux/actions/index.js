import {
	FETCH_LOCATION,
	FETCH_STOPS,
	CREATE_EVENT,
	FORM_DATA_CHANGED,
	CLEAR_FORM,
	TOGGLE_CARD_SIZE,
	HIDE_CARD,
	LOAD_CARD_DATA,
	RSVP_EVENT,
	FILTER_EVENT,
	EXPAND_CARD_SIZE,
	COLLAPSE_CARD_SIZE,
} from "./ActionTypes";
import * as Location from "expo-location";
import { getStopsByLatLong, getStopTimesByStop } from "../../api/index";

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

export function findStopsNearLatLong(lat, long, count) {
	return {
		type: FETCH_STOPS,
		payload: getStopsByLatLong(lat, long, count),
	};
}

export function findStopTimesByStopId(stop_id) {
	return {
		type: FETCH_STOPS,
		payload: getStopTimesByStop(stop_id),
	};
}

export function toggleCardSize() {
	return {
		type: TOGGLE_CARD_SIZE,
	};
}

export function expandCardSize() {
	return {
		type: EXPAND_CARD_SIZE,
	};
}

export function collapseCardSize() {
	return {
		type: COLLAPSE_CARD_SIZE,
	};
}
