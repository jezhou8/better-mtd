import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LIGHT_GRAY, YELLOW, GOLD, PURPLE } from "../constants";

class BusTag extends Component {
	setTagColor = busName => {
		console.log(busName);
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

	render() {
		let { busName, eta } = this.props.busInfo;
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
						backgroundColor: this.setTagColor(busName),
						width: "45%",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Text adjustsFontSizeToFit>{busName}</Text>
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
