import httpService from "./http.service";

import { config } from "../config";
const urlResource = config.urlResourceCanciones;

async function Buscar(Nombre, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { Nombre, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdCancion);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.IdCancion);
}

async function Grabar(item) {
  if (item.IdCancion === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.IdCancion, item);
  }
}

export const cancionesService = {
  Buscar,
  BuscarPorId,
  ActivarDesactivar,
  Grabar,
};
