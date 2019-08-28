import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import Map from "./src/components/Map";
import Card from "./src/components/Card";
import * as Location from "expo-location";
import { getStopsByLatLong } from "./src/api/index";

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
		let location = await Location.getCurrentPositionAsync({});

		let stops = await getStopsByLatLong(
			location.coords.latitude,
			location.coords.longitude,
			25
		);

		this.setState({
			...this.state,
			location: {
				...this.state.location,
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
			},
			busStops: this.parseStops(stops),
		});
	};

	componentDidMount() {
		this.findCoordinates();
	}

	parseStops(stops) {
		let formattedStops = [];
		for (let i = 0; i < stops.length; i++) {
			let currStop = stops[i];

			let avgStopLat = 0;
			let avgStopLong = 0;
			for (let j = 0; j < currStop.stop_points.length; j++) {
				let currStopPoint = currStop.stop_points[j];
				avgStopLat += currStopPoint.stop_lat;
				avgStopLong += currStopPoint.stop_lon;
			}

			avgStopLat /= currStop.stop_points.length;
			avgStopLong /= currStop.stop_points.length;

			let newStop = {
				id: currStop.stop_id,
				name: currStop.stop_name,
				location: {
					latitude: avgStopLat,
					longitude: avgStopLong,
				},
			};

			formattedStops.push(newStop);
		}
		return formattedStops;
	}

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
					<Card></Card>
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
		backgroundColor: "#fff",
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
