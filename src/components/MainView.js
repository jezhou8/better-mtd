import React, { Component } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import Map from "../containers/mapCTS";
import Card from "../containers/cardCTS";

import { NAVBAR_HEIGHT, LATITUDE_DELTA, LONGITUDE_DELTA } from "../constants";

class MainView extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		let lat = 40.104585872069094;
		let long = -88.23382370182148;
		this.props.findStopsNearLatLong(lat, long, 1);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.busStops != this.props.busStops) {
			this.props.busStops.map(busStop => {
				this.props.findStopTimesByStopId(busStop.stop_id);
			});
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Map
				//region={this.state.location}
				></Map>

				<Card></Card>

				<View style={styles.navbarContainer}></View>
			</View>
		);
	}
}

export default MainView;

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
