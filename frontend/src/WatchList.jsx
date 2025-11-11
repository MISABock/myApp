import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

export default function WatchList() {

    const { id } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadPrice = useCallback(async (symbol) => {
        try {
            const res = await fetch(`http://localhost:8080/api/price/${symbol}`, {
                credentials: "include"
            });

                const json = await res.json();
                return json; // ganzes Quote-Objekt!


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

            const text = await res.text();
            const list = JSON.parse(text);

            const listWithPrices = await Promise.all(
                list.map(async (item) => {

                    if (!item.stock) {
                        console.error("Fehler: Watchlist-Eintrag ohne Stock:", item);
                        return { ...item, quote: null };
                    }

                    const quote = await loadPrice(item.stock.symbol);

                    return {
                        ...item,
                        quote: quote
                    };

                })
            );

            setItems(listWithPrices);
            setLoading(false);

        } catch (err) {
            console.error("FEHLER Watchlist:", err);
        }
    }, [id, loadPrice]);

    // Delete-Funktion
    const deleteItem = useCallback(async (entryId) => {

        await fetch(`http://localhost:8080/api/watchlist/${entryId}`, {
            method: "DELETE",
            credentials: "include"
        });

        loadWatchlist(); // Liste neu laden

    }, [loadWatchlist]);

    useEffect(() => {
        loadWatchlist();
    }, [loadWatchlist]);

    if (loading) {
        return <div>Lade Watchlist...</div>;
    }

 return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1>Deine Watchlist für Benutzer {id}</h1>

        {items.length === 0 && (
            <div style={{
                padding: "12px",
                backgroundColor: "#f0f0f0",
                borderRadius: "6px",
                marginTop: "20px"
            }}>
                Keine Einträge in deiner Watchlist.
            </div>
        )}

        <ul style={{
            listStyle: "none",
            padding: 0,
            margin: "20px 0"
        }}>
            {items.map(item => (
                <li
                    key={item.id}
                    style={{
                        padding: "14px",
                        marginBottom: "12px",
                        backgroundColor: "#fafafa",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
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
                            {item.quote ? item.quote.current  + " USD" : "Keine Daten"}
                        </div>
                        <div style={{ marginTop: "6px", color: item.quote?.change >= 0 ? "green" : "red" }}>
                            {item.quote ? `${item.quote.change} USD (${item.quote.percentChange}%)` : ""}
                        </div>

                        <div style={{ marginTop: "8px" }}>
                            <svg width="120" height="40">
                                {item.historyPrices && item.historyPrices.length > 1 &&
                                    item.historyPrices.map((p, i) => {
                                        const x = i * (120 / (item.historyPrices.length - 1));
                                        const y = 40 - p;
                                        const next = item.historyPrices[i + 1];
                                        if (next == null) return null;
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
                                    })
                                }
                            </svg>
                        </div>
                    </div>

                    <button
                        onClick={() => deleteItem(item.id)}
                        style={{
                            marginTop: "10px",
                            padding: "8px 12px",
                            borderRadius: "6px",
                            border: "1px solid #c0392b",
                            backgroundColor: "#e74c3c",
                            color: "white",
                            cursor: "pointer",
                            fontSize: "14px"
                        }}
                    >
                        Entfernen
                    </button>
                </li>
            ))}
        </ul>
    </div>
);

}
