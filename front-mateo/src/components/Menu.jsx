import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthService from "../services/auth.service";

function Menu() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(
    AuthService.getUsuarioLogueado()
  );

  function CambioUsuarioLogueado(_usuarioLogueado) {
    setUsuarioLogueado(_usuarioLogueado);
  }

  useEffect(() => {
    AuthService.subscribeUsuarioLogueado(CambioUsuarioLogueado);
    return () => {
      AuthService.subscribeUsuarioLogueado(null);
    };
  }, []);

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-md">
      <div className="container-fluid">
        <a className="navbar-brand" href="#!">
          <i className=""></i>
          &nbsp;<i>⚽</i>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/inicio">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/ligas">
                Ligas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/clubes">
                Clubes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                title="exclusivo para administradores"
                to="/clubesjwt"
              >
                Clubes JWT
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/posiciones">
                Posiciones
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/jugadores">
                Jugadores
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                title="exclusivo para administradores"
                to="/jugadoresjwt"
              >
                Jugadores JWT
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/provincias">
                Provincias
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/estadios">
                Estadios
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                title="exclusivo para administradores"
                to="/estadiosjwt"
              >
                Estadios JWT
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            {usuarioLogueado && (
              <li className="nav-item">
                <a className="nav-link" href="#!">
                  Bienvenido: {usuarioLogueado}
                </a>
              </li>
            )}
            <li className="nav-item">
              <NavLink className="nav-link" to="/login/Inicio">
                <span
                  className={usuarioLogueado ? "text-warning" : "text-success"}
                >
                  <i
                    className={
                      usuarioLogueado ? "fa fa-sign-out" : "fa fa-sign-in"
                    }
                  ></i>
                </span>
                {usuarioLogueado ? " Logout" : " Login"}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export { Menu };
