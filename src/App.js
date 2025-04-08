import React, { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  CartesianGrid
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
            fill:
              activity === 'whaleBuy'
                ? 'blue'
                : activity === 'whaleSell'
                ? 'black'
                : '#00C49F',
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

  return (
    <div className="App" style={{ backgroundColor: '#111', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      <h2>BTC Whale Activity Chart</h2>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={btcData}>
          <CartesianGrid stroke="#333" />
          <XAxis dataKey="name" hide />
          <YAxis stroke="#fff" />
          <Tooltip
            contentStyle={{ backgroundColor: '#222', border: 'none' }}
            labelStyle={{ color: '#ccc' }}
            formatter={(value) => [`$${value.toFixed(2)}`, 'Price']}
          />
          <Bar dataKey="price" barSize={4} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default App;