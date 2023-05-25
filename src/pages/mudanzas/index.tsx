import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import MaterialTable from "material-table";
import axios from "axios";
import { Button, Container, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Modal } from "@mui/material";
import { number } from "yup";

const columns = [
  {
    title: "ID Mudanza",
    field: "idMudanza",
  },
  {
    title: "Fecha",
    field: "nombre",
  },
  {
    title: "Direccion Origen",
    field: "direccion_o",
  },
  {
    title: "Direccion Destino",
    field: "direccion_d",
  },
  {
    title: "Tipo",
    field: "tipo",
  },
  {
    title: "Nombre Cliente",
    field: "nombre_cli",
  },
  {
    title: "Coste",
    field: "coste",
  },
];

const URLApi = "http://127.0.0.1:6001/getMudanzas";
const id_empresa = 1; // Ajusta el valor

export const Mudanzas: React.FC = () => {
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
    id: 0
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
    (caso === "editar")?abrirCerraModalUpdate()
    :
    abrirCerraModalDelete()
  };

  //modal Delete
  const [dataDelete, setDataDelete] = useState({
    id:0,
    id_empresa: 0
  });

  useEffect(() => {
    setDataDelete({
      id: clienteSeleccionado.id,
      id_empresa: id_empresa
    });
  }, [clienteSeleccionado.id, id_empresa]);
  
  const [modalDelete, setModalDelete] = React.useState(false);
  const handleCloseDelete = () => setModalDelete(false);
  const abrirCerraModalDelete = () => {
    setModalDelete(!modalDelete);
  };

  const peticionesDelete = async () => {
    await axios.delete("http://127.0.0.1:6001/deleteClientes", {data:dataDelete})
      .then(response=>(
        setData(data)
      ))
      .catch((error) => {
        console.error(error);
      });
  };



  return (
    <Container>
      <br />
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
              seleccionarCliente(rowData, "editar"),
          },
          {
            icon: "delete",
            tooltip: "Eliminar Mudanza",
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
        <h1>soy un modal</h1>
        {/* <FormAddCliente
          onClose={handleClose}
          idEmp={id_empresa}
          data={data}
          setdata={setData}
        /> */}
      </Modal>
      <Modal
        open={modalUpdate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <h1>soy un modal</h1>
        {/* <FormUpdateMudanza
          onClose={handleCloseUpdate}
          idEmp={id_empresa}
          data={data}
          setdata={setData}
          nombre={ clienteSeleccionado.nombre}
          direccion={ clienteSeleccionado.direccion}
          telefono={clienteSeleccionado.telefono}
          email={ clienteSeleccionado.email}
          id={clienteSeleccionado.id}
        /> */}
      </Modal>
      
      <Modal
        open={modalDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
           <p> Estas seguro que deseas eliminar al cliente: <b>{clienteSeleccionado&& clienteSeleccionado.nombre} </b>? </p>
          <Button autoFocus onClick={handleCloseDelete}>
            Cancelar
          </Button>
          <Button onClick={()=> peticionesDelete()}>Eliminar</Button>
        
        </div>
      </Modal>

    </Container>
  );
};
