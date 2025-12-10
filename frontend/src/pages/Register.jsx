import { useState } from "react";
import AuthInput from "../components/shared/AuthInput";
import AuthButton from "../components/shared/AuthButton";
import { registerUser } from "../services/authService";
import "../styles/Auth.css";
import { Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser({ name, email, password });
      console.log("Register success:", res.data);
    } catch (err) {
      console.error("Register failed:", err.response?.data);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src="/harmoni_play_logo.png" className="auth-logo" />

        <h2 style={{ color: "white" }}>Sign up to Harmoni Play</h2>

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

          <AuthButton text="Sign Up" type="submit" />
        </form>

        <p className="auth-bottom-text">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
