import { connect } from "react-redux";
import Card from "../components/Card";
import { toggleCardSize } from "../redux/actions";

const mapStateToProps = state => ({
	// location: state.map,
	// formData: state.formData,
	busStops: state.stops,
	expanded: state.settings.expanded,
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
)(Card);
