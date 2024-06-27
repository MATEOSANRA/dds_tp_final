import React from "react";
import moment from "moment";
const convertirDuracion = (duracion) => {
  const minutos = Math.floor(duracion);
  const segundos = Math.round((duracion - minutos) * 60);
  return `${minutos}:${segundos.toString().padStart(2, '0')}`;
};
export default function CancionesListado({
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
            <th style={{ width: "20%" }}>Fecha de Lanzamiento</th>
            <th style={{ width: "20%" }}>Duracion</th>
            <th style={{ width: "20%" }}>Genero</th>
            <th style={{ width: "10%" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => (
              <tr key={Item.IdCancion}>
                <td>{Item.Nombre}</td>
                <td className="text-center">
                  {moment(Item.FechaLanzamiento).format("DD/MM/YYYY")}
                </td>
                <td className="text-center">
                  {convertirDuracion(Item.Duracion)}
                </td>
                <td className="text-center">{Item.Genero}</td>
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

          <div className="col"><button className="btn btn-primary float-end" onClick={() => Imprimir()}>
              <i className="fa fa-print"></i>Imprimir
            </button></div>
        </div>
      </div>
    </div>
  );
}
