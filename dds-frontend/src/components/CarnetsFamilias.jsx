import React, {useState, useEffect} from 'react';
import { carnetsFamiliasMockService } from '../services/carnetsFamilias-mock.service';
function CarnetsFamilias() {
  const tituloPagina = 'CarnetsFamilias';
  const [carnetsFamilias, setCarnetsFamilias] = useState(null);
  // cargar al montar el componente (solo una vez)
  useEffect(() => {
    BuscarCarnetsFamilas();
  }, []);
  async function BuscarCarnetsFamilas() {
    let data = await carnetsFamiliasMockService.Buscar();
    setCarnetsFamilias(data);
  };
  return (
    <div>
      <div className="tituloPagina">{tituloPagina}</div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th style={{ width: "40%" }}>IdCarnetFamilia</th>
            <th style={{ width: "60%" }}>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {carnetsFamilias &&
            carnetsFamilias.map((carnetfamilia) => (
              <tr key={carnetfamilia.IdCarnetFamilia}>
                <td>{carnetfamilia.IdCarnetFamilia}</td>
                <td>{carnetfamilia.Nombre}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export {CarnetsFamilias};


