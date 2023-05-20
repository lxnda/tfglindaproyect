import React , {useEffect,useState} from "react";
import MUIDataTable from "mui-datatables";
import MaterialTable from "material-table";
import axios from "axios";
import { Container } from "@material-ui/core";

const columns=[
  {
    title:'Nombre',
    field:'nombre'
  },
  {
    title:'Direccion',
    field:'direccion'
  },
  {
    title:'Telefono',
    field:'telefono'
  },
  {
    title:'Email',
    field:'email'
  },
];

const URLApi = "http://127.0.0.1:6001/getClientes";
const id_empresa = 1; // Ajusta el valor 

export const Clientes: React.FC = () => {
  const [data, setData] = useState([]);

  const peticionesGet = async () => {
    await axios.get(URLApi, {
      params: {
        id_empresa: id_empresa
      }
    })
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
    peticionesGet();
  }, []);


  //  const columns = ["Nombre", "Direccion", "Telefono", "Email"];

  // const data = [
  //   ["xxxx", "av xx1", 88888888, "xxx@gmail.com"],
  //   ["xxxx1", "av xx2", 7777777, "xxx@gmail.com"],
  //   ["xxxx2", "av xx3", 2222222, "xxx@gmail.com"],
  //   ["xxxx3", "av xx4", 4444444, "xxx@gmail.com"],
  // ];
  

  // const data1=[
  //   {nombre:'xxxx',direccion:'av xx1', telefono: 88888888, email:'xxx@gmail.com'},
  //   {nombre:'xxxx1',direccion:'av xx2', telefono: 7777777, email:'xxx@gmail.com'},
  //   {nombre:'xxxx2',direccion:'av xx3', telefono: 2222222, email:'xxx@gmail.com'},
  //   {nombre:'xxxx3',direccion:'av xx4', telefono: 4444444, email:'xxx@gmail.com'},
  // ]
  // const options = { }
  return (
    <Container>
      {/* <MUIDataTable
        title={"Lista de Clientes"}
        data={data}
        columns={columns}
        options={options}
      /> */}
      <MaterialTable
        title={"Lista de Clientes"}
        data={data}
        columns={columns}
        actions={[
          {
            icon:'edit',
            tooltip:'Editar Cliente',
            onClick:(event, rowData) => alert ('has presioando editar al cliente'+ rowData)
          },
          {
            icon:'delete',
            tooltip:'Eliminar Cliente',
            onClick:(event, rowData) => window.confirm('Estas seguro que deseas eliminar al cliente'+ rowData)
          }
        ]}
        options={{
          actionsColumnIndex:-1
        }}
        localization={{
          header:{
            actions:'Acciones'
          }
        }}
      />
    </Container>
  );
};
