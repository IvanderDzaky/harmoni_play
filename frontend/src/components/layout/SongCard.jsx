import { useNavigate } from "react-router-dom";
import "../../styles/Dashboard.css";

const SongCard = ({ song, index, onPlay }) => {
  const navigate = useNavigate();

  const handleDoubleClick = () => {
    navigate(`/song/${song.song_id}`);
  };

  const handleClick = () => {
    if (onPlay) onPlay(index);
  };

  return (
    <div
      className="song-card"
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <div className="song-cover-wrapper">
        <img
          src={song.cover_image}
          alt={song.title}
          className="song-cover"
        />
      </div>

      <div className="song-info">
        <h3 className="song-title">{song.title}</h3>
        {song.artist_name && (
          <p className="song-artist">{song.artist_name}</p>
        )}
      </div>
    </div>
  );
};

export default SongCard;
