import React, { useState, useEffect } from "react";
//import { autoresMockService } from '../services/autores-mock.service';
import { ligasService } from "../../services/ligas.service";
function Ligas() {
  const tituloPagina = "Ligas";
  const [ligas, setLigas] = useState(null);
  // cargar al montar el componente (solo una vez)
  useEffect(() => {
    BuscarLigas();
  }, []);
  async function BuscarLigas() {
    let data = await ligasService.Buscar();
    setLigas(data);
  }
  return (
    <div>
      <div className="tituloPagina">{tituloPagina}</div>
      <table className="table table-bordered table-striped table-hover table-dark">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>Liga NRO</th>
            <th style={{ width: "30%" }}>Nombre de la Liga</th>
          </tr>
        </thead>
        <tbody>
          {ligas &&
            ligas.map((liga) => (
              <tr key={liga.IdLiga}>
                <td>{liga.IdLiga}</td>
                <td>{liga.Nombre}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export { Ligas };
