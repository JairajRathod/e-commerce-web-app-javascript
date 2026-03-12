export default function DropdownSecond({
  label,
  options,
  name = "",
  defaultValue = "",
  required = false,
  updaterFunction = () => {},
  style = "",
}) {
  return (
    <div>
      <label className="hidden md:block mb-1 font-medium">{label}</label>
      <select
        name=""
        defaultValue={defaultValue}
        required={required}
        onChange={updaterFunction}
        className="w-full md:w-[300px] px-3 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
