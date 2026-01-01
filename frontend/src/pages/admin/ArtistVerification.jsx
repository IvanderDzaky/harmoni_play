import { useEffect, useState } from "react";
import { getArtistRequests, verifyArtist } from "../../services/adminService";
import "../../styles/ArtistVerification.css";

export default function ArtistVerification() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const data = await getArtistRequests();
        if (isMounted) setRequests(data);
      } catch (err) {
        console.error(err);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleVerify = async (id, status) => {
    await verifyArtist(id, status);

    const data = await getArtistRequests();
    setRequests(data);
  };

  return (
    <div className="admin-page">
      <h1>Artist Requests</h1>

      {requests.length === 0 && <p>No pending requests</p>}

      <div className="artist-grid">
        {requests.map((artist) => (
          <div className="artist-card" key={artist.artist_id}>
            <h3>{artist.name}</h3>
            <p>{artist.bio}</p>

            <div className="actions">
              <button
                className="approve"
                onClick={() => handleVerify(artist.artist_id, true)}
              >
                Approve
              </button>
              <button
                className="reject"
                onClick={() => handleVerify(artist.artist_id, false)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
