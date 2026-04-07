import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Brush,
  CartesianGrid,
} from "recharts";

const ForecastChart = ({ data, dataKey }) => {
  return (
    <div className="w-full overflow-x-auto">
      
      {/* Large width for scrolling */}
      <div className="min-w-225 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="time"
              tick={{ fontSize: 12 }}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey={dataKey}
              strokeWidth={2}
              dot={false}
            />

            {/* 🔥 ZOOM FEATURE */}
            <Brush
              dataKey="time"
              height={30}
              stroke="#8884d8"
            />

          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ForecastChart;