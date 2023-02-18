import { TextField } from "@mui/material";
import React from "react";

function NumericInput({label, name, value, onChangeFn}) {
  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    onChangeFn(name, value);
  };

  const handlePaste = (event) => {
    const paste = event.clipboardData.getData("text/plain");
    if (!isNaN(paste)) {
      event.preventDefault();
      const value = parseInt(paste, 10);
      onChangeFn(name, value);
    }
  };

  return (
    <TextField
      id="outlined-basic"
      label={label}
      variant="outlined"
      type="number"
      inputMode="numeric"
      name={name}
      value={value}
      onChange={handleChange}
      onPaste={handlePaste}
    />
  );
}

export default NumericInput;
