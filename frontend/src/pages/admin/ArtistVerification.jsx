import { useEffect, useState } from "react";
import { getArtistRequests, verifyArtist } from "../../services/adminService";
import Loader from "../../components/layout/Loader";
import "../../styles/ArtistVerification.css";
import "../../styles/loader.css";

export default function ArtistVerification() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const data = await getArtistRequests();
      setRequests(data || []);
    } catch (err) {
      console.error(err);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleVerify = async (id, status) => {
    try {
      await verifyArtist(id, status);
      fetchRequests();
    } catch (err) {
      console.error(err);
      alert("Failed to update artist status");
    }
  };

  if (loading) {
    return (
      <div className="loader-overlay">
        <Loader />
      </div>
    );
  }

  return (
    <div className="artist-verification">
      {/* HEADER */}
      <div className="artist-header">
        <div>
          <h1>Artist Verification</h1>
          <p>Review and approve artist requests</p>
        </div>

        <div className="request-count">
          Pending: <span>{requests.length}</span>
        </div>
      </div>

      {/* CONTENT */}
      {requests.length === 0 ? (
        <p className="empty">No pending artist requests</p>
      ) : (
        <div className="artist-grid">
          {requests.map((artist) => (
            <div className="artist-card" key={artist.artist_id}>
              <div className="artist-info">
                <h3>{artist.name}</h3>
                <p>{artist.bio || "No bio provided"}</p>
              </div>

              <div className="artist-actions">
                <button
                  className="approve"
                  onClick={() =>
                    handleVerify(artist.artist_id, true)
                  }
                >
                  Approve
                </button>

                <button
                  className="reject"
                  onClick={() =>
                    handleVerify(artist.artist_id, false)
                  }
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
