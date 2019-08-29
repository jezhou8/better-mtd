import { CONFIG } from "../api/config";

export async function getStopsByLatLong(lat, long, count = 5) {
	const method = "getStopsByLatLon";
	const url = `https://developer.cumtd.com/api/${CONFIG.VERSION}/${CONFIG.FORMAT}/${method}?key=${CONFIG.API_KEY}`;
	let response = await fetch(
		url + `&lat=${lat}` + `&lon=${long}` + `&count=${count}`
	);
	let data = await response.json();
	return data.stops;
}

export async function getStopTimesByStop(stopId) {
	const method = "getStopTimesByStop";
	const url = `https://developer.cumtd.com/api/${CONFIG.VERSION}/${CONFIG.FORMAT}/${method}?key=${CONFIG.API_KEY}`;
	let response = await fetch(url + `&stop_id=${stopId}`);
	let data = await response.json();
	return data.stop_times;
}
