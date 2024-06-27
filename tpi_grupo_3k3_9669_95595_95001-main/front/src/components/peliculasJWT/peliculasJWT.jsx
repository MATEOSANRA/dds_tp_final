import React, { useState, useEffect } from "react";
import { peliculasJWTService } from "../../services/peliculasJWT.service";

function convertirAMinutosYHoras(minutosTotales) {
  const horas = Math.floor(minutosTotales / 60);
  const minutos = minutosTotales % 60;
  return `${horas}h ${minutos}m`;
}

function PeliculasJWT() {
  const tituloPagina = "Peliculas JWT (solo para admintradores)";
  const [peliculas, setPeliculas] = useState(null);

  // cargar al iniciar el componente, solo una vez
  useEffect(() => {
    BuscarPeliculasJWT();
  }, []);

  async function BuscarPeliculasJWT() {
    try {
      let data = await peliculasJWTService.Buscar();
      setPeliculas(data);
    } catch (error) {
      console.log("error al buscar datos en el servidor!");
    }
  }

  return (
    <>
      <div className="tituloPagina">{tituloPagina}</div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>ID</th>
            <th style={{ width: "25%" }}>Nombre pelicula</th>
            <th style={{ width: "20%" }}>Fecha de Publicacion</th>
            <th style={{ width: "25%" }}>Duracion</th>
            <th style={{ width: "20%" }}>Recaudacion</th>
          </tr>
        </thead>
        <tbody>
          {peliculas &&
            peliculas.map((director) => (
              <tr key={director.IdPelicula}>
                <td>{director.IdPelicula}</td>
                <td>{director.Nombre}</td>
                <td>{director.FechaPublicacion}</td>
                <td>{convertirAMinutosYHoras(director.Duracion)}</td>
                <td>{director.Recaudacion}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export { PeliculasJWT };
