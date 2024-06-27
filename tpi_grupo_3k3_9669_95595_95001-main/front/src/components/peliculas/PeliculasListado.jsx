import React from "react";
import moment from "moment";

function convertirAMinutosYHoras(minutosTotales) {
  const horas = Math.floor(minutosTotales / 60);
  const minutos = minutosTotales % 60;
  return `${horas}h ${minutos}m`;
}

export default function PeliculasListado({
  Items,
  Consultar,
  Modificar,
  ActivarDesactivar,
  Imprimir,
  Pagina,
  RegistrosTotal,
  Paginas,
  Buscar,
}) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped table-hover table-dark">
        <thead>
          <tr>
            <th style={{ width: "30%" }}>Nombre</th>
            <th style={{ width: "20%" }}>Fecha de Publicacion</th>
            <th style={{ width: "20%" }}>Duracion</th>
            <th style={{ width: "20%" }}>Recaudacion</th>
            <th style={{ width: "10%" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => (
              <tr key={Item.IdPelicula}>
                <td>{Item.Nombre}</td>
                <td className="text-center">
                  {moment(Item.FechaPublicacion).format("DD/MM/YYYY")}
                </td>
                <td className="text-center">
                  {convertirAMinutosYHoras(Item.Duracion)}
                </td>
                <td className="text-center">{Item.Recaudacion} u$d</td>
                <td className="text-center text-nowrap">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Consultar"
                    onClick={() => Consultar(Item)}
                  >
                    <i className="fa fa-eye"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Modificar"
                    onClick={() => Modificar(Item)}
                  >
                    <i className="fa fa-pencil"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Paginador*/}
      <div className="paginador">
        <div className="row">
          <div className="col">
            <span className="pyBadge">Registros: {RegistrosTotal}</span>
          </div>
          <div className="col text-center">
            Pagina: &nbsp;
            <select
              value={Pagina}
              onChange={(e) => {
                Buscar(e.target.value);
              }}
            >
              {Paginas?.map((x) => (
                <option value={x} key={x}>
                  {x}
                </option>
              ))}
            </select>
            &nbsp; de {Paginas?.length}
          </div>

          <div className="col"></div>
        </div>
      </div>
    </div>
  );
}
