export const addVideoToPlaylist = (state, videoId, playlistId) => ({
	...state,
	playlist: state.playlist?.map((playlistItem) => {
		return playlistItem._id === playlistId
			? {
					...playlistItem,
					videos: [...playlistItem.videos, videoId],
			  }
			: playlistItem;
	}),
});
export const deleteVideoFromPlaylist = (state, videoId, playlistId) => {
	return {
		...state,
		playlist: state.playlist.map((playlistItem) => {
			return playlistItem._id === playlistId
				? {
						...playlistItem,
						videos: playlistItem.videos.filter((el) => el !== videoId),
				  }
				: playlistItem;
		}),
	};
};
export const addUserToVideo = (state, videoId, userId) => {
	return {
		...state,
		videoList: state.videoList.map((videoItem) => {
			return videoItem._id === videoId
				? {
						...videoItem,
						likedByUser: [...userId],
				  }
				: videoItem;
		}),
	};
};
export const removeUserFromVideo = (state, videoId, userId) => {
	return {
		...state,
		videoList: state.videoList.map((videoItem) => {
			return videoItem._id === videoId
				? {
						...videoItem,
						likedByUser: [...userId],
				  }
				: videoItem;
		}),
	};
};
export const DataReducer = (state, { type, payload }) => {
	switch (type) {
		case "GET_VIDEOS":
			return { ...state, videoList: payload };
		case "GET_HISTORY":
			return { ...state, history: payload };
		case "ADD_TO_HISTORY":
			return { ...state, history: payload };
		case "DELETE_FROM_HISTORY":
			return { ...state, history: payload };
		case "GET_WATCHLATER":
			return { ...state, watchLater: payload };
		case "ADD_TO_WATCHLATER":
			return { ...state, watchLater: payload };
		case "DELETE_FROM_WATCHLATER":
			return { ...state, watchLater: payload };
		case "GET_LIKEDVIDEOS":
			return { ...state, likedVideo: payload };
		case "ADD_TO_LIKEDVIDEOS":
			return { ...state, likedVideo: payload };
		case "ADD_TO_LIKED_BY_USER":
			const currentVideo = state.videoList.find(
				(el) => el._id === payload.videoId
			);
			const isUserInLikedByUser = currentVideo?.likedByUser.includes(
				payload?.userId
			);

			return !isUserInLikedByUser
				? addUserToVideo(state, payload.videoId, payload.data)
				: removeUserFromVideo(state, payload.videoId, payload.data);

		case "DELETE_FROM_LIKEDVIDEOS":
			return { ...state, likedVideo: payload };
		case "GET_PLAYLIST":
			return { ...state, playlist: payload };
		case "CREATE_PLAYLIST":
			return { ...state, playlist: [...state.playlist, payload] };
		case "TOGGLE_PLAYLIST":
			const currentPlaylist = state?.playlist?.find(
				(el) => el._id === payload.data?._id
			);
			const videoIsPresentInPlaylist = currentPlaylist?.videos.find(
				(el) => el === payload?.videoId
			);
			return !videoIsPresentInPlaylist
				? addVideoToPlaylist(state, payload?.videoId, payload.data?._id)
				: deleteVideoFromPlaylist(state, payload?.videoId, payload.data?._id);

		case "DELETE_PLAYLIST":
			return {
				...state,
				playlist: state.playlist?.filter((el) => el?._id !== payload?._id),
			};

		case "RENAME_PLAYLIST":
			return {
				...state,
				playlist: state.playlist?.map((el) =>
					el._id === payload._id ? { ...el, name: payload.name } : el
				),
			};
		default:
			return state;
	}
};
