import React, { useState, useEffect } from "react";
import { provinciasJWTService } from "../../services/provinciasJWT.service";




function ProvinciasJWT() {
  const tituloPagina = "Provincias JWT (solo para admintradores)";
  const [provincias, setProvincias] = useState(null);


  // cargar al iniciar el componente, solo una vez
  useEffect(() => {
    BuscarProvinciasJWT();
  }, []);


  async function BuscarProvinciasJWT() {
    try {
      let data = await provinciasJWTService.Buscar();
      setProvincias(data);
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
            <th style={{ width: "20%" }}>IdProvincia</th>
            <th style={{ width: "50%" }}>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {provincias &&
            provincias.map((prov) => (
              <tr key={prov}>
                <td>{prov.IdProvincia}</td>
                <td>{prov.Nombre}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}


export default ProvinciasJWT;