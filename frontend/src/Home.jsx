import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function Home() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadUser() {
            try {
                const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/${id}`, {
                    credentials: "include"
                });

                const text = await res.text();
                const json = JSON.parse(text);

                setUser(json);
            } catch (err) {
                console.error("Fehler beim Laden des Users:", err);
            } finally {
                setLoading(false);
            }
        }

        loadUser();

    }, [id]);

    if (loading) {
        return <div style={{ padding: "20px" }}>Lade Benutzerdaten...</div>;
    }

    if (!user) {
        return <div style={{ padding: "20px" }}>Benutzer wurde nicht gefunden.</div>;
    }

    return (
        <div>
            <Navbar id={id} />

            <div
                style={{
                    maxWidth: "700px",
                    margin: "40px auto",
                    padding: "30px",
                    backgroundColor: "white",
                    borderRadius: "12px",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
                    textAlign: "center"
                }}
            >
                <h1 style={{ marginBottom: "10px", fontSize: "28px" }}>
                    Willkommen {user.username}
                </h1>

                <p style={{ marginBottom: "20px", fontSize: "16px", color: "#555" }}>
                    Deine Benutzer-ID lautet {user.id}
                </p>

                <button
                    onClick={() => navigate(`/home/${id}/stocklist`)}
                    style={{
                        marginTop: "10px",
                        padding: "12px 20px",
                        fontSize: "17px",
                        backgroundColor: "#3e7aff",
                        color: "white",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                        transition: "0.25s"
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = "#356ae6";
                        e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = "#3e7aff";
                        e.currentTarget.style.transform = "translateY(0px)";
                    }}
                >
                    Aktien ansehen
                </button>
            </div>
        </div>
    );
}
