import { cardColors } from "../constant.js";

export default function StatsCard({
  title = "",
  value = 0,
  icon = "",
  color = "",
}) {
  return (
    <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Background Pattern */}
      <div className={`absolute inset-0 bg-${color}-50 opacity-50`}></div>

      {/* Content */}
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`p-4 rounded-xl ${cardColors[color]} text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
          >
            <div className="text-2xl">{icon}</div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            {title}
          </h3>
          <p className="text-3xl font-bold text-gray-800 ">{value}</p>
        </div>
      </div>

      {/* Decorative Element */}
      <div
        className={`absolute -right-4 -bottom-4 w-24 h-24 bg-linear-to-br from-${color}-500 to-${color}-600 opacity-10 rounded-full transform group-hover:scale-150 transition-transform duration-500`}
      ></div>
    </div>
  );
}
