import React, { Component } from "react";
import {
	View,
	ScrollView,
	Text,
	StyleSheet,
	Animated,
	TouchableOpacity,
} from "react-native";
import BusTag from "./BusTag";
import StopLabel from "./StopLabel";
import { TrackingConfigurations } from "expo/build/AR";

class Card extends Component {
	state = {
		time: Date.now(),
		expanded: 1,
		animation: new Animated.Value(1),
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

	_setMaxHeight = event => {
		console.log("max height: ", event.nativeEvent.layout.height);
		this.setState({
			...this.state,
			maxHeight: event.nativeEvent.layout.height,
		});
	};

	toggle = () => {
		//Step 1

		console.log("expanded? ", this.state.expanded);
		console.log();

		this.state.animation.setValue(this.state.expanded); //Step 3
		Animated.spring(
			//Step 4
			this.state.animation,
			{
				toValue: !this.state.expanded,
			}
		).start(); //Step 5
		this.setState({
			...this.state,
			expanded: this.state.expanded ? 0 : 1, //Step 2
		});
	};

	render() {
		let { busStops } = this.props;
		return (
			<Animated.View
				style={{
					width: "100%",
					height: this.state.animation.interpolate({
						inputRange: [0, 1],
						outputRange: ["10%", "50%"],
					}),
					backgroundColor: "#00f",
				}}
			>
				<TouchableOpacity onPress={() => this.toggle()}>
					<View style={styles.collapseBar}></View>
				</TouchableOpacity>
				<ScrollView style={styles.container}>
					{busStops &&
						busStops.map((busStop, index) => (
							<StopLabel
								key={index}
								currentTime={this.state.time}
								busStop={busStop}
							/>
						))}
				</ScrollView>
			</Animated.View>
		);
	}
}

export default Card;

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#fff" },
	cardContainer: {
		width: "100%",
		height: "50%",
		backgroundColor: "#f00",
	},
	collapseBar: {
		backgroundColor: "#f00",
		width: "100%",
		height: 30,
	},
});
