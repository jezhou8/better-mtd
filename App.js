import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import Map from "./src/containers/mapCTS";
import Card from "./src/containers/cardCTS";

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

// redux imports
import { Provider } from "react-redux";
import store from "./src/redux/store";

import { getStopsByLatLong, getStopTimesByStop } from "./src/api/index";
import {
	NAVBAR_HEIGHT,
	LATITUDE_DELTA,
	LONGITUDE_DELTA,
} from "./src/constants";

class App extends React.Component {
	state = {
		location: {
			latitude: 37.78825,
			longitude: -122.4324,
			latitudeDelta: LATITUDE_DELTA,
			longitudeDelta: LONGITUDE_DELTA,
		},
		busStops: null,
	};

	findCoordinates = async () => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== "granted") {
			this.setState({
				errorMessage: "Permission to access location was denied",
			});
		}

		let location = await Location.getCurrentPositionAsync({});

		this.setState({
			...this.state,
			location: {
				...this.state.location,
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
			},
		});

		this.calcualteStops();
	};

	calcualteStops = async () => {
		let stops = await getStopsByLatLong(
			this.state.location.latitude,
			this.state.location.longitude,
			2
		);

		let formattedStops = await this.parseStops(stops);

		this.setState({
			...this.state,
			busStops: formattedStops,
		});
	};
	componentDidMount() {
		this.findCoordinates();
	}

	parseStops = async stops => {
		let formattedStops = [];
		for (let i = 0; i < stops.length; i++) {
			let currStop = stops[i];

			// calculate location of bus stop
			let avgStopLat = 0;
			let avgStopLong = 0;
			for (let j = 0; j < currStop.stop_points.length; j++) {
				let currStopPoint = currStop.stop_points[j];
				avgStopLat += currStopPoint.stop_lat;
				avgStopLong += currStopPoint.stop_lon;
			}

			avgStopLat /= currStop.stop_points.length;
			avgStopLong /= currStop.stop_points.length;

			// calculate incoming bus etas for stop
			let stopId = currStop.stop_id;
			let stopTimes = await getStopTimesByStop(stopId);

			let fStopTimes = [];

			for (let k = 0; k < stopTimes.length; k++) {
				let stopTime = stopTimes[k];
				fStopTimes.push({
					busId: stopTime.trip.shape_id,
					arrivalTime: stopTime.arrival_time,
				});
			}

			// create and add stop to list
			let newStop = {
				id: stopId,
				name: currStop.stop_name,
				location: {
					latitude: avgStopLat,
					longitude: avgStopLong,
				},
				busTimes: fStopTimes,
			};
			formattedStops.push(newStop);
		}
		return formattedStops;
	};

	render() {
		return (
			<Provider store={store}>
				<View style={styles.container}>
					<Map
						region={this.state.location}
						busStops={this.state.busStops}
					></Map>

					<Card></Card>

					<View style={styles.navbarContainer}></View>
				</View>
			</Provider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f0f",
		// justifyContent: "center",
	},
	contentContainer: {
		width: "100%",
	},
	cardContainer: {
		width: "100%",
		height: "50%",
		backgroundColor: "#f00",
	},
	navbarContainer: {
		position: "absolute",
		width: "100%",
		height: NAVBAR_HEIGHT,
		bottom: 0,
		backgroundColor: "#00f",
	},
});

export default App;
