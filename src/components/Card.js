import React, { Component } from "react";
import {
	View,
	ScrollView,
	StyleSheet,
	Animated,
	TouchableOpacity,
	Platform,
} from "react-native";
import { SearchBar } from "react-native-elements";
import StopLabel from "./StopLabel";
import { NAVBAR_HEIGHT, LIGHT_GRAY } from "../constants";

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
		this.setState({ time: new Date() });
	}

	toggle = () => {
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
		let { busStops, toggleCardSize, expandCardSize, busTimes } = this.props;
		console.log("busTimes.length: ", busTimes.length);
		return (
			<Animated.View
				style={{
					width: "100%",
					height: this.state.animation.interpolate({
						inputRange: [0, 1],
						outputRange: ["10%", "60%"],
					}),
					backgroundColor: "#00f",
					position: "absolute",
					bottom: NAVBAR_HEIGHT,
				}}
			>
				<TouchableOpacity onPress={() => toggleCardSize()}>
					<View style={styles.collapseBar}></View>
				</TouchableOpacity>
				<SearchBar
					placeholder={"Enter destination"}
					containerStyle={styles.searchContainer}
					onFocus={() => expandCardSize()}
					platform={Platform.OS}
				></SearchBar>
				<ScrollView style={styles.container}>
					{busStops &&
						busStops.map((busStop, index) => (
							<StopLabel
								index={index + 1}
								key={busStop.stop_id}
								currentTime={this.state.time}
								busStop={busStop}
								busTimes={busTimes}
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
		backgroundColor: LIGHT_GRAY,
	},
	collapseBar: {
		backgroundColor: LIGHT_GRAY,
		width: "100%",
		height: 10,
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		position: "absolute",
		bottom: "100%",

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: -1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,

		elevation: 2,
	},
	searchContainer: {
		backgroundColor: LIGHT_GRAY,
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
	},
});
