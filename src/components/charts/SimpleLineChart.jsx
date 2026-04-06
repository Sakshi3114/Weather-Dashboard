import {
    LineChart,
    Line,
    XAxis,
    Tooltip,
    CartesianGrid,
    Brush,
  } from "recharts";
  
  const ScrollableLineChart = ({ data, dataKey, color = "#3b82f6" }) => {
    const chartWidth = Math.max(data?.length * 60, 800);
  
    return (
      <div className="w-full">
        
        <div className="overflow-x-auto">
          <div style={{ width: chartWidth, height: 300 }}>
            
            <LineChart width={chartWidth} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <Tooltip />
  
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={2}
                dot={false}
              />
  
              <Brush dataKey="time" height={30} />
            </LineChart>
  
          </div>
        </div>
  
      </div>
    );
  };
  
  export default ScrollableLineChart;