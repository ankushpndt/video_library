import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../Context/DataContext";
import { getWatchLater, deleteFromWatchLater } from "../../utils/ApiCall";
import { useAuth } from "../../Context/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { Loader } from "../../Components/Loader";
export const WatchLater = () => {
	const { watchLater, dispatch, videoList, setLoader, loader } = useData();
	const { token } = useAuth();
	const extractVideoFromWatchLater = videoList?.filter((video) => {
		return watchLater?.find((el) => el._id === video._id);
	});
	const [disableWatchLaterBtn, setDisableWatchLaterBtn] = useState(false);
	useEffect(() => {
		getWatchLater(dispatch, token, setLoader);
	}, [dispatch, token, setLoader]);
	return (
		<main>
			<h1>Watch Later</h1>
			{!loader ? (
				<div className="video__item">
					<ul className="history__list">
						{extractVideoFromWatchLater?.length > 0 ? (
							extractVideoFromWatchLater?.map((video, i) => {
								return (
									<div className="container" key={i}>
										<button
											className="liked__remove__btn"
											onClick={() =>
												deleteFromWatchLater({
													dispatch,
													token,
													_id: video?._id,
													setDisableWatchLaterBtn,
												})
											}
											disabled={disableWatchLaterBtn}
										>
											<DeleteIcon />
										</button>
										<Link
											style={{
												textDecoration: "none",
												color: "black",
												display: "grid",
											}}
											to={`/video/${video?.videoId}`}
											key={video?.id}
										>
											{" "}
											<div className="liked__video__body">
												<img src={video?.image} alt="error" />
												<div style={{ marginTop: "1rem" }}>{video?.title}</div>
												<p>
													{video?.views} • <span>{video?.date}</span>
												</p>
											</div>
										</Link>
									</div>
								);
							})
						) : (
							<div className="empty__text">There is no video here.</div>
						)}
					</ul>
				</div>
			) : (
				<Loader />
			)}
		</main>
	);
};
