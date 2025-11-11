import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function StockList() {

    const { id } = useParams();
    const [stocks, setStocks] = useState([]);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();


    async function loadAll() {
        const res = await fetch("http://localhost:8080/api/stocks", {
            credentials: "include"
        });

        const text = await res.text();
        try {
            setStocks(JSON.parse(text));
        } catch (e) {
            console.error("Parse error", e);
        }
    }

    async function search() {
        const res = await fetch(`http://localhost:8080/api/stocks/search?q=${query}`, {
            credentials: "include"
        });

        const text = await res.text();
        try {
            setStocks(JSON.parse(text));
        } catch (e) {
            console.error("Parse error", e);
        }
    }

    async function addToWatchlist(stock) {
        await fetch("http://localhost:8080/api/watchlist/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                userId: Number(id),
                symbol: stock.symbol
            })
        });

        alert("Aktie wurde zur Watchlist hinzugefügt.");
    }


    useEffect(() => {
        loadAll();
    }, []);

    return (
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
            <h1>Verfügbare Aktien für Benutzer {id}</h1>

            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    margin: "20px 0",
                    alignItems: "center"
                }}
            >
                <button
                    onClick={() => navigate(`/home/${id}/watchlist`)}
                    style={{
                        padding: "8px 14px",
                        backgroundColor: "#3e7aff",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "14px"
                    }}
                >
                    Zur Watchlist
                </button>

                <input
                    type="text"
                    placeholder="Aktie suchen"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    style={{
                        padding: "10px",
                        flex: 1,
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        fontSize: "14px"
                    }}
                />

                <button
                    onClick={search}
                    style={{
                        padding: "8px 14px",
                        backgroundColor: "#4caf50",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "14px"
                    }}
                >
                    Suchen
                </button>
            </div>

            <ul
                style={{
                    listStyle: "none",
                    padding: 0,
                    marginTop: "20px",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                    gap: "18px"
                }}
            >
                {stocks.map(s => (
                    <li
                        key={s.id}
                        style={{
                            backgroundColor: "white",
                            padding: "16px",
                            border: "1px solid #e1e1e1",
                            borderRadius: "10px",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.06)",
                            transition: "transform 0.15s ease, box-shadow 0.15s ease",
                            display: "flex",
                            flexDirection: "column"
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = "translateY(-3px)";
                            e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.08)";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = "translateY(0px)";
                            e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.06)";
                        }}
                    >
                        <div style={{ marginBottom: "8px" }}>
                            <div style={{ fontSize: "20px", fontWeight: "600" }}>
                                {s.symbol}
                            </div>
                            <div style={{ fontSize: "14px", color: "#666", marginTop: "4px" }}>
                                {s.name}
                            </div>
                            <div style={{ fontSize: "13px", color: "#999", marginTop: "2px" }}>
                                Börse: {s.exchange}
                            </div>
                        </div>

                        <button
                            onClick={() => addToWatchlist(s)}
                            style={{
                                marginTop: "auto",
                                padding: "8px 12px",
                                backgroundColor: "#ff9800",
                                borderRadius: "6px",
                                border: "none",
                                color: "white",
                                cursor: "pointer",
                                fontSize: "14px"
                            }}
                        >
                            Zur Watchlist hinzufügen
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );

}
