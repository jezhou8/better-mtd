import React, { Component } from "react";
import { StyleSheet, Alert } from "react-native";
import MapView from "react-native-maps";
import { stopAsync } from "expo/build/AR";

class Map extends React.Component {
	constructor(props) {
		super(props);
	}

	//WARNING! To be deprecated in React v17. Use componentDidUpdate instead.
	componentWillUpdate(nextProps, nextState) {
		console.log(nextProps.busStops);
	}

	render() {
		let { region, busStops } = this.props;
		return (
			<MapView region={region} style={styles.map} showsUserLocation>
				{busStops &&
					busStops.map(stop => {
						console.log("stop: ", stop);
						return (
							<MapView.Marker
								key={stop.id}
								coordinate={stop.location}
								title={stop.name}
							/>
						);
					})}
			</MapView>
		);
	}
}

const styles = StyleSheet.create({
	map: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
});

export default Map;
