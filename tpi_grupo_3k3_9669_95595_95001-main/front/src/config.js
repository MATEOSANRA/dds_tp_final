const urlServidor = "http://localhost:4000";

const urlResourceLibros = urlServidor + "/api/libros";
const urlResourceAutores = urlServidor + "/api/autores";
const urlResourceLibrosJWT = urlServidor + "/api/librosjwt";
const urlResourceDirectores = urlServidor + "/api/directores";
const urlResourcePeliculas = urlServidor + "/api/peliculas";
const urlResourcePeliculasJWT = urlServidor + "/api/peliculasjwt";
const urlResourceArtistas = urlServidor + "/api/artistas";
const urlResourceCanciones = urlServidor + "/api/canciones";
const urlResourceCancionesJWT = urlServidor + "/api/cancionesjwt";

export const config = {
  urlServidor,
  urlResourceLibros,
  urlResourceAutores,
  urlResourceLibrosJWT,
  urlResourceDirectores,
  urlResourcePeliculas,
  urlResourcePeliculasJWT,
  urlResourceArtistas,
  urlResourceCanciones,
  urlResourceCancionesJWT,
};
