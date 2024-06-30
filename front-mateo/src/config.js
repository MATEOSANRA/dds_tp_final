const urlServidor = "http://localhost:4000";

const urlResourceClubes = urlServidor + "/api/clubes";
const urlResourceLigas = urlServidor + "/api/ligas";
const urlResourceLigasJWT = urlServidor + "/api/ligasjwt";

const urlResourceJugadores = urlServidor + "/api/jugadores";
const urlResourcePosiciones = urlServidor + "/api/posiciones";
const urlResourcePosicionesJWT = urlServidor + "/api/posicionesjwt";

const urlResourceEstadios = urlServidor + "/api/estadios";
const urlResourceProvincias = urlServidor + "/api/provincias";
const urlResourceProvinciasJWT = urlServidor + "/api/provinciasjwt";

export const config = {
  urlServidor,
  urlResourceClubes,
  urlResourceLigasJWT,
  urlResourceLigas,
  urlResourceJugadores,
  urlResourcePosiciones,
  urlResourcePosicionesJWT,
  urlResourceEstadios,
  urlResourceProvincias,
  urlResourceProvinciasJWT
};
