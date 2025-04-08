import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

const CustomChart = ({ data }) => {
  const chartContainerRef = useRef();

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        background: { color: "#1e1e1e" },
        textColor: "#d1d4dc",
      },
      grid: {
        vertLines: { color: "#2B2B43" },
        horzLines: { color: "#363C4E" },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const candleSeries = chart.addCandlestickSeries();

    // Format FII/DII based candles
    const formattedData = data.map((item) => {
      let color = item.color;
      if (item.fii === "buy") {
        color = "#007bff"; // Blue
      } else if (item.fii === "sell") {
        color = "#000000"; // Black
      }

      return {
        time: item.time,
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
        color,
        borderColor: color,
        wickColor: color,
      };
    });

    candleSeries.setData(formattedData);

    return () => chart.remove();
  }, [data]);

  return <div ref={chartContainerRef} />;
};

export default CustomChart;