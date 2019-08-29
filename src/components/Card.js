import React, { Component } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import BusTag from "./BusTag";
import StopLabel from "./StopLabel";

class Card extends Component {
	state = {
		time: Date.now(),
	};
	constructor(props) {
		super(props);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps != this.props) {
			this.getCurrentTime();
		}
	}

	getCurrentTime() {
		console.log("new time: ", new Date().getMinutes());
		this.setState({ time: new Date() });
	}

	render() {
		let { busStops } = this.props;
		return (
			<ScrollView style={styles.container}>
				{busStops &&
					busStops.map(busStop => (
						<StopLabel
							currentTime={this.state.time}
							busStop={busStop}
						/>
					))}
			</ScrollView>
		);
	}
}

export default Card;

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#fff" },
});
