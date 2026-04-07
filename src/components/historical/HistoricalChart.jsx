import {
    LineChart,
    Line,
    XAxis,
    Tooltip,
    CartesianGrid,
    Brush,
    ResponsiveContainer,
  } from "recharts";
  
  const colors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b"];
  
  const HistoricalChart = ({ title, data, lines }) => {
    const chartWidth = Math.max(data?.length * 30, 600);
  
    return (
      <div className="bg-white p-4 md:p-6 rounded-2xl">
        
        <p className="text-sm text-gray-500 mb-4">{title}</p>
  
        {/* ONLY chart scrolls */}
        <div className="w-full overflow-x-auto">
          
          <div style={{ width: chartWidth, height: 280 }}>
            
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                
                <CartesianGrid strokeDasharray="3 3" />
  
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10 }}
                  minTickGap={20}
                />
  
                <Tooltip />
  
                {lines.map((key, index) => (
                  <Line
                    key={key}
                    dataKey={key}
                    stroke={colors[index]}
                    dot={false}
                    strokeWidth={2}
                  />
                ))}
  
                {/* Zoom */}
                <Brush dataKey="date" height={25} />
              </LineChart>
            </ResponsiveContainer>
  
          </div>
        </div>
      </div>
    );
  };
  
  export default HistoricalChart;