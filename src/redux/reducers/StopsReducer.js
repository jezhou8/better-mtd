import {
	FETCH_LOCATION_FULFILLED,
	FETCH_STOPS_FULFILLED,
	FETCH_BUS_TIMES_FULFILLED,
} from "../actions/ActionTypes";

const initialState = {
	stops: [],
	busTimes: [],
};

export default function StopsReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_STOPS_FULFILLED:
			return {
				...state,
				stops: action.payload,
			};

		case FETCH_BUS_TIMES_FULFILLED:
			return {
				...state,
				busTimes: state.busTimes.concat(action.payload),
			};

		default:
			return state;
	}
}
