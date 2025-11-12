import { useEffect } from "react";

export default function LogoutSuccessPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "http://localhost:8080/login";
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#121212",
        color: "white",
        fontFamily: "Arial, sans-serif",
        textAlign: "center"
      }}
    >
      <h1>Logout erfolgreich</h1>
      <p>Du wurdest erfolgreich ausgeloggt.</p>

      <a
        href="http://localhost:8080/login"
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#70a8ff",
          color: "white",
          textDecoration: "none",
          borderRadius: "6px",
          transition: "0.2s"
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#8cbcff")}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#70a8ff")}
      >
        Zurück zum Login
      </a>

      <p style={{ marginTop: "12px", fontSize: "14px", color: "#aaa" }}>
        Du wirst automatisch weitergeleitet...
      </p>
    </div>
  );
}
