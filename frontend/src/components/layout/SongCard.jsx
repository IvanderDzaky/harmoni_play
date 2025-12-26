import {useNavigate} from "react-router-dom"
import "../../styles/Dashboard.css"
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
      <img src={song.cover_image} alt={song.title} className="song-cover" />
      <div className="song-info">
        <h3 className="song-title">{song.title}</h3>
      </div>
    </div>
  );
};

export default SongCard;