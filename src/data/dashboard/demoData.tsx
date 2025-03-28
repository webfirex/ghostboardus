export type FlowAiData = {
    date: string;
    symbol: string;
    time: string;
    exp: string;
    strike: string;
    cp: "PUT" | "CALL";
    details: string;
    alert: string;
    high: string;
    last: string;
    gain: string;
};

export type ScannerData = {
  symbol: string;
  date: string;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  "1D": number;
};

export function generateRandomFlowAiData(): FlowAiData[] {
    const symbols = ["NVDA", "AAPL", "TSLA", "MSFT", "AMZN"];
    const trends = ["Bullish", "Bearish"];
    const types = ["Golden", "Silver", "Platinum"];
    const randomNumber = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1)) + min;
  
    return Array.from({ length: 20 }, () => ({
      date: `${randomNumber(1, 12)}/${randomNumber(1, 28)}/${2025}`, // Random date
      symbol: symbols[randomNumber(0, symbols.length - 1)], // Random symbol
      time: `${randomNumber(0, 23).toString().padStart(2, "0")}:${randomNumber(
        0,
        59
      )
        .toString()
        .padStart(2, "0")}`, // Random time
      exp: `${randomNumber(1, 12)}/${randomNumber(1, 28)}/${2025}`, // Random expiration date
      strike: `${randomNumber(100, 500)}${randomNumber(0, 1) === 0 ? "C" : "P"}`, // Strike price with C or P
      cp: randomNumber(0, 1) === 0 ? "CALL" : "PUT", // Random CALL or PUT
      details: trends[randomNumber(0, trends.length - 1)], // Random trend
      alert: `${randomNumber(1, 10)}M`, // Random alert value
      high: `$${randomNumber(100, 500)}`, // Random high value
      last: `$${randomNumber(100, 500)}`, // Random last value
      gain: `${randomNumber(-50, 50)}%`, // Random gain percentage
    }));
}

export function generateRandomScannerData(): ScannerData[] {
  const symbols = ["NVDA", "AAPL", "TSLA", "MSFT", "AMZN", "CSCO"];
  const randomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  return Array.from({ length: 20 }, () => ({
    date: new Date(2025, randomNumber(0, 11), randomNumber(1, 28), randomNumber(0, 23), randomNumber(0, 59)).toISOString(), // Random date and time in ISO format
    symbol: symbols[randomNumber(0, symbols.length - 1)], // Random symbol
    open: parseFloat((randomNumber(5000, 7000) / 100).toFixed(2)), // Random opening price
    close: parseFloat((randomNumber(5000, 7000) / 100).toFixed(2)), // Random closing price
    high: parseFloat((randomNumber(5000, 7000) / 100).toFixed(2)), // Random high price
    low: parseFloat((randomNumber(5000, 7000) / 100).toFixed(2)), // Random low price
    volume: randomNumber(1000000, 5000000), // Random trading volume
    "1D": parseFloat(((randomNumber(-100, 100) / 100)).toFixed(3)), // Random 1-day percentage change
  }));
}