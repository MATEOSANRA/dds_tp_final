import axios from "axios";
const urlResource = "http://localhost:3000/api/carnetsfamilias/";

async function Buscar() {
  const resp = await axios.get(urlResource);
  return resp.data;
}
export const carnetsFamiliasService = {
  Buscar
};
