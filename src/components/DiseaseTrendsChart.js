import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getChartData } from "../mockData"; // adjust path if needed

const DiseaseTrendsChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const data = getChartData();
    console.log("Chart Data:", data); // 🔎 Debug
    setChartData(data);
  }, []);

  return (
    <div style={{ width: "100%", height: 500 }}>
      <h2 className="text-xl font-bold mb-4">📈 Disease Trends</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(v) => `${(v * 100).toFixed(1)}%`} />
          <Tooltip
            formatter={(value) => `${(value * 100).toFixed(2)}%`}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Legend />
          <Line type="monotone" dataKey="Dengue" stroke="#FF0000" />
          <Line type="monotone" dataKey="Malaria" stroke="#00AA00" />
          <Line type="monotone" dataKey="Diarrheal Diseases" stroke="#0000FF" />
          <Line type="monotone" dataKey="Typhoid" stroke="#FFA500" />
          <Line type="monotone" dataKey="Skin Infections" stroke="#800080" />
          <Line type="monotone" dataKey="Hypertension" stroke="#008080" />
          <Line
            type="monotone"
            dataKey="Respiratory Illness"
            stroke="#FF1493"
          />
          <Line type="monotone" dataKey="Cancer" stroke="#000000" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DiseaseTrendsChart;
