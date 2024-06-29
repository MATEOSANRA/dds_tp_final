import { config } from "../config";
import httpService from "./http.service";

const urlResource = config.urlResourceClubesJWT;

async function Buscar(Nombre, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { Nombre, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdClub);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.IdClub);
}

async function Grabar(item) {
  if (item.IdClub === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.IdClub, item);
  }
}

export const clubesJWTService = {
  Buscar,
  BuscarPorId,
  ActivarDesactivar,
  Grabar,
};
