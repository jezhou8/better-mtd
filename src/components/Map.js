import React, { Component, StyleSheet } from "react";
import MapView from "react-native-maps";

const Map = () => {
	return <MapView style={styles.map} showsUserLocation></MapView>;
};

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
