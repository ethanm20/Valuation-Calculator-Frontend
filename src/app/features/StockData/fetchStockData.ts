import { StockData } from "../../types/stock";

export async function fetchStockData(symbol: string): Promise<StockData | null> {
  // Mock data for demonstration
  const mockData: Record<string, StockData> = {
    AAPL: { symbol: "AAPL", earningsPerShare: 6.00, peRatio: 28 },
    MSFT: { symbol: "MSFT", earningsPerShare: 8.50, peRatio: 32 },
    GOOGL: { symbol: "GOOGL", earningsPerShare: 5.10, peRatio: 25 },
  };

  return mockData[symbol.toUpperCase()] || null;
}
