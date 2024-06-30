import React, { useState, useEffect } from "react";
import { posicionesJWTService } from "../../services/posicionesJWT.service";




function PosicionesJWT() {
  const tituloPagina = "Posiciones JWT (solo para admintradores)";
  const [posiciones, setPosiciones] = useState(null);


  // cargar al iniciar el componente, solo una vez
  useEffect(() => {
    BuscarPosicionesJWT();
  }, []);


  async function BuscarPosicionesJWT() {
    try {
      let data = await posicionesJWTService.Buscar(); // Extrae los datos de las posiciones 
      setPosiciones(data);
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
            <th style={{ width: "20%" }}>IdPosicion</th>
            <th style={{ width: "50%" }}>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {posiciones &&
            posiciones.map((posicion) => (
              <tr key={posicion}>
                <td>{posicion.IdPosicion}</td>
                <td>{posicion.Nombre}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}


export default PosicionesJWT;


