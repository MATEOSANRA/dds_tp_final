import React, { useState, useEffect } from "react";
//import { directoresMockService } from '../services/directores-mock.service';
import { directoresService } from "../services/directores.service";
function Directores() {
  const tituloPagina = "Directores";
  const [directores, setDirectores] = useState(null);
  // cargar al montar el componente (solo una vez)
  useEffect(() => {
    BuscarDirectores();
  }, []);
  async function BuscarDirectores() {
    let data = await directoresService.Buscar();
    setDirectores(data);
  }
  return (
    <div>
      <div className="tituloPagina">{tituloPagina}</div>
      <table className="table table-bordered table-striped table-hover table-dark">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>Director NRO</th>
            <th style={{ width: "30" }}>Nombre y apellido</th>
            <th style={{ width: "10" }}>Peliculas dirigidas</th>
            <th style={{ width: "25%" }}>Fecha de nacimiento</th>
            <th style={{ width: "25%" }}>Lugar de nacimiento</th>
          </tr>
        </thead>
        <tbody>
          {directores &&
            directores.map((director) => (
              <tr key={director.IdDirector}>
                <td>{director.IdDirector}</td>
                <td>{director.Nombre}</td>
                <td>{director.NumPeliculasDirigidas}</td>
                <td>{director.FechaNacimiento}</td>
                <td>{director.PaisOrigen}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export { Directores };
