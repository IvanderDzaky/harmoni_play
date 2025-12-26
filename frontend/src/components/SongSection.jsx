import "../styles/Dashboard.css";

const SongSection = ({ songs, titleSection, onPlay }) => {
  return (
    <div>
      <h2>{titleSection}</h2>

      <div className="song-grid">
        {songs.map((song, index) => (
          <div
            key={song.song_id}
            className="song-card"
            onClick={() => onPlay(index)}
          >
            <img src={song.cover_image} className="song-cover" />
            <h3>{song.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongSection;

