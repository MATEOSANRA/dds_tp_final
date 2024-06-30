import { config } from "../config";
import httpService from "./http.service";

const urlResource = config.urlResourceProvinciasJWT;

async function Buscar(Nombre, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { Nombre, Pagina },
  });
  return resp.data;
}

export const provinciasJWTService = {
  Buscar
};
