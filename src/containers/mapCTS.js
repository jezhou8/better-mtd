import { connect } from "react-redux";
import Map from "../components/Map";
import { toggleCardSize } from "../redux/actions";

const mapStateToProps = state => ({
	// location: state.map,
	// formData: state.formData,
	busStops: state.busStops.stops,
	expanded: state.settings.expanded,
	region: state.map.region,
});

const mapDispatchToProps = dispatch => {
	return {
		// createEvent: newForm => dispatch(createEvent(newForm)),
		// onFormDataChange: values => dispatch(onFormDataChange(values)),
		// clearForm: () => dispatch(clearForm()),
		toggleCardSize: () => dispatch(toggleCardSize()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Map);
