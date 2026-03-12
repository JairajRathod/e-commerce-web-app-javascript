import { Trash2 } from "lucide-react";

export function NameColumn({ name = "" }) {
  return (
    <div className="flex items-center">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold mr-3">
        {name.charAt(0).toUpperCase()}
      </div>
      <span className="text-sm font-semibold text-gray-900">{name}</span>
    </div>
  );
}

export function CountColumn({ color = "", icon = "", value = 0 }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-${color}-100 text-${color}-700`}
    >
      {icon}
      {value}
    </span>
  );
}

export function DeleteButton({ onClick = () => {} }) {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onClick}
        className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition duration-200 flex items-center"
      >
        <Trash2 className="w-3 h-3 mr-1" />
        Delete
      </button>
    </div>
  );
}

export default { NameColumn, CountColumn, DeleteButton };
