import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlatGrid, SectionGrid } from "react-native-super-grid";
import BusTag from "./BusTag";
import { LIGHT_GRAY } from "../constants";
import { Col, Row, Grid } from "react-native-easy-grid";
class StopLabel extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	// convertToETA = (currentTime, arrivalTime) => {
	// 	console.log("hello!");
	// 	let fArrivalTime = new Date("1970-01-01T" + arrivalTime + "Z");
	// 	let minutesTill = fArrivalTime.getMinutes();
	// 	let hoursTill = fArrivalTime.getHours();

	// 	let currMinutes = currentTime.getMinutes();

	// 	if (hoursTill == currentTime.getHours()) {
	// 		return minutesTill - currMinutes;
	// 	}

	// 	return minutesTill + (60 - currMinutes);
	// };

	render() {
		let { busStop, currentTime, index } = this.props;
		console.log("stop name: ", busStop);
		let busTimes = busStop.busTimes;
		return (
			<View style={styles.labelContainer}>
				<View style={styles.stopInfoContainer}>
					<View style={styles.stopNumber}>
						<Text
							adjustsFontSizeToFit
							style={styles.stopNumberText}
						>
							{index}
						</Text>
					</View>
				</View>
				<View style={styles.busInfoContainer}>
					{busStop && (
						<Text style={{ fontSize: 17, paddingVertical: 5 }}>
							{busStop.stop_name}
						</Text>
					)}
					{busTimes && (
						<Grid>
							<Col style={{ width: "33%" }}>
								<Row>
									{busTimes[0] && (
										<BusTag busInfo={busTimes[0]}></BusTag>
									)}
								</Row>
								<Row>
									{busTimes[1] && (
										<BusTag busInfo={busTimes[1]}></BusTag>
									)}
								</Row>
							</Col>
							<Col style={{ width: "33%" }}>
								<Row>
									{busTimes[2] && (
										<BusTag busInfo={busTimes[2]}></BusTag>
									)}
								</Row>
								<Row>
									{busTimes[3] && (
										<BusTag busInfo={busTimes[3]}></BusTag>
									)}
								</Row>
							</Col>
							<Col style={{ width: "33%" }}>
								<Row>
									{busTimes[4] && (
										<BusTag busInfo={busTimes[4]}></BusTag>
									)}
								</Row>
								<Row>
									{busTimes[5] && (
										<BusTag busInfo={busTimes[5]}></BusTag>
									)}
								</Row>
							</Col>
						</Grid>
					)}
				</View>
			</View>
		);
	}
}

export default StopLabel;

const styles = StyleSheet.create({
	labelContainer: {
		flexDirection: "row",
		width: "100%",
		height: 110,
		backgroundColor: LIGHT_GRAY,
		marginBottom: 2,
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
		paddingBottom: 10,
	},
	busInfoContainer: {
		width: "80%",
		flexDirection: "column",
		justifyContent: "space-between",
	},
	stopInfoContainer: {
		width: "20%",
		alignItems: "center",

		justifyContent: "center",
	},
	stopNumber: {
		width: "60%",
		aspectRatio: 1,
		backgroundColor: "#FF7700",
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	stopNumberText: {
		fontSize: 34,
		color: "#fff",
		fontWeight: "bold",
	},
});
