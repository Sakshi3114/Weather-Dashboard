import { Search, Bell, Settings } from "lucide-react";

const Header = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      
      <div className="relative w-96">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Reykjavik, IS"
          className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl outline-none"
        />
      </div>

      <div className="flex items-center gap-4">
        <Bell className="text-gray-500 cursor-pointer" />
        <Settings className="text-gray-500 cursor-pointer" />
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
      </div>
    </div>
  );
};

export default Header;