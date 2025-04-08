import React, { useEffect, useRef } from 'react';

const TradingViewWidget = ({ symbol }) => {
  const containerRef = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      new window.TradingView.widget({
        autosize: true,
        symbol: symbol,
        interval: "D",
        timezone: "Asia/Kolkata",
        theme: "dark",
        style: "1",
        locale: "en",
        container_id: containerRef.current.id
      });
    };

    containerRef.current.appendChild(script);
  }, [symbol]);

  return <div id="tradingview_widget" ref={containerRef} style={{ height: "400px", width: "100%" }} />;
};

export default TradingViewWidget;