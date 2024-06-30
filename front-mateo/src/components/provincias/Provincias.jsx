import React, { useState, useEffect } from "react";
//import { autoresMockService } from '../services/autores-mock.service';
import { provinciasService } from "../../services/provincias.service";

function Provincias() {
  const tituloPagina = "Provincias";
  const [provincias, setProvincias] = useState(null);
  // cargar al montar el componente (solo una vez)
  useEffect(() => {
    BuscarProvincias();
  }, []);
  async function BuscarProvincias() {
    let data = await provinciasService.Buscar();
    setProvincias(data);
  }
  return (
    <div>
      <div className="tituloPagina">{tituloPagina}</div>
      <table className="table table-bordered table-striped table-hover table-dark">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>Provincia NRO</th>
            <th style={{ width: "30%" }}>Nombre de la Provincia</th>
          </tr>
        </thead>
        <tbody>
          {provincias &&
            provincias.map((provincia) => (
              <tr key={provincia.IdProvincia}>
                <td>{provincia.IdProvincia}</td>
                <td>{provincia.Nombre}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export { Provincias };
