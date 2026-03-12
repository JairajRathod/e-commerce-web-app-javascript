export default function ValueSubBox({ color = "", icon = "", value = 0 }) {
  return (
    <span
      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-${color}-100 text-black`}
    >
      {icon}
      {value}
    </span>
  );
}
