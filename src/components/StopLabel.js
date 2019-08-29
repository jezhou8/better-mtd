import React, { Component } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import BusTag from "./BusTag";

class StopLabel extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	convertToETA = (currentTime, arrivalTime) => {
		console.log("hello!");
		let fArrivalTime = new Date("1970-01-01T" + arrivalTime + "Z");
		let minutesTill = fArrivalTime.getMinutes();
		let hoursTill = fArrivalTime.getHours();

		let currMinutes = currentTime.getMinutes();

		if (hoursTill == currentTime.getHours()) {
			return minutesTill - currMinutes;
		}

		return minutesTill + (60 - currMinutes);
	};

	render() {
		let { busStop, currentTime } = this.props;
		return (
			<View style={styles.labelContainer}>
				{busStop && <Text>{busStop.name}</Text>}

				<ScrollView>
					{busStop.busTimes &&
						busStop.busTimes.map((busTime, index) => {
							let eta = this.convertToETA(
								currentTime,
								busTime.arrivalTime
							);
							if (eta > 0 && eta < 20) {
								console.log(eta);
								return (
									<BusTag
										key={index}
										busId={busTime.busId}
										eta={eta}
									></BusTag>
								);
							}
						})}
				</ScrollView>
			</View>
		);
	}
}

export default StopLabel;

const styles = StyleSheet.create({
	labelContainer: {
		width: "100%",
		height: 100,
		backgroundColor: "#0ff",
		marginBottom: 2,
		padding: 5,
	},
});
