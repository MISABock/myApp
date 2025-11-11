import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

export default function WatchList() {

    const { id } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadPrice = useCallback(async (symbol) => {
        try {
            const res = await fetch(`http://localhost:8080/api/price/${symbol}`, {
                credentials: "include"
            });

            return await res.json();

        } catch (err) {
            console.error("Preis konnte nicht geladen werden:", symbol);
            return null;
        }
    }, []);

    const loadWatchlist = useCallback(async () => {
        try {
            const res = await fetch(`http://localhost:8080/api/watchlist/${id}`, {
                credentials: "include"
            });

            const list = JSON.parse(await res.text());

            const listWithPrices = await Promise.all(
                list.map(async (item) => {
                    if (!item.stock) return { ...item, quote: null };

                    const quote = await loadPrice(item.stock.symbol);
                    return { ...item, quote };
                })
            );

            setItems(listWithPrices);
        } catch (err) {
            console.error("FEHLER Watchlist:", err);
        } finally {
            setLoading(false);
        }
    }, [id, loadPrice]);

    const deleteItem = useCallback(async (entryId) => {
        await fetch(`http://localhost:8080/api/watchlist/${entryId}`, {
            method: "DELETE",
            credentials: "include"
        });

        loadWatchlist();
    }, [loadWatchlist]);

    useEffect(() => {
        loadWatchlist();
    }, [loadWatchlist]);

    if (loading) {
        return <div style={{ padding: "20px" }}>Lade Watchlist...</div>;
    }

    return (
        <div>
            <Navbar id={id} />

            <div style={{ maxWidth: "1000px", margin: "40px auto", padding: "20px" }}>
                <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
                    Deine Watchlist
                </h1>

                {items.length === 0 && (
                    <div
                        style={{
                            padding: "14px",
                            backgroundColor: "#f4f4f4",
                            borderRadius: "8px",
                            textAlign: "center",
                            marginBottom: "20px"
                        }}
                    >
                        Keine Einträge in deiner Watchlist.
                    </div>
                )}

                {/* GRID statt Liste */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                        gap: "18px"
                    }}
                >
                    {items.map(item => (
                        <div
                            key={item.id}
                            style={{
                                backgroundColor: "#ffffff",
                                padding: "16px",
                                border: "1px solid #ddd",
                                borderRadius: "10px",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.07)",
                                display: "flex",
                                flexDirection: "column",
                                height: "100%",
                                transition: "0.15s",
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = "translateY(-3px)";
                                e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.12)";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.07)";
                            }}
                        >
                            <div style={{ fontSize: "18px", fontWeight: "600" }}>
                                {item.stock.symbol}
                            </div>

                            <div style={{ fontSize: "14px", color: "#555" }}>
                                {item.stock.name}, {item.stock.exchange}
                            </div>

                            <div style={{ marginTop: "12px" }}>
                                <div
                                    style={{
                                        display: "inline-block",
                                        padding: "4px 10px",
                                        borderRadius: "6px",
                                        backgroundColor: "#eef6ff",
                                        border: "1px solid #d0dfff",
                                        fontWeight: "bold",
                                        fontSize: "15px"
                                    }}
                                >
                                    {item.quote ? item.quote.current + " USD" : "Keine Daten"}
                                </div>

                                <div
                                    style={{
                                        marginTop: "6px",
                                        color: item.quote?.change >= 0 ? "green" : "red"
                                    }}
                                >
                                    {item.quote
                                        ? `${item.quote.change} USD (${item.quote.percentChange}%)`
                                        : ""}
                                </div>

                                <div style={{ marginTop: "10px" }}>
                                    <svg width="120" height="40">
                                        {item.historyPrices &&
                                            item.historyPrices.length > 1 &&
                                            item.historyPrices.map((p, i) => {
                                                const x = i * (120 / (item.historyPrices.length - 1));
                                                const y = 40 - p;
                                                const next = item.historyPrices[i + 1];
                                                if (!next) return null;
                                                const x2 = (i + 1) * (120 / (item.historyPrices.length - 1));
                                                const y2 = 40 - next;

                                                return (
                                                    <line
                                                        key={i}
                                                        x1={x}
                                                        y1={y}
                                                        x2={x2}
                                                        y2={y2}
                                                        stroke="#3e7aff"
                                                        strokeWidth="2"
                                                    />
                                                );
                                            })}
                                    </svg>
                                </div>
                            </div>

                            <button
                                onClick={() => deleteItem(item.id)}
                                style={{
                                    marginTop: "auto",
                                    padding: "8px 12px",
                                    backgroundColor: "#e74c3c",
                                    borderRadius: "6px",
                                    border: "none",
                                    color: "white",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    marginTop: "14px"
                                }}
                            >
                                Entfernen
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
