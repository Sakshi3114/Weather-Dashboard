import { Home, Clock, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {/* Overlay (Mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed md:static z-50 top-0 left-0 ${isOpen ? "h-full": ""} w-64 bg-white border-r px-6 py-6 flex flex-col justify-between
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        {/* Close button (mobile) */}
        <div>
        <div className="md:hidden flex justify-end mb-4">
          <X onClick={() => setIsOpen(false)} className="cursor-pointer" />
        </div>

        {/* Top */}
        <div>
        </div>
        
          <h1 className="text-xl font-bold text-blue-900 mb-8">
            PRECISIONIST
          </h1>

          <div className="space-y-3">
            <div
              onClick={() => {
                navigate("/");
                setIsOpen(false);
              }}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer ${
                location.pathname === "/"
                  ? "bg-blue-50 text-blue-900"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Home size={18} />
              Current & Hourly
            </div>

            <div
              onClick={() => {
                navigate("/historical");
                setIsOpen(false);
              }}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer ${
                location.pathname === "/historical"
                  ? "bg-blue-50 text-blue-900"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Clock size={18} />
              Historical Analysis
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div>
          <button className="w-full bg-blue-900 text-white py-2 rounded-xl text-sm">
            Upgrade to Pro
          </button>

          <div className="text-xs text-gray-400 mt-4">
            <p>Help</p>
            <p>Privacy</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;