import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import MaterialTable from "material-table";
import axios from "axios";
import {
  Button,
  Container,
  Grid,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Modal,
  Paper,
} from "@mui/material";
import { number } from "yup";
import { FormAddMudanza } from "./formAddMudanza";
import { FormUpdateMudanza } from "./formUpdateMudanza";
const columns = [
  {
    title: "ID M",
    field: "id",
  },
  {
    title: "Fecha",
    field: "fecha",
  },
  {
    title: "Direccion Origen",
    field: "direccion_origen",
  },
  {
    title: "Direccion Destino",
    field: "direccion_destino",
  },
  {
    title: "Descripcion",
    field: "descripcion",
  },
  {
    title: "Tipo",
    field: "tipo",
  },
  {
    title: "ID Cliente",
    field: "id_cliente",
  },
  {
    title: "Nombre Cliente",
    field: "nombre",
  },
  {
    title: "Coste",
    field: "total_mudanza",
  },
];

const URLApi = "http://127.0.0.1:6001/getMudanzas";
const idEmpresa = localStorage.getItem("idEmpresa")!;
const id_empresa = parseInt(idEmpresa);

export const Mudanzas: React.FC = () => {
  //traer los datos con get.
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

  useEffect(() => {
    peticionesGet();
  }, []);

  //modal form insertar
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //modal form update
  const [mudanzaSeleccionada, setMudanzaSeleccionada] = useState({
    id: 0,
    fecha: "",
    direccion_origen: "",
    direccion_destino: "",
    descripcion: "",
    tipo: "",
    nombre: "",
    total_mudanza: 0,
    id_cliente: 0,
  });

  const [modalUpdate, setModalUpdate] = React.useState(false);
  const handleCloseUpdate = () => setModalUpdate(false);
  const abrirCerraModalUpdate = () => {
    setModalUpdate(!modalUpdate);
  };

  const seleccionarMudanza = (
    mudanza: React.SetStateAction<{
      id: number;
      fecha: string;
      direccion_origen: string;
      direccion_destino: string;
      descripcion: string;
      tipo: string;
      nombre: string;
      total_mudanza: number;
      id_cliente: number;
    }>,
    caso: string
  ) => {
    setMudanzaSeleccionada(mudanza);
    caso === "editar" ? abrirCerraModalUpdate() : abrirCerraModalDelete();
  };

  //modal Delete
  const [dataDelete, setDataDelete] = useState({
    id: 0,
  });

  useEffect(() => {
    setDataDelete({
      id: mudanzaSeleccionada.id,
    });
  }, [mudanzaSeleccionada.id]);

  const [modalDelete, setModalDelete] = React.useState(false);
  const handleCloseDelete = () => setModalDelete(false);
  const abrirCerraModalDelete = () => {
    setModalDelete(!modalDelete);
  };

  const peticionesDelete = async () => {
    await axios
      .delete("http://127.0.0.1:6001/deleteMudanza", { data: dataDelete })
      .then((response) => setData(data))
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container sx={{ flexGrow: 1, overflow: "hidden", paddingTop: "50px" }}>
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{ backgroundColor: "#C6FFC1" }}
      >
        Añadir Mudanza
      </Button>
      <br /> <br />
      <MaterialTable
        title={"Lista de Mudanzas"}
        data={data}
        columns={columns}
        actions={[
          {
            icon: "edit",
            tooltip: "Editar Mudanza",
            onClick: (event, rowData: any) =>
              seleccionarMudanza(rowData, "editar"),
          },
          {
            icon: "delete",
            tooltip: "Eliminar Mudanza",
            onClick: (event, rowData) =>
              seleccionarMudanza(rowData, "eliminar"),
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
        {
          <FormAddMudanza
            onClose={handleClose}
            idEmp={id_empresa}
            data={data}
            setdata={setData}
          />
        }
      </Modal>
      <Modal
        open={modalUpdate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {
          <FormUpdateMudanza
            onClose={handleCloseUpdate}
            data={data}
            setdata={setData}
            id={mudanzaSeleccionada.id}
            fecha={mudanzaSeleccionada.fecha}
            direccion_origen={mudanzaSeleccionada.direccion_origen}
            direccion_destino={mudanzaSeleccionada.direccion_destino}
            descripcion={mudanzaSeleccionada.descripcion}
            tipo={mudanzaSeleccionada.tipo}
            total_mudanza={mudanzaSeleccionada.total_mudanza}
            id_cliente={mudanzaSeleccionada.id_cliente}
          />
        }
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
                  Estas seguro que deseas eliminar la mudanza de :{" "}
                  <b>
                    {mudanzaSeleccionada && mudanzaSeleccionada.nombre}{" "}
                  </b>?{" "}
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
