import { Link } from "react-router-dom";

export default function Navbar({ id }) {
    return (
        <nav
            style={{
                backgroundColor: "#1f1f1f",
                padding: "14px 22px",
                display: "flex",
                gap: "28px",
                alignItems: "center",
                borderBottom: "2px solid #333",
                boxShadow: "0 2px 6px rgba(0,0,0,0.25)"
            }}
        >
            {/* Stockliste */}
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

            {/* Watchlist – neuer Eintrag */}
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

            {/* Meine Daten */}
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

            {/* Einstellungen */}
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
        </nav>
    );
}
