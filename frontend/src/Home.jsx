import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function Home() {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/api/user/${id}`, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => setUser(data))
            .catch(err => console.error(err));
    }, [id]);

    if (!user) {
        return <div>Lade Benutzerdaten...</div>;
    }

    return (
        <div>
            <Navbar id={id} />

            <div style={{ padding: "20px" }}>
                <h1>Willkommen {user.username}</h1>
                <p>Deine User-ID ist {user.id}</p>
            </div>
        </div>
    );
}
