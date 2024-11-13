// fetchStockData.ts
export async function fetchStockData(symbol: string = 'GOOGL') {
  try {
    const response = await fetch(`http://localhost:5000/fetchStockData/${symbol}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return {
      current: data.current || {},
      previous: data.previous || {},
      history: data.history || []
    };
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return {
      current: {},
      previous: {},
      history: []
    };
  }
}
