const initialState = [
	{
		id: "test",
		name: "Test Stop",
		busTimes: [
			{
				busName: "100W",
				arrivalTime: "2:20",
			},
			{
				busName: "22E",
				arrivalTime: "2:20",
			},
			{
				busName: "1N",
				arrivalTime: "2:20",
			},
			{
				busName: "10S",
				arrivalTime: "2:20",
			},
			{
				busName: "22N",
				arrivalTime: "2:20",
			},
			{
				busName: "220N",
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
