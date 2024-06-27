import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Inicio } from "./components/Inicio";
import { Autores } from "./components/Autores";
import { Menu } from "./components/Menu";
import { Footer } from "./components/Footer";
import { Libros } from "./components/libros/Libros";
import { Directores } from "./components/Directores";
import { Peliculas } from "./components/peliculas/Peliculas";
import { PeliculasJWT } from "./components/peliculasJWT/peliculasJWT";
import { Artistas } from "./components/Artistas";
import { Canciones } from "./components/canciones/Canciones";
import { ModalDialog } from "./components/ModalDialog";
import { LibrosJWT } from "./components/librosJWT/LibrosJWT";
import { CancionesJWT } from "./components/cancionesJWT/CancionesJWT";
import { RequireAuth } from "./components/RequiereAuth";
import { Login } from "./components/login/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <ModalDialog />
        <Menu />
        <div className="divBody">
          <Routes>
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/autores" element={<Autores />} />
            <Route path="/libros" element={<Libros />} />
            <Route
              path="/librosjwt"
              element={
                <RequireAuth>
                  <LibrosJWT />
                </RequireAuth>
              }
            />
            <Route path="/directores" element={<Directores />} />
            <Route path="/peliculas" element={<Peliculas />} />
            <Route
              path="/peliculasJWT"
              element={
                <RequireAuth>
                  {" "}
                  <PeliculasJWT />
                </RequireAuth>
              }
            />
            <Route path="/artistas" element={<Artistas />} />
            <Route path="/canciones" element={<Canciones />} />
            <Route
              path="/cancionesjwt"
              element={
                <RequireAuth>
                  <CancionesJWT />
                </RequireAuth>
              }
            />
            <Route path="/login/:componentFrom" element={<Login />} />
            <Route path="*" element={<Navigate to="/inicio" replace />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;
