import { Users } from "lucide-react";
import React from "react";

function EmptyTable({ heading = "", description = "", icon = "" }) {
  return (
    <td colSpan={5} className="px-6 py-12 text-center">
      <div className="flex flex-col items-center justify-center text-gray-400">
        <Users className="w-12 h-12 mb-3 opacity-50" />
        <p className="text-lg font-medium">{heading}</p>
      </div>
    </td>
  );
}

export default EmptyTable;
