import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Inicio } from "./components/Inicio";
import LigasJWT from "./components/ligas/LigasJWT";
import { Menu } from "./components/Menu";
import { Footer } from "./components/Footer";
import { Clubes } from "./components/clubes/Clubes";
import { ModalDialog } from "./components/ModalDialog";
import { Posiciones } from "./components/posiciones/Posiciones";
import PosicionesJWT from "./components/posiciones/PosicionesJWT";
import { Jugadores } from "./components/jugadores/Jugadores";
import { RequireAuth } from "./components/RequiereAuth";
import { Login } from "./components/login/Login";
import { Provincias } from "./components/provincias/Provincias";
import ProvinciasJWT from "./components/provincias/ProvinciasJWT";
import { Estadios } from "./components/estadios/Estadios";


function App() {
  return (
    <>
      <BrowserRouter>
        <ModalDialog />
        <Menu />
        <div className="divBody">
          <Routes>
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/clubes" element={<Clubes />} />
            <Route
              path="/ligasjwt" element={<RequireAuth>
                <LigasJWT />
              </RequireAuth>
              }
            />

            <Route path="/posiciones" element={<Posiciones />} />
            <Route path="/jugadores" element={<Jugadores />} />
            <Route
              path="/posicionesjwt" element={<RequireAuth>
                <PosicionesJWT />
              </RequireAuth>
              }
            />

            <Route path="/provincias" element={<Provincias />} />
            <Route path="/estadios" element={<Estadios />} />
            <Route
              path="/provinciasjwt" element={<RequireAuth>
                <ProvinciasJWT />
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
