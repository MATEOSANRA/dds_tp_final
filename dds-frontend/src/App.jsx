// Define mucho sobre como se consume datos de una BD
// Ademas, aca se debe definir si nuestra pagina debe tener diferentes paginas
// la parte de route es para redirijir al inicio
//Aca se pone el footer

import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {Inicio} from "./components/Inicio";
import {CarnetsFamilias} from './components/CarnetsFamilias';
import {Menu} from "./components/Menu";
import { Footer } from "./components/Footer";
function App() {
  return (
    <>
      <BrowserRouter>
      <Menu />
        <div className="divBody">
            <Routes>
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/carnetsfamilias" element={<CarnetsFamilias />} />
              <Route path="*" element={<Navigate to="/Inicio" replace />} />
            </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>

  );
}
export default App;




/*
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

*/
