import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {Inicio} from "./components/Inicio";
import {CarnetsFamilias} from "./components/CarnetsFamilias";
import {Menu} from "./components/Menu";
import { Footer } from "./components/Footer";
import { Carnets } from "./components/carnets/Carnets";



function App() {
  return (
    <>
      <BrowserRouter>
      <Menu />
        <div className="divBody">
            <Routes>
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/carnetsfamilias" element={<CarnetsFamilias />} />
              <Route path="*" element={<Navigate to="/inicio" replace />} />
              <Route path="/carnets" element={<Carnets/>} />
            </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;

