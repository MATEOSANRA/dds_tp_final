const urlServidor = "http://localhost:4000";

const urlResourceClubes = urlServidor + "/api/clubes";
const urlResourceLigas = urlServidor + "/api/ligas";
const urlResourceClubesJWT = urlServidor + "/api/clubesjwt";

const urlResourceJugadores = urlServidor + "/api/jugadores";
const urlResourcePosiciones = urlServidor + "/api/posiciones";
const urlResourceJugadoresJWT = urlServidor + "/api/jugadoresjwt";


export const config = {
  urlServidor,
  urlResourceClubes,
  urlResourceClubesJWT,
  urlResourceLigas,
  urlResourceJugadores,
  urlResourcePosiciones,
  urlResourceJugadoresJWT,
};
