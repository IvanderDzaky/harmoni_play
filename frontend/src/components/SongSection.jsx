
import "../styles/Dashboard.css";

const SongSection = ({songs,titleSection}) => {
    return (
        <div className="dashboard-content">
        <h2 className="section-title">{titleSection}</h2>

        <div className="song-grid">
          {songs?.map((song) => (
            <div key={song.id} className="song-card">
              <img
                src={song.cover_image}
                alt={song.title}
                className="song-cover"
              />

              <div className="song-info">
                <h3 className="song-title">{song.title}</h3>
                <p className="song-artist">{song.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
}

export default SongSection;