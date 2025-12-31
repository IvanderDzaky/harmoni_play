const BASE_URL = "http://localhost:5000/api/comments"

const getAuthHeader = () => {
    const token = localStorage.getItem("token")
    return {
        Authorization: `Bearer ${token}`,
    }
}

export const getAllComments = async () => {
    try {
        const response = await fetch(BASE_URL)

        if(!response.ok) return []

        return await response.json()
    }catch (err) {
        console.log(err)
        return []
    }
}

export const createComments = async (song_id, user_id, content) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        ...getAuthHeader(),
        "Content-Type": "application/json", // huruf C besar
      },
      body: JSON.stringify({
        song_id,
        user_id,
        content
      }),
    });

    if (!response.ok) return null;

    const result = await response.json();
    return result.data; // <-- ambil data komentar saja
  } catch (err) {
    console.error(err);
    return null;
  }
};
