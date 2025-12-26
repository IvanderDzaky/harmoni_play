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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      const res = await loginUser({ email, password });

      // 🔑 SIMPAN TOKEN
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user",JSON.stringify(res.data.data))
      console.log("USER LS:", JSON.parse(localStorage.getItem("user")));

       
      setSuccess(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err) {
      const msg =
        err.response?.data?.message || "Login gagal";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src="/harmoni_play_logo.png" className="auth-logo" />

        <h2 style={{ color: "white" }}>Log in to Harmoni Play</h2>

        <form onSubmit={handleLogin}>
          <AuthInput
            label="Email"
            type="email"
            value={email}
            error={error}  // ⬅ KIRIM ERROR
            onChange={(e) => setEmail(e.target.value)}
          />

          <AuthInput
            label="Password"
            type="password"
            value={password}
            error={error} // ⬅ KIRIM ERROR
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
