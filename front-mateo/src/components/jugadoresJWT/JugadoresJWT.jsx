import React, { useState, useEffect } from "react";
import  {jugadoresJWTService}  from "../../services/jugadoresJWT.service";




function JugadoresJWT() {
  const tituloPagina = "Jugadores JWT (solo para admintradores)";
  const [jugadores, setJugadores] = useState(null);


  // cargar al iniciar el componente, solo una vez
  useEffect(() => {
    BuscarJugadoresJWT();
  }, []);


  async function BuscarJugadoresJWT() {
     try {
      let data = await jugadoresJWTService.Buscar();
      setJugadores(data);
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
            <th style={{ width: "20%" }}>IdJugador</th>
            <th style={{ width: "50%" }}>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {jugadores &&
            jugadores.map((posicion) => (
              <tr key={posicion.IdJugador}>
                <td>{posicion.IdJugador}</td>
                <td>{posicion.Nombre}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}


export { JugadoresJWT };


