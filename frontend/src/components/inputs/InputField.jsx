export default function InputField({
  name = "",
  type = "text",
  defaultValue = "",
  placeholderText = "Enter Something",
  required = false,
  disable = false,
  updaterFunction = () => {},
}) {
  return (
    <input
      type={type}
      name={name}
      defaultValue={defaultValue}
      onChange={updaterFunction}
      placeholder={placeholderText}
      required={required}
      disabled={disable}
      className="outline-none border px-5 py-1.5 rounded-full min-w-fit w-[300px] max-w-[300px] text-black"
    />
  );
}
