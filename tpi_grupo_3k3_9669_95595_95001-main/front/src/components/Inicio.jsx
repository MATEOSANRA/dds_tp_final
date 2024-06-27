import "../App.css";
import { Link } from "react-router-dom";

function Inicio() {
  return (
    <div
      className="mt-5 p-5 rounded bg-dark text-white"
      style={{ backgroundColor: "lightgray" }}
    >
      <h1>Centro Cultural</h1>
      <p>
        Descubre un mundo de cultura y conocimiento en nuestro Centro Cultural.
        Explora nuestra amplia colección de libros junto a sus autores,
        sumérgete en el fascinante universo
      </p>
      <p>
        del cine con una selección curada de películas, y disfruta de una
        diversa gama de música para todos los gustos. Aquí, cada rincón está
        diseñado para alimentar tu mente y espíritu.
      </p>
      <p>¡Explora, aprende y déjate inspirar!</p>
      <Link to="/autores" className="btn btn-primary">
        <i className="fa fa-search"></i> Autores Disponibles
      </Link>
      <span> </span>
      <span></span>
      <Link to="/directores" className="btn btn-primary">
        <i className="fa fa-search"></i> Directores Disponibles
      </Link>
      <span> </span>
      <span></span>
      <Link to="/artistas" className="btn btn-primary">
        <i className="fa fa-search"></i> Artistas Disponibles
      </Link>
    </div>
  );
}

export { Inicio };
