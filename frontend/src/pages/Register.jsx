import { useState } from "react";
import AuthInput from "../components/shared/AuthInput";
import AuthButton from "../components/shared/AuthButton";
import { registerUser } from "../services/authService";
import "../styles/Auth.css";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setMessage("");

    try {
      const res = await registerUser({ name, email, password });

      setSuccess(true);
      setName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Gagal register. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 style={{ color: "white" }}>Sign up to Harmoni Play</h2>

        {message && <p className={`auth-message ${message.startsWith("✅") ? "success" : "error"}`}>{message}</p>}

        <form onSubmit={handleRegister}>
          <AuthInput
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <AuthButton text="Sign Up" type="submit" loading={loading} success={success} />
        </form>

        <p className="auth-bottom-text">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
