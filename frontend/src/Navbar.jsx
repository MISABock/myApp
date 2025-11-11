import { Link } from "react-router-dom";

export default function Navbar({ id }) {
    return (
        <nav style={{
            backgroundColor: "#222",
            color: "white",
            padding: "10px",
            display: "flex",
            gap: "20px"
        }}>
            <Link to={`/home/${id}/stocklist`} style={{ color: "white", textDecoration: "none" }}>
                Stockliste
            </Link>

            <Link to={`/home/${id}/mydata`} style={{ color: "white", textDecoration: "none" }}>
                Meine Daten
            </Link>

            <Link to={`/home/${id}/settings`} style={{ color: "white", textDecoration: "none" }}>
                Einstellungen
            </Link>
        </nav>
    );
}
