
import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/";

// mas adelante podemos usar un archivo de configuracion para el urlResource
 import {config} from "../config";
 const urlResource = config.urlResourceJugadores;


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


export const jugadoresService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};