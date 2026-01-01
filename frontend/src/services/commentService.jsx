const BASE_URL = "http://localhost:5000/api/comments";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

export const getAllComments = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) return [];
    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getCommentsBySong = async (song_id) => {
  try {
    const response = await fetch(`${BASE_URL}/${song_id}`);
    if (!response.ok) return [];
    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const createComment = async (song_id, content) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { ...getAuthHeader(), "Content-Type": "application/json" },
      body: JSON.stringify({ song_id, content }),
    });

    if (!response.ok) return null;

    const result = await response.json();
    return result.data; // sudah include User.name
  } catch (err) {
    console.error(err);
    return null;
  }
};
