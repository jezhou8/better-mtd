import { CONFIG } from "../api/config";

// export async function getStopsByLatLong(lat, long, count = 5) {
// 	const method = "getStopsByLatLon";
// 	const url = `https://developer.cumtd.com/api/${CONFIG.VERSION}/${CONFIG.FORMAT}/${method}?key=${CONFIG.API_KEY}`;
// 	let response = await fetch(
// 		url + `&lat=${lat}` + `&lon=${long}` + `&count=${count}`
// 	);
// 	let data = await response.json();
// 	return data.stops;
// }
export function getStopsByLatLong(lat, long, count = 10) {
	const method = "getStopsByLatLon";
	const url = `https://developer.cumtd.com/api/${CONFIG.VERSION}/${CONFIG.FORMAT}/${method}?key=${CONFIG.API_KEY}`;

	return new Promise((resolve, reject) => {
		fetch(url + `&lat=${lat}` + `&lon=${long}` + `&count=${count}`)
			.then(response => response.json())
			.then(responseJson => {
				console.log("stops found");
				return resolve(responseJson.stops);
			});
	});
}

export function getStopTimesByStop(stopId) {
	const method = "getStopTimesByStop";
	const url = `https://developer.cumtd.com/api/${CONFIG.VERSION}/${CONFIG.FORMAT}/${method}?key=${CONFIG.API_KEY}`;

	return new Promise((resolve, reject) => {
		fetch(url + `&stop_id=${stopId}`)
			.then(response => response.json())
			.then(responseJson => {
				console.log("busTimes found: ", responseJson.stop_times);
				return resolve(responseJson.stop_times);
			});
	});
}
