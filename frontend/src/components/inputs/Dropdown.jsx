export default function Dropdown({
  name = "",
  defaultValue = "",
  required = false,
  updaterFunction = () => {},
  values = [],
  style = "",
}) {
  return (
    <select
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 outline-none`}
      name={name}
      defaultValue={defaultValue}
      required={required}
      onChange={updaterFunction}
    >
      {values.map((value, index) => {
        return (
          <option value={value} key={index}>
            {value}
          </option>
        );
      })}
    </select>
  );
}
