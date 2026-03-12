import { Search } from "lucide-react";

export default function SearchBar({ searchTerm = "", onChange = () => {} }) {
  return (
    <div className="mb-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search users by name..."
          value={searchTerm}
          onChange={onChange}
          className="w-full outline-none pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-sm"
        />
      </div>
    </div>
  );
}
