import { TOGGLE_CARD_SIZE } from "../actions/ActionTypes";

const initialState = {
	hi: false,
	expanded: false,
};

export default function SettingsReducer(state = initialState, action) {
	switch (action.type) {
		case TOGGLE_CARD_SIZE:
			return {
				...state,
				expanded: !state.expanded,
			};

		default:
			return state;
	}
}
