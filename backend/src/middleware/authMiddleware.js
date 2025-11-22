import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer token

  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }

  jwt.verify(token, process.env.JWT_SECRET || "secretkey", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = user; // simpan info user di request
    next(); // lanjut ke controller
  });
};
