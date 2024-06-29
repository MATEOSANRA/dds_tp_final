import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Inicio } from "./components/Inicio";
import { Ligas } from "./components/Ligas";
import { Menu } from "./components/Menu";
import { Footer } from "./components/Footer";
import { Clubes } from "./components/clubes/Clubes";
import { ModalDialog } from "./components/ModalDialog";
import { ClubesJWT } from "./components/clubesJWT/ClubesJWT";
import { Posiciones } from "./components/Posiciones";
import { Jugadores } from "./components/jugadores/Jugadores";
import { JugadoresJWT } from "./components/jugadoresJWT/JugadoresJWT";
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
            <Route path="/ligas" element={<Ligas />} />
            <Route path="/clubes" element={<Clubes />} />
            <Route
              path="/clubesjwt" element={ <RequireAuth>
                                              <ClubesJWT />
                                          </RequireAuth>
              }
            />

            <Route path="/posiciones" element={<Posiciones />} />
            <Route path="/jugadores" element={<Jugadores />} />
            <Route
              path="/jugadoresjwt" element={ <RequireAuth>
                                              <JugadoresJWT />
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
