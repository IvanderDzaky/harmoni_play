import "../styles/Dashboard.css";

const SongSection = ({ songs, titleSection }) => {
  return (
    <div className="dashboard-content">
      <h2 className="section-title">{titleSection}</h2>

      <div className="song-grid">
        {songs?.map((song) => (
          <div key={song.song_id} className="song-card">
            <img
              src={song.cover_image}
              className="song-cover"
            />

            <div className="song-info">
              <h3 className="song-title">{song.title}</h3>

              {/* testing audio */}
              <audio controls src={song.file_audio} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongSection;
