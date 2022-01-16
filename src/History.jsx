import { usePlaylist } from "./playlistContext";
import { Link } from "react-router-dom";
import "./History.css";
export default function History() {
  const { history, playlistDispatch } = usePlaylist();
  return (
    <main>
      <h1>History</h1>
      <div className="history__item">
        <ul>
          {history.map((video, i) => {
            return (
              <div className="container">
                <button
                  className="remove__btn"
                  onClick={() =>
                    playlistDispatch({
                      type: "REMOVE_FROM_HISTORY",
                      payload: { video }
                    })
                  }
                >
                  <i class="fas fa-trash"></i>
                </button>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "black",
                    backgroundColor: "#f3f4f6",
                    display: "grid",
                    marginBottom: "1rem",
                    padding: "1rem",
                    width: "45vw"
                  }}
                  to={`/video/${video.id}`}
                  key={i}
                >
                  {" "}
                  <div className="history__body">
                    <img
                      src={video.image}
                      width="220"
                      height="138"
                      alt="error"
                    />
                    <div className="history__info">
                      <div>{video.title}</div>
                      <p>{video.views}</p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
