const urlServidor = "http://localhost:4000";

const urlResourceClubes = urlServidor + "/api/clubes";
const urlResourceLigas = urlServidor + "/api/ligas";
const urlResourceClubesJWT = urlServidor + "/api/clubesjwt";
const urlResourceLigasJWT = urlServidor + "/api/ligasjwt";

const urlResourceJugadores = urlServidor + "/api/jugadores";
const urlResourcePosiciones = urlServidor + "/api/posiciones";
const urlResourceJugadoresJWT = urlServidor + "/api/jugadoresjwt";
const urlResourcePosicionesJWT = urlServidor + "/api/posicionesjwt";

const urlResourceEstadios = urlServidor + "/api/estadios";
const urlResourceProvincias = urlServidor + "/api/provincias";
const urlResourceEstadiosJWT = urlServidor + "/api/estadiosjwt";
const urlResourceProvinciasJWT = urlServidor + "/api/provinciasjwt";

export const config = {
  urlServidor,
  urlResourceClubes,
  urlResourceClubesJWT,
  urlResourceLigasJWT,
  urlResourceLigas,
  urlResourceJugadores,
  urlResourcePosiciones,
  urlResourceJugadoresJWT,
  urlResourcePosicionesJWT,
  urlResourceEstadios,
  urlResourceProvincias,
  urlResourceEstadiosJWT,
  urlResourceProvinciasJWT
};
