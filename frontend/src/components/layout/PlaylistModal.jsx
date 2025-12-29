import "../../styles/PlaylistModal.css";

export default function PlaylistModal({
  isOpen,
  playlists,
  onClose,
  onSelect,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Pilih Playlist</h2>

        {playlists.length === 0 ? (
          <p>Kamu belum punya playlist</p>
        ) : (
          <ul className="playlist-list">
            {playlists.map((pl) => (
              <li
                key={pl.playlist_id}
                className="playlist-item"
                onClick={() => onSelect(pl.playlist_id)}
              >
                <span>{pl.name}</span>
                <span>{pl.total_songs || 0} lagu</span>
              </li>
            ))}
          </ul>
        )}

        <button className="close-btn" onClick={onClose}>
          Tutup
        </button>
      </div>
    </div>
  );
}
