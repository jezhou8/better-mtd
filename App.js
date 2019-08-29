import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import Map from "./src/components/Map";
import Card from "./src/components/Card";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import { getStopsByLatLong, getStopTimesByStop } from "./src/api/index";

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

			//console.log("first: ", stopTimes[0]);
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
			<View style={styles.container}>
				<View style={styles.mapContainer}>
					<Map
						region={this.state.location}
						busStops={this.state.busStops}
					></Map>
				</View>

				<View style={styles.cardContainer}>
					<Card busStops={this.state.busStops}></Card>
				</View>

				<View style={styles.navbarContainer}></View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f00",
		alignItems: "center",
		// justifyContent: "center",
	},
	mapContainer: {
		width: "100%",
		height: "40%",
		backgroundColor: "#0f0",
	},
	cardContainer: {
		width: "100%",
		height: "50%",
		backgroundColor: "#f00",
	},
	navbarContainer: {
		position: "absolute",
		width: "100%",
		height: "10%",
		bottom: 0,
		backgroundColor: "#00f",
	},
});

const LATITUDE_DELTA = 0.002;
const LONGITUDE_DELTA = 0.0018;
export default App;
