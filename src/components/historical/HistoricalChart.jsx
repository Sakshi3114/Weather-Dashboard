import {
    LineChart,
    Line,
    XAxis,
    Tooltip,
    CartesianGrid,
    Brush,
  } from "recharts";
  
  const colors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b"];
  
  const HistoricalChart = ({ title, data, lines }) => {
    const chartWidth = Math.max(data?.length * 20, 800);
  
    return (
      <div className="bg-white p-6 rounded-2xl">
        
        <p className="text-sm text-gray-500 mb-4">{title}</p>
  
        <div className="overflow-x-auto">
          <div style={{ width: chartWidth, height: 300 }}>
            
            <LineChart width={chartWidth} height={300} data={data}>
              
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" hide />
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
  
              <Brush dataKey="date" height={30} />
  
            </LineChart>
  
          </div>
        </div>
      </div>
    );
  };
  
  export default HistoricalChart;