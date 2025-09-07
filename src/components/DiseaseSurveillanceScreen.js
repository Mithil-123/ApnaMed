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

  // Prepare chart data safely
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

  console.log("chartData", chartData); // Debugging
  console.log("diseaseData", diseaseData); // Debugging

  const colors = [
    "#3b82f6",
    "#ef4444",
    "#10b981",
    "#8b5cf6",
    "#f59e0b",
    "#ec4899",
    "#6b7280",
    "#14b8a6",
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

          {/* Chart section with fixed height */}
          <div className="flex-1 h-[500px]">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 40, right: 40, left: 40, bottom: 40 }}
                >
                  <CartesianGrid strokeDasharray="2 2" stroke="#f8fafc" />
                  <XAxis
                    dataKey="month"
                    fontSize={14}
                    fontWeight="600"
                    stroke="#334155"
                    axisLine={{ stroke: "#e2e8f0" }}
                    tickLine={{ stroke: "#e2e8f0" }}
                  />
                  <YAxis
                    fontSize={14}
                    fontWeight="600"
                    stroke="#334155"
                    axisLine={{ stroke: "#e2e8f0" }}
                    tickLine={{ stroke: "#e2e8f0" }}
                    label={{
                      value: "Rate (%)",
                      angle: -90,
                      position: "insideLeft",
                      style: {
                        textAnchor: "middle",
                        fontSize: "14px",
                        fontWeight: "600",
                      },
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                      boxShadow: "0 10px 25px -3px rgba(0, 0, 0, 0.1)",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                    formatter={(value, name) => {
                      if (name.includes("_current")) {
                        const disease = name.replace("_current", "");
                        return [`${value}%`, `${disease} (Sep 2025)`];
                      }
                      return [`${value}%`, name];
                    }}
                    labelStyle={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#1f2937",
                    }}
                  />
                  <Legend
                    wrapperStyle={{
                      paddingTop: "30px",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                    iconType="line"
                  />

                  {/* Historical disease lines */}
                  {diseaseData &&
                    Object.keys(diseaseData.current).map((disease, index) => {
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
                          dot={{
                            fill: color,
                            strokeWidth: 2,
                            stroke: "#fff",
                            r: 5,
                          }}
                          activeDot={{
                            r: 8,
                            stroke: color,
                            strokeWidth: 3,
                            fill: "#fff",
                          }}
                          connectNulls={false}
                        />
                      );
                    })}

                  {/* Current data points */}
                  {diseaseData &&
                    Object.keys(diseaseData.current).map((disease, index) => {
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
                          strokeWidth={0}
                          dot={{
                            fill: color,
                            strokeWidth: 4,
                            stroke: "#fff",
                            r: 10,
                            filter: "drop-shadow(0px 4px 8px rgba(0,0,0,0.15))",
                          }}
                          activeDot={{
                            r: 12,
                            stroke: color,
                            strokeWidth: 4,
                            fill: "#fff",
                          }}
                          connectNulls={false}
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
