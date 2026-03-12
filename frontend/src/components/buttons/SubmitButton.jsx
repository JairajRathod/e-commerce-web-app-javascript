export default function SubmitButton({
  text = "",
  buttonType = "submit",
  bgColor = "blue",
  textColor = "white",
}) {
  return (
    <button
      className={`bg-${bgColor}-500 text-${textColor} text-xl px-5 py-1 rounded-full`}
      type={buttonType}
    >
      {text}
    </button>
  );
}
