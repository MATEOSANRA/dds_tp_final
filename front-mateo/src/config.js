const urlServidor = "http://localhost:4000";

const urlResourceClubes = urlServidor + "/api/clubes";
const urlResourceLigas = urlServidor + "/api/ligas";
const urlResourceClubesJWT = urlServidor + "/api/clubesjwt";

const urlResourceJugadores = urlServidor + "/api/jugadores";
const urlResourcePosiciones = urlServidor + "/api/posiciones";
const urlResourceJugadoresJWT = urlServidor + "/api/jugadoresjwt";

const urlResourceEstadios = urlServidor + "/api/estadios";
const urlResourceProvincias = urlServidor + "/api/provincias";
const urlResourceEstadiosJWT = urlServidor + "/api/estadiosjwt";

export const config = {
  urlServidor,
  urlResourceClubes,
  urlResourceClubesJWT,
  urlResourceLigas,
  urlResourceJugadores,
  urlResourcePosiciones,
  urlResourceJugadoresJWT,
  urlResourceEstadios,
  urlResourceProvincias,
  urlResourceEstadiosJWT,
};
