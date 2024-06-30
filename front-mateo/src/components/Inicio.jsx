import "../App.css";
import { Link } from "react-router-dom";

function Inicio() {
  return (
    <div
      className="mt-5 p-5 rounded bg-dark text-white"
      style={{ backgroundColor: "lightgreen" }}
    >
      <h1 style={{ textAlign: "center" }}>Centro Deportivo</h1>
      <p>
        Explora el deporte más concurrido y practicado del país con
        esta nueva página. Todo lo que necesitás saber sobre futbol
        lo vas a encontrar aca.
      </p>
      <p>
        Vas a tener al alcance de tu mano toda la información de
        la liga de futbol más competitiva de Sudamérica.
      </p>
      <p>¡Aprende, y sumate a este gran deporte!</p>
      <div style={{ textAlign: "center" }}>
        <Link to="/clubes" className="btn btn-primary">
          <i className="fa fa-search"></i> Clubes Disponibles
        </Link>
        <Link to="/jugadores" className="btn btn-primary">
          <i className="fa fa-search"></i> Jugadores Disponibles
        </Link>
        <Link to="/estadios" className="btn btn-primary">
          <i className="fa fa-search"></i> Estadios Disponibles
        </Link>
      </div>
    </div>
  );
}

export { Inicio };
