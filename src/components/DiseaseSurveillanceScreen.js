import React, { useState, useEffect } from "react";
import { checkDiseaseWarnings, getDiseaseData } from "../data/mockData";
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

const DiseaseSurveillanceScreen = ({ onBack }) => {
  const [warnings, setWarnings] = useState([]);
  const [diseaseData, setDiseaseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSurveillanceData();
    const interval = setInterval(loadWarnings, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadSurveillanceData = async () => {
    try {
      setLoading(true);
      const [warningsData, diseaseInfo] = await Promise.all([
        checkDiseaseWarnings(),
        getDiseaseData(),
      ]);
      setWarnings(warningsData);
      setDiseaseData(diseaseInfo);
    } catch (error) {
      console.error("Error loading surveillance data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadWarnings = async () => {
    try {
      const warningsData = await checkDiseaseWarnings();
      setWarnings(warningsData);
    } catch (error) {
      console.error("Error loading warnings:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-4 mx-auto"></div>
          <p className="text-gray-600 text-lg">Loading surveillance data...</p>
        </div>
      </div>
    );
  }

  // Transform data into chart format
  const chartData = diseaseData
    ? Object.keys(diseaseData.historical).map((month) => {
        const data = { month };
        Object.keys(diseaseData.current).forEach((disease) => {
          const histVal = diseaseData.historical[month]?.[disease];
          data[disease] = histVal ? parseFloat((histVal * 100).toFixed(1)) : 0;
          if (month === "Sep") {
            const currVal = diseaseData.current[disease];
            data[`${disease}_current`] = currVal
              ? parseFloat((currVal * 100).toFixed(1))
              : 0;
          }
        });
        return data;
      })
    : [];

  const colors = [
    "#3b82f6", // blue
    "#ef4444", // red
    "#10b981", // green
    "#8b5cf6", // purple
    "#f59e0b", // amber
    "#ec4899", // pink
    "#6b7280", // gray
    "#14b8a6", // teal
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full h-screen p-8">
        <div className="h-full flex flex-col">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Monthly Disease Trends
            </h2>
            <p className="text-lg text-gray-600">
              2025 Data with Current September Values
            </p>
          </div>

          {/* Chart section */}
          <div style={{ height: 500 }}>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 40, right: 40, left: 40, bottom: 40 }}
                >
                  <CartesianGrid strokeDasharray="2 2" stroke="#f8fafc" />
                  <XAxis dataKey="month" />
                  <YAxis
                    label={{
                      value: "Rate (%)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip
                    formatter={(value, name) => {
                      if (name.includes("_current")) {
                        const disease = name.replace("_current", "");
                        return [`${value}%`, `${disease} (Sep 2025)`];
                      }
                      return [`${value}%`, name];
                    }}
                  />
                  <Legend />

                  {/* Historical lines */}
                  {Object.keys(diseaseData.current).map((disease, index) => {
                    const isWarning = warnings.some(
                      (w) => w.disease === disease,
                    );
                    const color = isWarning
                      ? "#ef4444"
                      : colors[index % colors.length];
                    return (
                      <Line
                        key={disease}
                        type="monotone"
                        dataKey={disease}
                        stroke={color}
                        strokeWidth={isWarning ? 3 : 2}
                        dot={false}
                      />
                    );
                  })}

                  {/* Current snapshot dots */}
                  {Object.keys(diseaseData.current).map((disease, index) => {
                    const isWarning = warnings.some(
                      (w) => w.disease === disease,
                    );
                    const color = isWarning
                      ? "#ef4444"
                      : colors[index % colors.length];
                    return (
                      <Line
                        key={`${disease}_current`}
                        type="monotone"
                        dataKey={`${disease}_current`}
                        stroke="transparent"
                        dot={{
                          fill: color,
                          strokeWidth: 4,
                          stroke: "#fff",
                          r: 10,
                        }}
                      />
                    );
                  })}
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 text-lg">Loading chart data...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseSurveillanceScreen;
