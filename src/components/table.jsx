import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import '../styles/table.css';

const TableItems = ({ items }) => {
  return (
    <TableContainer component={Paper} className="tableContainer">
        <Table sx={{ minWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor: "black" }}>
              <TableCell className="head">ID</TableCell>
              <TableCell className="head">VALOR</TableCell>
              <TableCell className="head">DESCRIPCION</TableCell>
              <TableCell className="head">TRM</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items
              ? items.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.valor}</TableCell>
                      <TableCell>{item.selected}</TableCell>
                      <TableCell>{item.trm}</TableCell>
                    </TableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
      </TableContainer>
  );
};

export default TableItems