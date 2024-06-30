import { config } from "../config";
import httpService from "./http.service";

const urlResource = config.urlResourceLigasJWT;

async function Buscar(Nombre, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { Nombre, Pagina },
  });
  return resp.data;
}

export const ligasJWTService = {
  Buscar
};
