export default function AuthButton({ text, type, loading, success }) {
  return (
    <button className={`auth-btn ${success ? "success" : ""}`} type={type} disabled={loading || success}>
      {loading ? (
        <div className="spinner"></div>
      ) : success ? (
        "Success ✓"
      ) : (
        text
      )}
    </button>
  );
}
