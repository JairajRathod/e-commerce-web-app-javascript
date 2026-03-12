import TextField from "@mui/material/TextField";

export default function InputFieldSecond({
  label = "",
  name = "",
  type = "text",
  maxLength = Infinity,
  onInput = () => {},
  defaultValue = "",
  placeholderText = "Enter Something",
  required = false,
  disable = false,
  updaterFunction = () => {},
}) {
  return (
    <div>
      <TextField
        label={name}
        variant="outlined"
        fullWidth
        size="medium"
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholderText}
        required={required}
        disabled={disable}
        onChange={updaterFunction}
        onInput={onInput}
        inputProps={{
          maxLength: maxLength, // limit input characters
        }}
      />
    </div>
  );
}
