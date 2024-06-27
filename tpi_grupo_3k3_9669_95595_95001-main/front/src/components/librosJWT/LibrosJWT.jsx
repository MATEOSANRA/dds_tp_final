import React, { useState, useEffect } from "react";
import  {librosJWTService}  from "../../services/librosJWT.service";




function LibrosJWT() {
  const tituloPagina = "Libros JWT (solo para admintradores)";
  const [libros, setLibros] = useState(null);


  // cargar al iniciar el componente, solo una vez
  useEffect(() => {
    BuscarLibrosJWT();
  }, []);


  async function BuscarLibrosJWT() {
     try {
      let data = await librosJWTService.Buscar();
      setLibros(data);
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
            <th style={{ width: "20%" }}>IdLibro</th>
            <th style={{ width: "50%" }}>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {libros &&
            libros.map((autor) => (
              <tr key={autor.IdLibro}>
                <td>{autor.IdLibro}</td>
                <td>{autor.Nombre}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}


export { LibrosJWT };


