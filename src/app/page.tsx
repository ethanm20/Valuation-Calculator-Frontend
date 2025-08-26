"use client";

import { useState } from "react";
import { fetchStockData } from "./features/StockData/fetchStockData";
import { StockData } from "./types/stock";

export default function Home() {
  const [symbol, setSymbol] = useState("");
  const [stock, setStock] = useState<StockData | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await fetchStockData(symbol);
    if (!data) {
      setError("Stock not found.");
      setStock(null);
    } else {
      setError("");
      setStock(data);
    }
  };

  const calculateValuation = (stock: StockData) => {
    return stock.earningsPerShare * stock.peRatio;
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Valuation Calculator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter stock symbol (e.g., AAPL)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          required
        />
        <button type="submit">Check Valuation</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {stock && (
        <div style={{ marginTop: "2rem" }}>
          <h2>{stock.symbol}</h2>
          <p>EPS: ${stock.earningsPerShare}</p>
          <p>P/E Ratio: {stock.peRatio}</p>
          <p>
            <strong>Estimated Valuation:</strong> ${calculateValuation(stock).toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
}
