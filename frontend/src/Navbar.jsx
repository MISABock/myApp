import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ id }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/logout`, {
                method: "POST",
                credentials: "include"
            });
            navigate("/logout-success");
        } catch (error) {
            console.error("Logout fehlgeschlagen:", error);
        }
    };

    return (
        <nav
            style={{
                backgroundColor: "#1f1f1f",
                padding: "14px 22px",
                display: "flex",
                gap: "28px",
                alignItems: "center",
                borderBottom: "2px solid #333",
                boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                justifyContent: "space-between"
            }}
        >
            <div style={{ display: "flex", gap: "28px" }}>
                <Link
                    to={`/home/${id}/stocklist`}
                    style={{
                        color: "white",
                        textDecoration: "none",
                        fontSize: "16px",
                        padding: "6px 4px",
                        transition: "0.2s"
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = "#70a8ff"}
                    onMouseLeave={e => e.currentTarget.style.color = "white"}
                >
                    Stockliste
                </Link>

                <Link
                    to={`/home/${id}/watchlist`}
                    style={{
                        color: "white",
                        textDecoration: "none",
                        fontSize: "16px",
                        padding: "6px 4px",
                        transition: "0.2s"
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = "#70a8ff"}
                    onMouseLeave={e => e.currentTarget.style.color = "white"}
                >
                    Watchlist
                </Link>

                <Link
                    to={`/home/${id}/mydata`}
                    style={{
                        color: "white",
                        textDecoration: "none",
                        fontSize: "16px",
                        padding: "6px 4px",
                        transition: "0.2s"
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = "#70a8ff"}
                    onMouseLeave={e => e.currentTarget.style.color = "white"}
                >
                    Meine Daten
                </Link>

                <Link
                    to={`/home/${id}/settings`}
                    style={{
                        color: "white",
                        textDecoration: "none",
                        fontSize: "16px",
                        padding: "6px 4px",
                        transition: "0.2s"
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = "#70a8ff"}
                    onMouseLeave={e => e.currentTarget.style.color = "white"}
                >
                    Einstellungen
                </Link>
            </div>

            <button
                onClick={handleLogout}
                style={{
                    backgroundColor: "#ff4d4d",
                    color: "white",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    transition: "0.2s"
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#ff6f6f"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "#ff4d4d"}
            >
                Logout
            </button>
        </nav>
    );
}
