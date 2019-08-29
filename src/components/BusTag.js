import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class BusTag extends Component {
	render() {
		return (
			<View
				style={{
					width: 100,
					height: 50,
					backgroundColor: "#ff0",
				}}
			>
				<Text>{this.props.busId}</Text>
				<Text>{this.props.eta}min</Text>
			</View>
		);
	}
}

export default BusTag;
