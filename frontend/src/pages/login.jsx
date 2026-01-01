import { useState } from "react";
import AuthInput from "../components/shared/AuthInput";
import AuthButton from "../components/shared/AuthButton";
import { loginUser } from "../services/authService";
import "../styles/Auth.css";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // konsisten dengan Register
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setMessage("");

    try {
      const res = await loginUser({ email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data));

      setSuccess(true);
      setTimeout(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user?.role === "admin") {
          navigate("/admin");
        } else if (user?.role === "artist") {
          navigate("/artist/dashboard");
        } else {
          navigate("/dashboard");
        }
      }, 500);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Login gagal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 style={{ color: "white" }}>Log in to Harmoni Play</h2>

        {message && <p className={`auth-message ${message.startsWith("✅") ? "success" : "error"}`}>{message}</p>}

        <form onSubmit={handleLogin}>
          <AuthInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <AuthInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <AuthButton text="Login" type="submit" loading={loading} success={success} />
        </form>

        <p className="auth-bottom-text">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
