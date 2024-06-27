import React, { useState, useEffect } from "react";
//import { artistasMockService } from '../services/artistas-mock.service';
import { artistasService } from "../services/artistas.service";
function Artistas() {
  const tituloPagina = "Artistas";
  const [artistas, setArtistas] = useState(null);
  // cargar al montar el componente (solo una vez)
  useEffect(() => {
    BuscarArtistas();
  }, []);
  async function BuscarArtistas() {
    let data = await artistasService.Buscar();
    setArtistas(data);
  }
  return (
    <div>
      <div className="tituloPagina">{tituloPagina}</div>
      <table className="table table-bordered table-striped table-hover table-dark">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>Artista NRO</th>
            <th style={{ width: "30" }}>Nombre y apellido</th>
            <th style={{ width: "10" }}>Pais De Origen </th>
            <th style={{ width: "25%" }}>Albums</th>
          </tr>
        </thead>
        <tbody>
          {artistas &&
            artistas.map((artista) => (
              <tr key={artista.IdArtista}>
                <td>{artista.IdArtista}</td>
                <td>{artista.Nombre}</td>
                <td>{artista.PaisOrigen}</td>
                <td>{artista.NumDeAlbums}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export { Artistas };
