import { DataReducer } from "./DataReducer";

describe("testing playlist actions", () => {
	it("should add video to playlist if not present otherwise remove it", () => {
		const initialState = {
			playlist: [
				{
					_id: "620bcf511b7de40028471913",
					videos: ["60d07e6ce4301603c9aa5dd5"],
				},
			],
		};
		const payload1 = {
			data: {
				videos: ["60d07e6ce4301603c9aa5dd5"],
				_id: "620bcf511b7de40028471913",
			},
			videoId: "60d07e6ce4301603c9aa5dd5",
		};
		const action1 = {
			type: "TOGGLE_PLAYLIST",
			payload: payload1,
		};
		const reducedState = DataReducer(initialState, action1);
		const finalState = {
			playlist: [
				{
					_id: "620bcf511b7de40028471913",
					videos: [],
				},
			],
		};
		expect(reducedState).toEqual(finalState);
		const payload2 = {
			data: {
				videos: ["60d07e6ce4301603c9aa5dd4"],
				_id: "620bcf511b7de40028471913",
			},
			videoId: "60d07e6ce4301603c9aa5dd4",
		};
		const action2 = {
			type: "TOGGLE_PLAYLIST",
			payload: payload2,
		};
		const reducedState2 = DataReducer(initialState, action2);
		const finalState2 = {
			playlist: [
				{
					_id: "620bcf511b7de40028471913",
					videos: ["60d07e6ce4301603c9aa5dd5", "60d07e6ce4301603c9aa5dd4"],
				},
			],
		};
		expect(reducedState2).toEqual(finalState2);
	});

	it("should create new playlist", () => {
		const initialState = {
			playlist: [],
		};
		const action = {
			type: "CREATE_PLAYLIST",
			payload: {
				owner: "61e3e89461b3000068c9c503",
				name: "test",
				videos: ["60d07e6ce4301603c9aa5dd5"],
			},
		};
		const finalState = {
			playlist: [
				{
					owner: "61e3e89461b3000068c9c503",
					name: "test",
					videos: ["60d07e6ce4301603c9aa5dd5"],
				},
			],
		};
		const reducedState = DataReducer(initialState, action);
		expect(reducedState).toEqual(finalState);
	});
	it("should delete playlist", () => {
		const initialState = {
			playlist: [
				{
					_id: "6258106f1e3db904010f0744",
					name: "new playlist",
					videos: ["60d07e6ce4301603c9aa5dd8"],
				},
			],
		};
		const action = {
			type: "DELETE_PLAYLIST",
			payload: {
				_id: "6258106f1e3db904010f0744",
			},
		};
		const finalState = {
			playlist: [],
		};
		const reducedState = DataReducer(initialState, action);
		expect(reducedState).toEqual(finalState);
	});
	it("should update playlist name", () => {
		const initialState = {
			playlist: [
				{
					_id: "6258106f1e3db904010f0744",
					name: "new playlist",
					videos: ["60d07e6ce4301603c9aa5dd8"],
				},
			],
		};
		const action = {
			type: "RENAME_PLAYLIST",
			payload: {
				_id: "6258106f1e3db904010f0744",
				name: "renamed playlist",
			},
		};
		const finalState = {
			playlist: [
				{
					_id: "6258106f1e3db904010f0744",
					name: "renamed playlist",
					videos: ["60d07e6ce4301603c9aa5dd8"],
				},
			],
		};
		const reducedState = DataReducer(initialState, action);
		expect(reducedState).toEqual(finalState);
	});
});
