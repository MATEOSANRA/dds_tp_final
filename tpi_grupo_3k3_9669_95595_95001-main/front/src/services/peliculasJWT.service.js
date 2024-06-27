import { config } from "../config";
import httpService from "./http.service";

const urlResource = config.urlResourcePeliculasJWT;

async function Buscar(Nombre, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { Nombre, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdPelicula);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.IdPelicula);
}

async function Grabar(item) {
  if (item.IdPelicula === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.IdPelicula, item);
  }
}

export const peliculasJWTService = {
  Buscar,
  BuscarPorId,
  ActivarDesactivar,
  Grabar,
};
