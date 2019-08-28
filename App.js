import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import Map from "./src/components/Map";
export default function App() {
	return (
		<View style={styles.container}>
			<Map></Map>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
