import React, { useState, useEffect } from "react";
//import { autoresMockService } from '../services/autores-mock.service';
import { autoresService } from "../services/autores.service";
function Autores() {
  const tituloPagina = "Autores";
  const [autores, setAutores] = useState(null);
  // cargar al montar el componente (solo una vez)
  useEffect(() => {
    BuscarAutores();
  }, []);
  async function BuscarAutores() {
    let data = await autoresService.Buscar();
    setAutores(data);
  }
  return (
    <div>
      <div className="tituloPagina">{tituloPagina}</div>
      <table className="table table-bordered table-striped table-hover table-dark">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>Autor NRO</th>
            <th style={{ width: "30%" }}>Nombre y Apellido</th>
            <th style={{ width: "30%" }}>Nacionalidad</th>
            <th style={{ width: "30%" }}>Fecha de Nacimiento</th>
          </tr>
        </thead>
        <tbody>
          {autores &&
            autores.map((autor) => (
              <tr key={autor.IdAutor}>
                <td>{autor.IdAutor}</td>
                <td>{autor.Nombre}</td>
                <td>{autor.Nacionalidad}</td>
                <td>{autor.FechaNacimiento}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export { Autores };
