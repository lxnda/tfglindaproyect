import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import {
  Button,
  Container,
  Grid,
  Modal,
  Paper,
} from "@mui/material";
import { FormAddFactura } from "./addFactura";
import PrintIcon from '@mui/icons-material/Print';

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
    title: "Descripcion",
    field: "descripcion",
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
    descripcion: "",
    id: 0,
    idfactura:""
  });
  
  const seleccionarFactura = (
    factura: React.SetStateAction<{
      fecha: string;
      nombrecliente: string;
      total: number;
      descripcion: string;
      id: number;
      idfactura:string;
    }>,
    caso: string
  ) => {
    setFacturaSeleccionada(factura);
    caso === "imprimir" ? handleImprimirFactura(factura) : abrirCerraModalDelete();
  };


  //Imprimir Factura
  const handleImprimirFactura = (factura: any) => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(
        "<html><head><title>Factura</title></head><body>"
      );

      // Estilos personalizados para la impresión
      printWindow.document.write(`
        <style>
          /* Estilos personalizados para la impresión */
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
          }
          .factura-container {
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 20px;
            width: 300px;
            margin: 0 auto;
          }
          .factura-header {
            text-align: center;
            margin-bottom: 10px;
          }
          .factura-title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 5px;
          }
          .factura-data {
            margin-bottom: 10px;
          }
          .factura-row {
            display: flex;
            justify-content: space-between;
          }
          .factura-total {
            margin-top: 20px;
            text-align: right;
            font-weight: bold;
          }
        </style>
      `);

      // Contenido de la factura
      printWindow.document.write('<div class="factura-container">');
      printWindow.document.write('<div class="factura-header">');
      printWindow.document.write(
        `<h2 class="factura-title">Factura ${factura.idfactura}</h2>`
      );
      printWindow.document.write(`<p><b>Nombre Cliente:</b>${factura.nombrecliente}</p>`);
      printWindow.document.write(`<p>About Moving</p>`);
      printWindow.document.write("</div>");
      printWindow.document.write('<div class="factura-data">');
      printWindow.document.write(`<p>Fecha: ${factura.fecha}</p>`);

      // Detalles de la factura
      printWindow.document.write("<table>");
      printWindow.document.write(
        "<tr><th>Descripción</th></tr>"
      );


      printWindow.document.write(
          `<tr><td>${factura.descripcion}</td><td>`
        );

      printWindow.document.write("</table>");

      // Cálculo del IVA
      const iva = factura.total * 0.21;
      const totalConIva = factura.total + iva;

      printWindow.document.write(`<div class="factura-total">`);
      printWindow.document.write(`<p>Subtotal: $${factura.total.toFixed(2)}</p>`);
      printWindow.document.write(`<p>IVA (21%): $${iva.toFixed(2)}</p>`);
      printWindow.document.write(`<p>Total: $${totalConIva.toFixed(2)}</p>`);
      printWindow.document.write("</div>");

      printWindow.document.write("</div>");

      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.print();
    }
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
            icon: PrintIcon,
            tooltip: "Imprimir Factura",
            onClick: (event, rowData: any) =>
            seleccionarFactura(rowData, "imprimir"),
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
