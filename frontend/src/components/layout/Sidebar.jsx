import { Link } from "react-router-dom";
import { FiHome, FiSearch, FiBook,FiPlus } from "react-icons/fi";
import {useState,useEffect} from "react";
import "../../styles/Sidebar.css";
import {addPlaylist} from "../../services/playlistService"
import EditPlaylistModal from "../EditPlaylistModal";
import { getAllPlayListByUser } from "../../services/playlistService";

export default function Sidebar() {
   const [showEditModal, setShowEditModal] = useState(false);
   const [playlist,setPlaylist] = useState([])
   const [loading,setLoading] = useState(true)
      
  useEffect(() => {
  const fetchPlaylist = async () => {
    try {
      const data = await getAllPlayListByUser();
      setPlaylist(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  fetchPlaylist();
}, []);

  
 const handleCreatePlaylist = async ({ name, description }) => {
  try {
    const response = await addPlaylist({ name, description });

    if (response) {
      setPlaylist((prev) => [...prev, response]);
      setShowEditModal(false);
    }
  } catch (err) {
    console.log(err);
  }
};


  if(loading) {
    return (
      <div style={{
        display:"flex",
        justifyContent:"Center",
        alignItems:"center",
        height:"100vh"
      }}>
        Memuat playlist....
      </div>
    )
  }
  return (
    <div className="sidebar">

      <div className="sidebar-header">
      <h2 className="sidebar-title">HarmoniPlay</h2>
        <Link to="/dashboard" className="menu-item">
          <FiHome className="menu-icon" />
        </Link>

      </div>

        <nav className="sidebar-menu">
        <Link to="/search" className="menu-item">
          <FiSearch className="menu-icon" />
          <span>Search</span>
        </Link>
         <div style={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
         }}>
        <Link to="/library" className="menu-item">
          <FiBook className="menu-icon" />
          <span>Your Library</span>
        </Link>
            <button
              className="add-playlist-btn" onClick={() => setShowEditModal(true)}
            >
              <FiPlus size={18} />
            </button>
         </div>
        </nav>
        <div className="playlist-section">
            {playlist.length === 0 ? (
              <p className="empty-playlist">Belum ada playlist</p>
            ) : (
              playlist.map((item) => (
                <Link
                  key={item.playlist_id}
                  to={`/playlist/${item.playlist_id}`}
                  className="playlist-item"
                >
                  <div className="playlist-icon">
                    <FiBook size={20} />
                  </div>

                  <div className="playlist-info">
                    <span className="playlist-name">{item.name}</span>
                    <span className="playlist-meta">
                      Playlist • {item.created_by}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>

        {showEditModal && (
          <EditPlaylistModal
            onClose={() => setShowEditModal(false)}
            onSave=
              {handleCreatePlaylist}
          />
        )}
    </div>
    
  );

}
