import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class BusTag extends Component {
	convertToETA = (currentTime, arrivalTime) => {
		console.log("converting to eta...");
		var fArrivalTime = new Date("1970-01-01T" + arrivalTime + "Z");
		var minutesTill = fArrivalTime.getMinutes();

		return "" + (minutesTill - currentTime.getMinutes()) + "min";
	};

	render() {
		return (
			<View
				style={{
					width: 100,
					height: 10,
					backgroundColor: "#ff0",
				}}
			>
				<Text>props.routeTag</Text>
				<Text>
					this.convertToETA(props.currentTime, props.arrivalTime)
				</Text>
			</View>
		);
	}
}

export default BusTag;
