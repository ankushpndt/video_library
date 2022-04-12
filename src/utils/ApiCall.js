import axios from "axios";
import { toast } from "react-toastify";
const API_URL = "https://videoLibraryBackend.ankushpndt.repl.co";
export const getVideos = async (dispatch, setLoader) => {
	try {
		setLoader(true);
		const response = await axios.get(`${API_URL}/video`);
		dispatch({ type: "GET_VIDEOS", payload: response.data.videoList });
		setLoader(false);
	} catch (err) {
		toast.dark(err?.response?.data?.message);
		console.log(err);
	}
};

export const getLikedVideos = async (dispatch, token, setLoader) => {
	try {
		setLoader(true);
		const response = await axios.get(`${API_URL}/likedvideo`, {
			headers: { "auth-token": token },
		});

		dispatch({
			type: "GET_LIKEDVIDEOS",
			payload: response.data.likedVideos,
		});
		setLoader(false);
	} catch (err) {
		toast.dark(err?.response?.data?.message);
	}
};
export const addToLikedVideos = async ({ dispatch, token, _id }) => {
	try {
		const response = await axios.post(
			`${API_URL}/likedvideo/${_id}`,
			{},
			{ headers: { "auth-token": token } }
		);

		dispatch({
			type: "ADD_TO_LIKEDVIDEOS",
			payload: response.data.updatedLikedVideos,
		});
	} catch (err) {
		toast.dark(err?.response?.data?.message);
	}
};
export const addToLikedByUser = async ({ dispatch, token, _id, userId }) => {
	try {
		const response = await axios.post(
			`${API_URL}/video/likedbyuser/${_id}`,
			{},
			{ headers: { "auth-token": token } }
		);

		dispatch({
			type: "ADD_TO_LIKED_BY_USER",
			payload: {
				data: response.data.updatedLikedByUser,
				userId,
				videoId: _id,
			},
		});
	} catch (err) {
		toast.dark(err?.response?.data?.message);
	}
};
export const deleteFromLikedVideos = async ({ dispatch, token, _id }) => {
	try {
		const response = await axios.delete(
			`${API_URL}/likedvideo/${_id}`,

			{ headers: { "auth-token": token } }
		);

		dispatch({
			type: "DELETE_FROM_LIKEDVIDEOS",
			payload: response.data.likedVideos,
		});
		toast.dark("Deleted from liked videos");
	} catch (err) {
		toast.dark(err?.response?.data?.message);
	}
};
export const getWatchLater = async (dispatch, token, setLoader) => {
	try {
		setLoader(true);
		const response = await axios.get(`${API_URL}/watchlater`, {
			headers: { "auth-token": token },
		});
		dispatch({ type: "GET_WATCHLATER", payload: response.data.watchLater });
		setLoader(false);
	} catch (err) {
		toast.dark(err?.response?.data?.message);
	}
};
export const addToWatchLater = async ({ dispatch, token, _id }) => {
	try {
		const response = await axios.post(
			`${API_URL}/watchlater/${_id}`,
			{},
			{ headers: { "auth-token": token } }
		);

		dispatch({
			type: "ADD_TO_WATCHLATER",
			payload: response.data.updatedWatchLater,
		});
		toast.dark("Added to watch later");
	} catch (err) {
		toast.dark(err?.response?.data?.message);
	}
};
export const deleteFromWatchLater = async ({ dispatch, token, _id }) => {
	try {
		const response = await axios.delete(
			`${API_URL}/watchlater/${_id}`,

			{ headers: { "auth-token": token } }
		);

		dispatch({
			type: "DELETE_FROM_WATCHLATER",
			payload: response.data.watchLater,
		});
		toast.dark("Deleted from watch later");
	} catch (err) {
		toast.dark(err?.response?.data?.message);
	}
};
export const getPlaylist = async ({ dispatch, token, userId, setLoader }) => {
	try {
		setLoader(true);
		const response = await axios.get(`${API_URL}/playlist/${userId}`, {
			headers: { "auth-token": token },
		});

		dispatch({ type: "GET_PLAYLIST", payload: response.data.playlists });
		setLoader(false);
	} catch (err) {
		toast.dark(err?.response?.data?.message);
	}
};
export const createPlaylistName = async ({
	dispatch,
	token,
	userId,
	playlistInput,
	vId,
}) => {
	try {
		const response = await axios.post(
			`${API_URL}/playlist`,
			{ owner: userId, name: playlistInput, videos: vId },
			{ headers: { "auth-token": token } }
		);
		dispatch({ type: "CREATE_PLAYLIST", payload: response.data.playlist });
		toast.dark("Playlist created");
	} catch (err) {
		toast.dark(err?.response?.data?.message);
	}
};
export const togglePlaylist = async ({ dispatch, token, playlistId, vId }) => {
	try {
		const response = await axios.post(
			`${API_URL}/playlist/toggle/${playlistId}`,
			{
				videoId: vId,
			},
			{
				headers: { "auth-token": token },
			}
		);
		toast.dark(response?.data?.message);
		dispatch({
			type: "TOGGLE_PLAYLIST",
			payload: { data: response.data.updatedPlaylist, videoId: vId },
		});
	} catch (err) {
		toast.dark(err?.response?.data?.message);
	}
};
export const deletePlaylist = async ({ dispatch, token, playlistId }) => {
	console.log(playlistId);
	try {
		const response = await axios.delete(
			`${API_URL}/playlist/delete/${playlistId}`,
			{
				headers: { "auth-token": token },
			}
		);
		dispatch({
			type: "DELETE_PLAYLIST",
			payload: response.data.deletedPlaylist,
		});
		toast.dark("Deleted from Playlist");
	} catch (err) {
		toast.dark(err?.response?.data?.message);
	}
};
export const renamePlaylist = async ({
	dispatch,
	playlistId,
	newName,
	token,
}) => {
	try {
		const response = await axios.post(
			`${API_URL}/playlist/update/${playlistId}`,
			{
				newName,
			},
			{
				headers: { "auth-token": token },
			}
		);

		dispatch({
			type: "RENAME_PLAYLIST",
			payload: response.data.updatedPlaylistName,
		});
		toast.dark("Renamed the playlist");
	} catch (err) {
		toast.dark(err?.response?.data?.message);
	}
};
export const getHistory = async (dispatch, token, setLoader) => {
	try {
		setLoader(true);
		const response = await axios.get(`${API_URL}/history`, {
			headers: { "auth-token": token },
		});
		dispatch({ type: "GET_HISTORY", payload: response.data.history });
		setLoader(false);
	} catch (err) {
		toast.dark(err?.response?.data?.message);
	}
};
export const addToHistory = async ({ dispatch, _id, token }) => {
	try {
		const response = await axios.post(
			`${API_URL}/history/${_id}`,
			{},
			{
				headers: { "auth-token": token },
			}
		);
		dispatch({ type: "ADD_TO_HISTORY", payload: response.data.updatedHistory });
	} catch (err) {
		toast.dark(err?.response?.data?.message);
	}
};
export const deleteFromHistory = async ({ dispatch, _id, token }) => {
	try {
		const response = await axios.delete(
			`${API_URL}/history/${_id}`,

			{
				headers: { "auth-token": token },
			}
		);

		dispatch({
			type: "DELETE_FROM_HISTORY",
			payload: response.data.history,
		});
		toast.dark("Deleted from history");
	} catch (err) {
		toast.dark(err?.response?.data?.message);
	}
};
