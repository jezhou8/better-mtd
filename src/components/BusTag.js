import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LIGHT_GRAY, YELLOW, GOLD, PURPLE } from "../constants";

class BusTag extends Component {
	setTagColor = busName => {
		if (busName.includes("100")) {
			return YELLOW;
		}
		if (busName.includes("10")) {
			return GOLD;
		}
		if (busName.includes("1")) {
			return YELLOW;
		}
		if (busName.includes("22")) {
			return PURPLE;
		}
		return "#fff";
	};

	setBusNumber = (routeId, direction) => {
		routeId = routeId.toLowerCase();
		let number = 0;
		direction = direction.charAt(0);
		if (routeId.includes("brown")) {
			number = 9;
		} else if (routeId.includes("gold")) {
			number = 10;
		} else if (routeId.includes("yellow")) {
			number = 1;
		} else if (routeId.includes("illini")) {
			number = 22;
		} else if (routeId.includes("green")) {
			number = 5;
		} else if (routeId.includes("silver")) {
			number = 13;
		} else {
			number = 69;
		}
		return "" + number + direction;
	};

	render() {
		let { trip } = this.props.busInfo;
		let busNumber = this.setBusNumber(trip.route_id, trip.direction);
		return (
			<View
				style={{
					width: "95%",
					height: "90%",
					borderRadius: 5,
					borderColor: "#ccc",
					borderWidth: 1,
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<View
					style={{
						borderTopLeftRadius: 5,
						borderBottomLeftRadius: 5,
						backgroundColor: this.setTagColor(busNumber),
						width: "45%",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Text adjustsFontSizeToFit>{busNumber}</Text>
				</View>
				<View
					style={{
						borderTopRightRadius: 5,
						borderBottomRightRadius: 5,
						backgroundColor: "#fff",
						width: "55%",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Text adjustsFontSizeToFit>20min</Text>
				</View>
			</View>
		);
	}
}

export default BusTag;
