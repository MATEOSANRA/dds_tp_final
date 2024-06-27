import React, { useState, useEffect } from "react";
import  {cancionesJWTService}  from "../../services/cancionesJWT.service";




function CancionesJWT() {
  const tituloPagina = "Canciones JWT (solo para admintradores)";
  const [canciones, setCanciones] = useState(null);


  // cargar al iniciar el componente, solo una vez
  useEffect(() => {
    BuscarCancionesJWT();
  }, []);


  async function BuscarCancionesJWT() {
     try {
      let data = await cancionesJWTService.Buscar();
      setCanciones(data);
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
            <th style={{ width: "20%" }}>IdCancion</th>
            <th style={{ width: "50%" }}>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {canciones &&
            canciones.map((artista) => (
              <tr key={artista.IdCancion}>
                <td>{artista.IdCancion}</td>
                <td>{artista.Nombre}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}


export { CancionesJWT };


