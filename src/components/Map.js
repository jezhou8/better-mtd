import React, { Component } from "react";
import { StyleSheet, Animated } from "react-native";
import MapView from "react-native-maps";
import { stopAsync } from "expo/build/AR";

class Map extends React.Component {
	state = {
		animation: new Animated.Value(1),
	};

	constructor(props) {
		super(props);
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.expanded != prevProps.expanded) {
			this.toggle();
		}
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
		let { region, busStops } = this.props;
		return (
			<Animated.View
				style={{
					width: "100%",
					height: "40%",
					height: this.state.animation.interpolate({
						inputRange: [0, 1],
						outputRange: ["80%", "40%"],
					}),
					backgroundColor: "#0f0",
				}}
			>
				<MapView
					region={region}
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
					}}
					showsUserLocation
				>
					{busStops &&
						busStops.map(stop => {
							return (
								<MapView.Marker
									key={stop.id}
									coordinate={stop.location}
									title={stop.name}
								/>
							);
						})}
				</MapView>
			</Animated.View>
		);
	}
}

const styles = StyleSheet.create({
	map: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
});

export default Map;
