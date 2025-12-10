import "../shared/AuthInput.css";

export default function AuthInput({ label, type, value, onChange, error }) {
  return (
    <div className="auth-input-group">
      <label>{label}</label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        className={error ? "input-error" : ""}
      />

      {error && <p className="error-text">{error}</p>}
    </div>
  );
}
