import React, { useState } from 'react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState("nifty");

  const renderChart = () => {
    if (activeTab === "nifty") {
      return (
        <div className="chart-container">
          <iframe 
            title="Nifty 50 Chart"
            src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_0f7b9&symbol=NSE:NIFTY_50&interval=D&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=[]&theme=Dark&style=1&timezone=Asia%2FKolkata" 
            width="100%" 
            height="400" 
            frameBorder="0" 
            allowTransparency="true" 
            scrolling="no">
          </iframe>
        </div>
      );
    } else if (activeTab === "btc") {
      return (
        <div className="chart-container">
          <iframe 
            title="Bitcoin Chart"
            src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_7ea2f&symbol=BINANCE:BTCUSDT&interval=D&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=[]&theme=Dark&style=1&timezone=America%2FNew_York" 
            width="100%" 
            height="400" 
            frameBorder="0" 
            allowTransparency="true" 
            scrolling="no">
          </iframe>
        </div>
      );
    } else if (activeTab === "dow") {
      return (
        <div className="chart-container">
          <iframe 
            title="Dow Jones Chart"
            src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_fea3c&symbol=INDEXDJX:.DJI&interval=D&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=[]&theme=Dark&style=1&timezone=America%2FNew_York" 
            width="100%" 
            height="400" 
            frameBorder="0" 
            allowTransparency="true" 
            scrolling="no">
          </iframe>
        </div>
      );
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Trade Pulse</h1>
        <nav>
          <button className={activeTab==="nifty" ? "active" : ""} onClick={()=> setActiveTab("nifty")}>
            Nifty 50
          </button>
          <button className={activeTab==="btc" ? "active" : ""} onClick={()=> setActiveTab("btc")}>
            BTC/USDT
          </button>
          <button className={activeTab==="dow" ? "active" : ""} onClick={()=> setActiveTab("dow")}>
            Dow Jones
          </button>
        </nav>
      </header>
      <main>
        {renderChart()}
      </main>
    </div>
  );
}

export default App;
