import "../App.css";
import { Link } from "react-router-dom";

function Inicio() {
  return (
    <div
      className="mt-5 p-5 rounded bg-dark text-white"
      style={{ backgroundColor: "lightgreen" }}
    >
      <h1 style={{ textAlign: 'center' }}>Centro Deportivo</h1>
      <p style={{ textAlign: 'center' }}>
        Explora el deporte más concurrido y practicado del país con
        esta nueva página. Todo lo que necesitás saber sobre futbol 
        lo vas a encontrar aca.
      </p>
      <p style={{ textAlign: 'center' }}>
        Vas a tener al alcance de tu mano toda la información de 
        la liga de futbol más competitiva de Sudamérica.
      </p>
      <p style={{ textAlign: 'center' }}>¡Aprende, y sumate a este gran deporte!</p>
      <Link to="/ligas" className="btn btn-primary">
        <i className="fa fa-search"></i> Ligas Disponibles
      </Link>
      <span> </span>
      <span></span>
    </div>
  );
}

export { Inicio };
