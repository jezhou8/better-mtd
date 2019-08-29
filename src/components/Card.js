import React, { Component } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import BusTag from "./BusTag";
class Card extends Component {
	state = {
		time: Date.now(),
	};
	constructor(props) {
		super(props);
	}

	componentDidUpdate(prevProps, prevState) {
		this.getCurrentTime();
	}

	getCurrentTime() {
		console.log("new time: ", Date.now());
		this.state({ time: Date.now() });
	}

	render() {
		let { busStops } = this.props;
		return (
			<View style={styles.container}>
				{busStops &&
					busStops.map(busStop =>
						busStop.busTimes.map(busTime => (
							<BusTag arrivalTime={busTime.arrivalTime}></BusTag>
						))
					)}
			</View>
		);
	}
}

export default Card;

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#fff" },
});
