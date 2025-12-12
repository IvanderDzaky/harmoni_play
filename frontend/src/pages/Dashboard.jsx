import DashboardLayout from "../components/layout/DashboardLayout";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const songs = [
    { id: 1, title: "Dummy 1", artist: "Unknown Artist" },
    { id: 2, title: "Dummy 2", artist: "Unknown Artist" },
    { id: 3, title: "Dummy 3", artist: "Unknown Artist" },
    { id: 4, title: "Dummy 4", artist: "Unknown Artist" },
    { id: 5, title: "Dummy 5", artist: "Unknown Artist" },
    { id: 6, title: "Dummy 6", artist: "Unknown Artist" },
    { id: 7, title: "Dummy 7", artist: "Unknown Artist" },
    { id: 8, title: "Dummy 8", artist: "Unknown Artist" },
    { id: 9, title: "Dummy 9", artist: "Unknown Artist" },
    { id: 10, title: "Dummy 10", artist: "Unknown Artist" },
  ];

  return (
    <DashboardLayout>
      <div className="dashboard-content">
        <h2 className="section-title">Recommended Songs</h2>

        <div className="song-grid">
          {songs.map((song) => (
            <div key={song.id} className="song-card">
              <img
                src={``}
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
    </DashboardLayout>
  );
}
