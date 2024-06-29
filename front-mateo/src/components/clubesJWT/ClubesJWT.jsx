import React, { useState, useEffect } from "react";
import  {clubesJWTService}  from "../../services/clubesJWT.service";




function ClubesJWT() {
  const tituloPagina = "Clubes JWT (solo para admintradores)";
  const [clubes, setClubes] = useState(null);


  // cargar al iniciar el componente, solo una vez
  useEffect(() => {
    BuscarClubesJWT();
  }, []);


  async function BuscarClubesJWT() {
     try {
      let data = await clubesJWTService.Buscar();
      setClubes(data);
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
            <th style={{ width: "20%" }}>IdClub</th>
            <th style={{ width: "50%" }}>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {clubes &&
            clubes.map((liga) => (
              <tr key={liga.IdClub}>
                <td>{liga.IdClub}</td>
                <td>{liga.Nombre}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}


export { ClubesJWT };


