import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import "./App.css";

const sampleBTCData = [
  { time: "10:00", price: 65700 },
  { time: "10:30", price: 65850 },
  { time: "11:00", price: 65980 },
  { time: "11:30", price: 65790 },
  { time: "12:00", price: 66010 },
];

function App() {
  return (
    <div className="app">
      <h1 className="header">Trade Pulse</h1>

      {/* TradingView BTC/USDT Chart */}
      <div className="chart-container">
        <h2>BTC/USDT - Live TradingView Chart</h2>
        <iframe
          title="TradingView BTC Chart"
          src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_btc&symbol=BINANCE:BTCUSDT&interval=30&theme=dark&style=1&locale=en&utm_source=&utm_medium=widget&utm_campaign=chart&utm_term=BINANCE:BTCUSDT"
          width="100%"
          height="500"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>

      {/* Custom BTC Price Chart */}
      <div className="chart-container">
        <h2>Custom BTC Price Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sampleBTCData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#00bcd4" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default App;