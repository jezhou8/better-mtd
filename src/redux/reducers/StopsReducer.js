const initialState = [
	{
		id: "test",
		name: "Test Stop",
		busTimes: [
			{
				busName: "69",
				arrivalTime: "2:20",
			},
		],
	},
];

export default function StopsReducer(state = initialState, action) {
	switch (action.type) {
		default:
			return state;
	}
}
