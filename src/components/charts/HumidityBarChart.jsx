import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  CartesianGrid,
  Brush,
} from "recharts";

const HumidityBarChart = ({ data }) => {
  const chartWidth = Math.max(data?.length * 60, 800);

  return (
    <div className="w-full">
      
      {/* ONLY chart scrolls */}
      <div className="overflow-x-auto">
        <div style={{ width: chartWidth, height: 300 }}>
          
          <BarChart width={chartWidth} height={300} data={data} fill="#1e3a8a">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <Tooltip />
            <Bar dataKey="humidity" radius={[6, 6, 0, 0]} />
            <Brush dataKey="time" height={30} />
          </BarChart>

        </div>
      </div>

    </div>
  );
};

export default HumidityBarChart;