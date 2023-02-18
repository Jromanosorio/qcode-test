import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import "./App.css";
import Error from "./components/error";
import TableItems from "./components/table";
import NumericInput from "./components/numericInput";

function App() {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("info")));

  const [form, setForm] = useState({
    valor: "",
    selected: 0,
    trm: "",
  });

  const [errors, setErrors] = useState({
    valor: "",
    selected: "",
    trm: "",
  });

  const handleChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = Object.values(form).every((value) => value);

    if (isValid) {
      const response = await fetch("https://httpbin.org/post", {
        method: "POST",
        body: JSON.stringify({
          valor: form.valor,
          selected: form.selected,
          trm: form.trm,
        }),
      });

      const data = await response.json();
      let info = JSON.parse(localStorage.getItem("info")) || [];
      info.push(data.json);
      localStorage.setItem("info", JSON.stringify(info));
      setItems(info);
    } else {
      setErrors({
        valor:
          form.valor && form.valor != 0 ? "" : "El campo Valor es requerido",
        selected: form.selected ? "" : "Debe seleccionar una opcion",
        trm: form.trm && form.valor != 0 ? "" : "El campo TRM es requerido",
      });
    }
  };

  const clearFields = () => {
    setForm({
      valor: "",
      selected: 0,
      trm: "",
    });

    setErrors({
      valor: "",
      selected: "",
      trm: "",
    });
  };

  return (
    <div className="container">
      <form className="app" onSubmit={handleSubmit}>
        <NumericInput
          label="Valor"
          name="valor"
          value={form.valor}
          onChangeFn={handleChange}
        />
        {errors.valor && <Error message={errors.valor} />}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Descripcion</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={form.selected}
            name="selected"
            label="Descripcion"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          >
            <MenuItem value={0}>Seleccione</MenuItem>
            <MenuItem value={1}>Prueba1</MenuItem>
            <MenuItem value={2}>Prueba2</MenuItem>
            <MenuItem value={3}>Prueba3</MenuItem>
          </Select>
        </FormControl>
        {errors.selected && <Error message={errors.selected} />}
        <NumericInput
          label="TRM"
          name="trm"
          value={form.trm}
          onChangeFn={handleChange}
        />
        {errors.trm && <Error message={errors.trm} />}
        <div>
          <Button variant="outlined" onClick={clearFields}>
            Limpiar Campos
          </Button>
          <Button variant="contained" type="submit">
            Enviar Datos
          </Button>
        </div>
      </form>

      <TableItems items={items} />
    </div>
  );
}

export default App;
