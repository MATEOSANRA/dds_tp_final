import axios from "axios";

//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/";
import { config } from "../config";
const urlResource = config.urlResourcePosiciones;

async function Buscar() {
  const resp = await axios.get(urlResource);
  return resp.data;
}
export const posicionesService = {
  Buscar,
};
