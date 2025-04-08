import React, { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Line,
  CartesianGrid,
  ReferenceLine
} from 'recharts';
import './App.css';

const App = () => {
  const [btcData, setBtcData] = useState([]);

  useEffect(() => {
    const fetchBTC = async () => {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1&interval=minute');
        const data = await res.json();
        const prices = data.prices;
        const chartData = prices.map((entry, index) => {
          const [timestamp, price] = entry;
          const date = new Date(timestamp).toLocaleTimeString();
          return {
            name: date,
            price,
            index
          };
        });

        const withWhaleColor = chartData.map((item, index, arr) => {
          const prev = arr[index - 1];
          let activity = 'normal';
          if (prev) {
            const change = item.price - prev.price;
            if (Math.abs(change) > 100) {
              activity = change > 0 ? 'whaleBuy' : 'whaleSell';
            }
          }
          return {
            ...item,
            activity
          };
        });

        setBtcData(withWhaleColor);
      } catch (err) {
        console.error('BTC Fetch Error:', err);
      }
    };

    fetchBTC();
    const interval = setInterval(fetchBTC, 60000);
    return () => clearInterval(interval);
  }, []);

  const getBarColor = (activity) => {
    switch (activity) {
      case 'whaleBuy':
        return 'blue';
      case 'whaleSell':
        return 'black';
      default:
        return '#00C49F';
    }
  };

  return (
    <div className="App" style={{ backgroundColor: '#111', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      <h2>BTC Whale Activity Chart</h2>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={btcData}>
          <CartesianGrid stroke="#333" />
          <XAxis dataKey="name" hide />
          <YAxis domain={['auto', 'auto']} stroke="#fff" />
          <Tooltip
            contentStyle={{ backgroundColor: '#222', border: 'none' }}
            labelStyle={{ color: '#ccc' }}
            formatter={(value) => [`$${value.toFixed(2)}`, 'Price']}
          />
          <Bar
            dataKey="price"
            barSize={4}
            fill="#00C49F"
            shape={(props) => {
              const { x, y, width, height, payload } = props;
              return (
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill={getBarColor(payload.activity)}
                />
              );
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default App;