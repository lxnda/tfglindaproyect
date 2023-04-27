import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "Nombre", width: 130 },
  { field: "lastName", headerName: "Apellidos", width: 130 },
  { field: "descripcion", headerName: "Descripcion", width: 230 },
  { field: "date", headerName: "Fecha", width: 100 },
  { field: "TMudanza", headerName: "Tipo de Mudanza", width: 150 },
  { field: "Origen", headerName: "Origen", width: 120 },
  { field: "Destino", headerName: "Destino", width: 120 },
];

const rows = [
  {
    id: 1,
    lastName: "Snow",
    firstName: "Jon",
    descripcion: "mudanza pequeña dos mesas",
    date: "03/05/2023",
    TMudanza: "Terrestre",
  },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    descripcion: "mudanza grande dos silla",
    date: "13/05/2023",
    TMudanza: "Terrestre",
  },
  {
    id: 3,
    lastName: "Lannister",
    firstName: "Jaime",
    descripcion: "mudanza mediana  ",
    date: "24/05/2023",
    TMudanza: "Aera",
  },
  {
    id: 4,
    lastName: "Stark",
    firstName: "Arya",
    descripcion: "mudanza pequeña una cama, mesas",
    date: "03/06/2023",
    TMudanza: "Terrestre",
  },
  {
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    descripcion: "mudanza mediana dos mesas",
    date: "12/06/2023",
    TMudanza: "Aera",
  },
  {
    id: 6,
    lastName: "Melisandre",
    firstName: null,
    descripcion: "mudanza pequeña dos mesas",
    date: "25/06/2023",
    TMudanza: "Aera",
  },
  {
    id: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    descripcion: "mudanza grande dos mesas",
    date: "01/07/2023",
    TMudanza: "Terrestre",
  },
  {
    id: 8,
    lastName: "Frances",
    firstName: "Rossini",
    descripcion: "mudanza pequeña dos mesas",
    date: "04/07/2023",
    TMudanza: "Aera",
  },
  {
    id: 9,
    lastName: "Roxie",
    firstName: "Harvey",
    descripcion: "mudanza pequeña dos mesas",
    date: "07/07/2023",
    TMudanza: "Terrestre",
  },
];

export const Content: React.FC<{}> = () => {
  return (
    <DataGrid 
      sx={{height:"75vh"}}
      rows={rows}
      columns={columns}
      // pagination={pagination}
      // onPageChange={(params) => setPage(params.page)}
      // onPageSizeChange={(params) => setPageSize(params.pageSize)}
      checkboxSelection
    />
  );
};
export default Content;
