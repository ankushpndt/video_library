import { Link } from "react-router-dom";
import { usePlaylist } from "./playlistContext";
import "./Videos.css";

export function Videos() {
  const { videoData, playlistDispatch } = usePlaylist();
  return (
    <div className="video__item">
      <ul>
        {videoData.map(({ title, id, date, views, image }, i) => {
          return (
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                display: "grid",
                marginBottom: "1rem"
              }}
              to={`/video/${id}`}
              key={id}
            >
              {" "}
              <div className="video__body">
                <img src={image} width="370" height=" auto" alt="error" />
                <div style={{ marginTop: "1rem" }}>{title}</div>
                <p>
                  {views} • <span>{date}</span>
                </p>
              </div>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
