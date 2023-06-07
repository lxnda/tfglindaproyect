import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import {
  Button,
  Container,
  Grid,
  IconButton,
  Modal,
  Paper,
} from "@mui/material";
import { FormAddFactura } from "./addFactura";

const columns = [
  {
    title: "ID Factura",
    field: "idfactura",
  },
  {
    title: "Nombre Cliente",
    field: "nombrecliente",
  },
  {
    title: "Fecha",
    field: "fecha",
  },
  {
    title: "Total €",
    field: "total",
  }
];

const URLApi = "http://127.0.0.1:6001/getInvoice";
const idEmpresa = localStorage.getItem('idEmpresa')!;
const id_empresa = parseInt(idEmpresa);

export const Facturas: React.FC = () => {
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
  const [facturaSeleccionada, setFacturaSeleccionada] = useState({
    fecha: "",
    nombrecliente: "",
    total: 0,
    id: 0,
    idfactura:""
  });
  const [modalUpdate, setModalUpdate] = React.useState(false);
  const handleCloseUpdate = () => setModalUpdate(false);
  const abrirCerraModalUpdate = () => {
    setModalUpdate(!modalUpdate);
  };
  const seleccionarFactura = (
    factura: React.SetStateAction<{
      fecha: string;
      nombrecliente: string;
      total: number;
      id: number;
      idfactura:string;
    }>,
    caso: string
  ) => {
    setFacturaSeleccionada(factura);
    caso === "editar" ? abrirCerraModalUpdate() : abrirCerraModalDelete();
  };

  //modal Delete
  const [dataDelete, setDataDelete] = useState({
    id: 0,
  });

  useEffect(() => {
    setDataDelete({
      id: facturaSeleccionada.id,
    });
  }, [facturaSeleccionada.id]);

  const [modalDelete, setModalDelete] = React.useState(false);
  const handleCloseDelete = () => setModalDelete(false);
  const abrirCerraModalDelete = () => {
    setModalDelete(!modalDelete);
  };

  const peticionesDelete = async () => {
    await axios
      .delete("http://127.0.0.1:6001/deleteInvoice", { data: dataDelete })
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
        Añadir Factura
      </Button>
      <br /> <br />
      <MaterialTable
        title={"Lista de Facturas"}
        data={data}
        columns={columns}
        actions={[
          {
            icon: "edit",
            tooltip: "Editar Factura",
            onClick: (event, rowData: any) =>
              seleccionarFactura(rowData, "editar"),
          },
          {
            icon: "delete",
            tooltip: "Eliminar Factura",
            onClick: (event, rowData) =>
            seleccionarFactura(rowData, "eliminar"),
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
        <FormAddFactura
          onClose={handleClose}
          idEmp={id_empresa}
          data={data}
          setdata={setData}
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
                  Estas seguro que deseas eliminar la factura :{" "}
                  <b>
                    {facturaSeleccionada && facturaSeleccionada.id}{" "}
                  </b>? <br />
                  <br />
                  
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
