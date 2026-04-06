import { Home, Clock } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="w-64 bg-white border-r px-6 py-6 flex flex-col justify-between">
      
      {/* Top */}
      <div>
        <h1 className="text-xl font-bold text-blue-900 mb-8">
          PRECISIONIST
        </h1>

        <div className="space-y-3">
          <div className={`flex items-center gap-3 text-gray-500 p-3 rounded-xl hover:bg-gray-100 cursor-pointer ${
              location.pathname === "/"
                ? "bg-blue-50 text-blue-900"
                : "text-gray-600 hover:bg-gray-100"
            }`}>
            <Home size={18} color="#1e3a8a" />
            <button
            onClick={() => navigate("/")}
            className={`p-2 rounded-lg text-left ${
              location.pathname === "/"
                ? "bg-blue-50 text-blue-900"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >Current & Hourly </button>
          </div>

          <div className={`flex items-center gap-3 text-gray-500 p-3 rounded-xl hover:bg-gray-100 cursor-pointer ${
              location.pathname === "/historical"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}>
            <Clock size={18} color="#1e3a8a" />
            <button
            onClick={() => navigate("/historical")}
            className={`p-2 rounded-lg text-left `}
          >
            Historical Analysis
          </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div>
        <button className="w-full bg-blue-900 text-white py-2 rounded-xl text-sm font-medium">
          Upgrade to Pro
        </button>

        <div className="text-xs text-gray-400 mt-4 space-y-1">
          <p>Help</p>
          <p>Privacy</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;