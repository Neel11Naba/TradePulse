import React, { useState } from 'react';

const symbols = {
  NIFTY: "NSE:NIFTY",
  BTC: "BINANCE:BTCUSDT",
  DOW: "DJI"
};

const App = () => {
  const [selectedSymbol, setSelectedSymbol] = useState(symbols.NIFTY);

  const chartUrl = `https://s.tradingview.com/widgetembed/?frameElementId=tradingview_${selectedSymbol}&symbol=${selectedSymbol}&interval=60&theme=light&style=1&timezone=Asia/Kolkata&hide_top_toolbar=false&hide_side_toolbar=false&allow_symbol_change=false&save_image=false&studies=[]&toolbar_bg=F1F3F6&withdateranges=true&autosize=true`;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#f4f4f4", minHeight: "100vh", padding: "10px" }}>
      <header style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        <button
          onClick={() => setSelectedSymbol(symbols.NIFTY)}
          style={buttonStyle(selectedSymbol === symbols.NIFTY)}
        >
          Nifty 50
        </button>
        <button
          onClick={() => setSelectedSymbol(symbols.BTC)}
          style={buttonStyle(selectedSymbol === symbols.BTC)}
        >
          BTC/USDT
        </button>
        <button
          onClick={() => setSelectedSymbol(symbols.DOW)}
          style={buttonStyle(selectedSymbol === symbols.DOW)}
        >
          Dow Jones
        </button>
      </header>

      <div style={{ position: "relative", height: "75vh", width: "100%", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
        <iframe
          title="TradingView Chart"
          src={chartUrl}
          frameBorder="0"
          allowTransparency="true"
          scrolling="no"
          allowFullScreen
          style={{ width: "100%", height: "100%", borderRadius: "10px" }}
        ></iframe>
      </div>
    </div>
  );
};

const buttonStyle = (isActive) => ({
  padding: "10px 20px",
  backgroundColor: isActive ? "#0d6efd" : "#ffffff",
  color: isActive ? "#ffffff" : "#000000",
  border: "1px solid #ccc",
  borderRadius: "5px",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.3s"
});

export default App;
