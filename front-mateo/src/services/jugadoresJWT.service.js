import { config } from "../config";
import httpService from "./http.service";

const urlResource = config.urlResourceJugadoresJWT;

async function Buscar(Nombre, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { Nombre, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdJugador);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.IdJugador);
}

async function Grabar(item) {
  if (item.IdJugador === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.IdJugador, item);
  }
}

export const jugadoresJWTService = {
  Buscar,
  BuscarPorId,
  ActivarDesactivar,
  Grabar,
};
