import {
	TOGGLE_CARD_SIZE,
	EXPAND_CARD_SIZE,
	COLLAPSE_CARD_SIZE,
} from "../actions/ActionTypes";

const initialState = {
	expanded: false,
};

export default function SettingsReducer(state = initialState, action) {
	switch (action.type) {
		case TOGGLE_CARD_SIZE:
			return {
				...state,
				expanded: !state.expanded,
			};

		case EXPAND_CARD_SIZE:
			if (state.expanded) {
				return {
					...state,
					expanded: !state.expanded,
				};
			}
			return state;

		case COLLAPSE_CARD_SIZE:
			if (!state.expanded) {
				return {
					...state,
					expanded: !state.expanded,
				};
			}
			return state;

		default:
			return state;
	}
}
