import React, { useState, useEffect } from "react";
import { ligasJWTService } from "../../services/ligasJWT.service";




function LigasJWT() {
  const tituloPagina = "Ligas JWT (solo para admintradores)";
  const [ligas, setLigas] = useState(null);


  // cargar al iniciar el componente, solo una vez
  useEffect(() => {
    BuscarLigasJWT();
  }, []);


  async function BuscarLigasJWT() {
    try {
      let data = await ligasJWTService.Buscar();
      setLigas(data);
    } catch (error) {
      console.log("error al buscar datos en el servidor!")
    }
  }


  return (
    <>
      <div className="tituloPagina">{tituloPagina}</div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th style={{ width: "20%" }}>IdLiga</th>
            <th style={{ width: "50%" }}>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {ligas &&
            ligas.map((liga) => (
              <tr key={liga}>
                <td>{liga.IdLiga}</td>
                <td>{liga.Nombre}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}


export default LigasJWT;


