import React, { Component } from "react";
import {
	View,
	ScrollView,
	StyleSheet,
	Animated,
	TouchableOpacity,
} from "react-native";
import StopLabel from "./StopLabel";
import { NAVBAR_HEIGHT } from "../constants";

class Card extends Component {
	state = {
		time: Date.now(),
		animation: new Animated.Value(1),
	};
	constructor(props) {
		super(props);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps != this.props) {
			this.getCurrentTime();

			if (this.props.expanded != prevProps.expanded) {
				this.toggle();
			}
		}
	}

	getCurrentTime() {
		console.log("new time: ", new Date().getMinutes());
		this.setState({ time: new Date() });
	}

	toggle = () => {
		//console.log("this.props.expanded ", this.props.expanded);
		this.state.animation.setValue(this.props.expanded); //Step 3
		Animated.spring(
			//Step 4
			this.state.animation,
			{
				toValue: !this.props.expanded,
			}
		).start();
	};

	render() {
		let { busStops, toggleCardSize, expanded } = this.props;
		console.log(expanded);
		return (
			<Animated.View
				style={{
					width: "100%",
					height: this.state.animation.interpolate({
						inputRange: [0, 1],
						outputRange: ["10%", "50%"],
					}),
					backgroundColor: "#00f",
					position: "absolute",
					bottom: NAVBAR_HEIGHT,
				}}
			>
				<TouchableOpacity onPress={() => toggleCardSize()}>
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
