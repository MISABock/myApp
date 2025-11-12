import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

export default function MyData() {

    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadUser() {
            try {
                const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${id}`, {
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
        return (
            <div>
                <Navbar id={id} />
                <div style={{ padding: "20px" }}>Lade Benutzerdaten...</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div>
                <Navbar id={id} />
                <div style={{ padding: "20px" }}>Benutzer wurde nicht gefunden.</div>
            </div>
        );
    }

    return (
        <div>
            <Navbar id={id} />

            <div
                style={{
                    maxWidth: "600px",
                    margin: "40px auto",
                    padding: "25px",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.12)"
                }}
            >
                <h2 style={{ marginBottom: "20px" }}>Deine Benutzerdaten</h2>

                <p style={{ fontSize: "18px", marginBottom: "10px" }}>
                    Benutzername: <strong>{user.username}</strong>
                </p>

                <p style={{ fontSize: "18px", marginBottom: "10px" }}>
                    User ID: <strong>{user.id}</strong>
                </p>
            </div>
        </div>
    );
}
