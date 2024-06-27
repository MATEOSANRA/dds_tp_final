import axios from "axios";
const urlResource = "http://localhost:3000/api/carnets/";



async function Buscar(Nombre, Activo, Pagina) {
  const resp = await axios.get(urlResource, {
    params: { Nombre, Activo, Pagina },
  });
  return resp.data;
}
async function BuscarPorId(item) {
  const resp = await axios.get(urlResource + "/" + item.IdCarnet);
  return resp.data;
}
async function ActivarDesactivar(item) {
  await axios.delete(urlResource + "/" + item.IdCarnet);
}
async function Grabar(item) {
  if (item.IdCarnet === 0) {
    await axios.post(urlResource, item);
  } else {
    await axios.put(urlResource + "/" + item.IdCarnet, item);
  }
}
export const carnetsService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
