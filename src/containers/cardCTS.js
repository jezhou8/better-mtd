import { connect } from "react-redux";
import Card from "../components/Card";
import { setDefaultLocation } from "../redux/actions";

const mapStateToProps = state => ({
	// location: state.map,
	// formData: state.formData,
	busStops: state.stops,
});

const mapDispatchToProps = dispatch => {
	return {
		// createEvent: newForm => dispatch(createEvent(newForm)),
		// onFormDataChange: values => dispatch(onFormDataChange(values)),
		// clearForm: () => dispatch(clearForm()),
	};
};

export default connect(
	mapStateToProps
	// mapDispatchToProps
)(Card);
