import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function StockList() {

    const { id } = useParams();
    const [stocks, setStocks] = useState([]);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    async function loadAll() {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/stocks`, {
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
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/stocks/search?q=${query}`, {
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
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/watchlist/add`, {
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
        <div>
            <Navbar id={id} />

            <div
                style={{
                    maxWidth: "1000px",
                    margin: "40px auto",
                    padding: "30px",
                    backgroundColor: "white",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.12)"
                }}
            >
                <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
                    Verfügbare Aktien
                </h1>

                <div
                    style={{
                        display: "flex",
                        gap: "12px",
                        margin: "20px 0",
                        alignItems: "center"
                    }}
                >
                    <button
                        onClick={() => navigate(`/home/${id}/watchlist`)}
                        style={{
                            padding: "10px 16px",
                            backgroundColor: "#3e7aff",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "15px",
                            boxShadow: "0 3px 6px rgba(0,0,0,0.12)"
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.backgroundColor = "#2d62e0";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.backgroundColor = "#3e7aff";
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
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            fontSize: "15px"
                        }}
                    />

                    <button
                        onClick={search}
                        style={{
                            padding: "10px 18px",
                            backgroundColor: "#4caf50",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "15px",
                            boxShadow: "0 3px 6px rgba(0,0,0,0.12)"
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.backgroundColor = "#3d8c40";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.backgroundColor = "#4caf50";
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
                        gap: "20px"
                    }}
                >
                    {stocks.map(s => (
                        <li
                            key={s.id}
                            style={{
                                backgroundColor: "white",
                                padding: "18px",
                                border: "1px solid #e1e1e1",
                                borderRadius: "10px",
                                boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                                transition: "transform 0.15s, box-shadow 0.15s",
                                display: "flex",
                                flexDirection: "column"
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = "translateY(-4px)";
                                e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.10)";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.08)";
                            }}
                        >
                            <div style={{ marginBottom: "10px" }}>
                                <div style={{ fontSize: "22px", fontWeight: "600" }}>
                                    {s.symbol}
                                </div>
                                <div style={{ fontSize: "15px", color: "#555", marginTop: "4px" }}>
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
                                    padding: "10px 14px",
                                    backgroundColor: "#ff9800",
                                    borderRadius: "8px",
                                    border: "none",
                                    color: "white",
                                    cursor: "pointer",
                                    fontSize: "15px"
                                }}
                            >
                                Zur Watchlist hinzufügen
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
