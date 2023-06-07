import React, { useState } from "react";
import {
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  FormControl,
  TextField,
  Modal,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

interface Factura {
  id: number;
  numero: string;
  fecha: string;
  cliente: string;
  total: number;
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 2,
  },
  table: {
    minWidth: 500,
  },
  button: {
    marginTop: 2,
  },
  facturaContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  factura: {
    padding: 4,
    border: "1px solid #ccc",
    borderRadius: 1,
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    width: "50%",
  },
  facturaHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  facturaTitle: {
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  facturaData: {
    marginBottom: 2,
  },
}));

const Facturas: React.FC = () => {
  const classes = useStyles();

  // Datos de ejemplo de facturas
  const [facturas, setFacturas] = useState<Factura[]>([
    {
      id: 1,
      numero: "F2023001",
      fecha: "2023-06-01",
      cliente: "Cliente 1",
      total: 100.0,
    },
    {
      id: 2,
      numero: "F2023002",
      fecha: "2023-06-05",
      cliente: "Cliente 2",
      total: 150.0,
    },
    // Agrega más facturas según sea necesario
  ]);

  const [formData, setFormData] = useState({
    numero: "",
    fecha: "",
    cliente: "",
    total: "",
  });

  const [openModal, setOpenModal] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateFactura = () => {
    const { numero, fecha, cliente, total } = formData;

    if (numero && fecha && cliente && total) {
      const totalValue = parseFloat(total);

      const nuevaFactura: Factura = {
        id: facturas.length + 1,
        numero,
        fecha,
        cliente,
        total: totalValue,
      };

      const nuevasFacturas = [...facturas, nuevaFactura];
      setFacturas(nuevasFacturas);

      setFormData({
        numero: "",
        fecha: "",
        cliente: "",
        total: "",
      });

      setOpenModal(false);

      alert("La factura ha sido creada exitosamente.");
    } else {
      alert(
        "Ha ocurrido un error al crear la factura. Verifique los datos ingresados."
      );
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  //diseño de factura
  const handlePrintFactura = (factura: Factura) => {
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
        `<h2 class="factura-title">Factura ${factura.numero}</h2>`
      );
      printWindow.document.write(`<p>${factura.cliente}</p>`);
      printWindow.document.write(`<p>About Moving</p>`);
      printWindow.document.write("</div>");
      printWindow.document.write('<div class="factura-data">');
      printWindow.document.write(`<p>Fecha: ${factura.fecha}</p>`);

      // Detalles de la factura
      printWindow.document.write("<table>");
      printWindow.document.write(
        "<tr><th>Descripción</th><th>Cantidad</th><th>Precio</th></tr>"
      );

      // Ejemplo de detalles de la factura
      const detallesFactura = [
        { descripcion: "Producto 1", cantidad: 2, precio: 10 },
        { descripcion: "Producto 2", cantidad: 3, precio: 15 },
        // Agrega más detalles según sea necesario
      ];

      let total = 0;
      detallesFactura.forEach((detalle) => {
        const subtotal = detalle.cantidad * detalle.precio;
        total += subtotal;

        printWindow.document.write(
          `<tr><td>${detalle.descripcion}</td><td>${
            detalle.cantidad
          }</td><td>$${detalle.precio.toFixed(2)}</td></tr>`
        );
      });

      printWindow.document.write("</table>");

      // Cálculo del IVA
      const iva = total * 0.21;
      const totalConIva = total + iva;

      printWindow.document.write(`<div class="factura-total">`);
      printWindow.document.write(`<p>Subtotal: $${total.toFixed(2)}</p>`);
      printWindow.document.write(`<p>IVA (21%): $${iva.toFixed(2)}</p>`);
      printWindow.document.write(`<p>Total: $${totalConIva.toFixed(2)}</p>`);
      printWindow.document.write("</div>");

      printWindow.document.write("</div>");

      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h1" gutterBottom>
        Facturas
      </Typography>

      <Button variant="contained" color="primary" onClick={handleOpenModal}>
        Añadir Factura
      </Button>

      <Modal open={openModal} onClose={handleCloseModal}>
        <div className={classes.facturaContainer}>
          <div className={classes.factura}>
            <Typography variant="h6" className={classes.facturaHeader}>
              Añadir Factura
            </Typography>

            <form>
              <FormControl>
                <TextField
                  name="numero"
                  label="Número"
                  value={formData.numero}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  sx={{ mt: 2, mb: 1.5 }}
                />
              </FormControl>

              <FormControl>
                <TextField
                  name="fecha"
                  type="date"
                  value={formData.fecha}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  sx={{ mt: 2, mb: 1.5 }}
                />
              </FormControl>

              <FormControl>
                <TextField
                  name="cliente"
                  label="Cliente"
                  value={formData.cliente}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  type="text"
                  sx={{ mt: 2, mb: 1.5 }}
                />
              </FormControl>

              <FormControl>
                <TextField
                  name="total"
                  label="Total"
                  type="number"
                  value={formData.total}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  sx={{ mt: 2, mb: 1.5 }}
                />
              </FormControl>

              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateFactura}
              >
                Crear Factura
              </Button>
            </form>
          </div>
        </div>
      </Modal>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Número</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Total</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {facturas.map((factura) => (
              <TableRow key={factura.id}>
                <TableCell>{factura.numero}</TableCell>
                <TableCell>{factura.fecha}</TableCell>
                <TableCell>{factura.cliente}</TableCell>
                <TableCell>${factura.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handlePrintFactura(factura)}
                  >
                    Imprimir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Facturas;
