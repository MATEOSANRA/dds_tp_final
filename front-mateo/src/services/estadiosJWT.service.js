import { config } from "../config";
import httpService from "./http.service";

const urlResource = config.urlResourceEstadiosJWT;

async function Buscar(Nombre, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { Nombre, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdEstadio);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.IdEstadio);
}

async function Grabar(item) {
  if (item.IdEstadio === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.IdEstadio, item);
  }
}

export const estadiosJWTService = {
  Buscar,
  BuscarPorId,
  ActivarDesactivar,
  Grabar,
};
