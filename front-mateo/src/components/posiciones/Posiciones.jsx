import React, { useState, useEffect } from "react";
//import { autoresMockService } from '../services/autores-mock.service';
import { posicionesService } from "../../services/posiciones.service";
function Posiciones() {
  const tituloPagina = "Posiciones";
  const [posiciones, setPosiciones] = useState(null);
  // cargar al montar el componente (solo una vez)
  useEffect(() => {
    BuscarPosiciones();
  }, []);
  async function BuscarPosiciones() {
    let data = await posicionesService.Buscar();
    setPosiciones(data);
  }
  return (
    <div>
      <div className="tituloPagina">{tituloPagina}</div>
      <table className="table table-bordered table-striped table-hover table-dark">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>Posicion NRO</th>
            <th style={{ width: "30%" }}>Nombre de la Posicion</th>
          </tr>
        </thead>
        <tbody>
          {posiciones &&
            posiciones.map((posicion) => (
              <tr key={posicion.IdPosicion}>
                <td>{posicion.IdPosicion}</td>
                <td>{posicion.Nombre}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export { Posiciones };
