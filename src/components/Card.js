import React, { Component } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";

class Card extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		let { busStops } = this.props;
		return (
			<ScrollView>
				{busStops &&
					busStops.map(stop => {
						return <Text>stop.name</Text>;
					})}
			</ScrollView>
		);
	}
}

export default Card;

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#fff" },
});
