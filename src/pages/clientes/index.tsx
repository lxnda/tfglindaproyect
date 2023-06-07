import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import MaterialTable from "material-table";
import axios from "axios";
import { FormAddCliente } from "./formAddCliente";
import {
  Button,
  Container,
  Grid,
  IconButton,
  Modal,
  Paper,
} from "@mui/material";
import { FormUpdateCliente } from "./formUpdateCliente";
import { number } from "yup";

const columns = [
  {
    title: "IDCliente",
    field: "id",
  },
  {
    title: "Nombre",
    field: "nombre",
  },
  {
    title: "Direccion",
    field: "direccion",
  },
  {
    title: "Telefono",
    field: "telefono",
  },
  {
    title: "Email",
    field: "email",
  },
];

const URLApi = "http://127.0.0.1:6001/getClientes";
const idEmpresa = localStorage.getItem('idEmpresa')!;
const id_empresa = parseInt(idEmpresa);

export const Clientes: React.FC = () => {
  //traer los datos con get
  const [data, setData] = useState([]);
  const peticionesGet = async () => {
    await axios
      .get(URLApi, {
        params: {
          id_empresa: id_empresa,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

   console.log(data)
  useEffect(() => {
    peticionesGet();
  }, []);

  //modal form insertar
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //modal form update
  const [clienteSeleccionado, setClienteSeleccionado] = useState({
    nombre: "",
    direccion: "",
    telefono: 0,
    email: "",
    id: 0,
  });
  const [modalUpdate, setModalUpdate] = React.useState(false);
  const handleCloseUpdate = () => setModalUpdate(false);
  const abrirCerraModalUpdate = () => {
    setModalUpdate(!modalUpdate);
  };
  const seleccionarCliente = (
    cliente: React.SetStateAction<{
      nombre: string;
      direccion: string;
      telefono: number;
      email: string;
      id: number;
    }>,
    caso: string
  ) => {
    setClienteSeleccionado(cliente);
    caso === "editar" ? abrirCerraModalUpdate() : abrirCerraModalDelete();
  };

  //modal Delete
  const [dataDelete, setDataDelete] = useState({
    id: 0,
    id_empresa: 0,
  });

  useEffect(() => {
    setDataDelete({
      id: clienteSeleccionado.id,
      id_empresa: id_empresa,
    });
  }, [clienteSeleccionado.id, id_empresa]);

  const [modalDelete, setModalDelete] = React.useState(false);
  const handleCloseDelete = () => setModalDelete(false);
  const abrirCerraModalDelete = () => {
    setModalDelete(!modalDelete);
  };

  const peticionesDelete = async () => {
    await axios
      .delete("http://127.0.0.1:6001/deleteClientes", { data: dataDelete })
      .then((response) => setData(response.data))
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container sx={{ flexGrow: 1, overflow: "hidden" , paddingTop: "25px" }}>
      <br />
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{ backgroundColor: "#C6FFC1" }}
      >
        Añadir Cliente
      </Button>
      <br /> <br />
      <MaterialTable
        title={"Lista de Clientes"}
        data={data}
        columns={columns}
        actions={[
          {
            icon: "edit",
            tooltip: "Editar Cliente",
            onClick: (event, rowData: any) =>
              seleccionarCliente(rowData, "editar"),
          },
          {
            icon: "delete",
            tooltip: "Eliminar Cliente",
            onClick: (event, rowData) =>
              seleccionarCliente(rowData, "eliminar"),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
        localization={{
          header: {
            actions: "Acciones",
          },
        }}
      />
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FormAddCliente
          onClose={handleClose}
          idEmp={id_empresa}
          data={data}
          setdata={setData}
        />
      </Modal>
      <Modal
        open={modalUpdate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FormUpdateCliente
          onClose={handleCloseUpdate}
          idEmp={id_empresa}
          data={data}
          setdata={setData}
          nombre={clienteSeleccionado.nombre}
          direccion={clienteSeleccionado.direccion}
          telefono={clienteSeleccionado.telefono}
          email={clienteSeleccionado.email}
          id={clienteSeleccionado.id}
        />
      </Modal>
      <Modal
        open={modalDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "100vh" }}
        >
          <Grid item>
            <div
              style={{
                position: "relative",
                width: "120vh",
              }}
            >
              <Paper
                sx={{
                  padding: "2em",
                  borderRadius: "0.5em",
                  width: "120vh",
                  backgroundColor: "rgba(31, 38, 30, 0.9)",
                  border: "2px solid #2D392C",
                }}
              >
                <p>
                  {" "}
                  Estas seguro que deseas eliminar al cliente :{" "}
                  <b>
                    {clienteSeleccionado && clienteSeleccionado.nombre}{" "}
                  </b>? <br />
                  <br />
                  <b> se eliminara las mudanzas relacionas con este cliente </b>
                </p>
                <Button autoFocus onClick={handleCloseDelete}>
                  Cancelar
                </Button>
                <Button
                  onClick={() => {
                    peticionesDelete();
                    handleCloseDelete();
                    window.location.reload();
                  }}
                >
                  Eliminar
                </Button>
              </Paper>
            </div>
          </Grid>
        </Grid>
      </Modal>
    </Container>
  );
};
