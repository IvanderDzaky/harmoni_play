const BASE_URL = "http://localhost:5000/api/playlist-songs";

const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
});

export const getAllPlaylistSongs = async (playlistId) => {
  const response = await fetch(`${BASE_URL}/${playlistId}`, {
    headers: getAuthHeader(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch playlist songs");
  }

  return response.json();
};

export const addSongToPlaylist = async (payload) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: getAuthHeader(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to add song to playlist");
  }

  return response.json();
};

export const getPlaylistsContainingSong = async (songId) => {
  const response = await fetch(`${BASE_URL}/song/${songId}`, {
    headers: getAuthHeader(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch playlists containing song");
  }

  return response.json();
};
