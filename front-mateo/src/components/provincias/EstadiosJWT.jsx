import React, { useState, useEffect } from "react";
import  {estadiosJWTService}  from "../../services/estadiosJWT.service";




function EstadiosJWT() {
  const tituloPagina = "Estadios JWT (solo para admintradores)";
  const [estadios, setEstadios] = useState(null);


  // cargar al iniciar el componente, solo una vez
  useEffect(() => {
    BuscarEstadiosJWT();
  }, []);


  async function BuscarEstadiosJWT() {
     try {
      let data = await estadiosJWTService.Buscar();
      setEstadios(data);
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
            <th style={{ width: "20%" }}>IdEstadio</th>
            <th style={{ width: "50%" }}>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {estadios &&
            estadios.map((provincia) => (
              <tr key={provincia.IdEstadio}>
                <td>{provincia.IdEstadio}</td>
                <td>{provincia.Nombre}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}


export { EstadiosJWT };


