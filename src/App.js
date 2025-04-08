import React, { useState } from "react";
import TradingViewWidget from "./components/TradingViewWidget";
import CustomChart from "./components/CustomChart";
import "./App.css";

const App = () => {
  const [symbol, setSymbol] = useState("NSE:NIFTY");

  const chartData = [
    {
      time: 1640995200,
      open: 17200,
      high: 17350,
      low: 17150,
      close: 17300,
      fii: "buy",
    },
    {
      time: 1641081600,
      open: 17300,
      high: 17400,
      low: 17200,
      close: 17250,
      fii: "sell",
    },
    {
      time: 1641168000,
      open: 17250,
      high: 17300,
      low: 17100,
      close: 17150,
    },
  ];

  return (
    <div className="App" style={{ backgroundColor: "#121212", color: "white", padding: "20px" }}>
      <h1>Trade Pulse</h1>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
        <button onClick={() => setSymbol("NSE:NIFTY")}>Nifty 50</button>
        <button onClick={() => setSymbol("BINANCE:BTCUSDT")}>BTC/USDT</button>
        <button onClick={() => setSymbol("FOREXCOM:DJI")}>Dow Jones</button>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <TradingViewWidget symbol={symbol} />
      </div>

      <h2 style={{ textAlign: "center" }}>Custom Chart with FII/DII Highlights</h2>
      <CustomChart data={chartData} />
    </div>
  );
};

export default App;