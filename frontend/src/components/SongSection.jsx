import "../styles/Dashboard.css";
import SongCard from "./layout/SongCard";

const SongSection = ({ songs, titleSection, onPlay }) => {
  return (
    <div className="song-section">
      {titleSection && <h2 className="section-title">{titleSection}</h2>}

      <div className="song-grid">
        {songs?.map((song, index) => (
          <SongCard
            key={song.song_id}
            song={song}
            index={index}
            onPlay={onPlay}
          />
        ))}
      </div>
    </div>
  );
};

export default SongSection;
