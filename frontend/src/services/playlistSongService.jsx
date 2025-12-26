const BASE_URL = "http://localhost:5000/api/playlist-songs";

export const getAllPlaylistSongs = async ({ id }) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error("Failed to fetch playlist songs");
    const data = await response.json();
    return data; 
  } catch (err) {
    console.error("Playlist fetch error:", err);
    return []; 
  }
};
