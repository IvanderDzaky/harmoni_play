const BASE_URL = "http://localhost:5000/api";

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getAllUsers = async () => {
  const res = await fetch(`${BASE_URL}/users`, {
    headers: authHeader(),
  });
  return res.json();
};


export const getArtistRequests = async () => {
  const res = await fetch(`${BASE_URL}/artists/requests`, {
    headers: authHeader(),
  });

  console.log("STATUS:", res.status);
  const data = await res.text();
  console.log("DATA:", data);

  return JSON.parse(data); // pastikan JSON
};


export const verifyArtist = async (id, status) => {
  const res = await fetch(
    `${BASE_URL}/artists/verify/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authHeader(),
      },
      body: JSON.stringify({ verified: status }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("VERIFY ERROR RESPONSE:", text);
    throw new Error("Verify artist failed");
  }

  return res.json();
};
