import React, { useState, useEffect } from "react";
import moment from "moment";
import CarnetsBuscar from "./CarnetsBuscar";
import CarnetsListado from "./CarnetsListado";
import CarnetsRegistro from "./CarnetsRegistro";
import { carnetsFamiliasMockService as carnetsFamiliasService } from "../../services/carnetsFamilias-mock.service";

function Carnets() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Nombre, setNombre] = useState("");
  const [Activo, setActivo] = useState("");

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

  const [CarnetsFamilias, setCarnetsFamilias] = useState(null);

  // cargar al "montar" el componente, solo la primera vez (por la dependencia [])
  useEffect(() => {
    async function BuscarCarnetsFamilas() {
      let data = await carnetsFamiliasService.Buscar();
      setCarnetsFamilias(data);
    }
    BuscarCarnetsFamilas();
  }, []);

async function Buscar() {
    setAccionABMC("L");
    // harcodeamos 2 carnets para probar
    setItems([
      {
        IdCarnet: 108,
        Nombre: "Vanessa rubio",
        ValorCuota: 219.0,
        CodigoDeBarra: "AA000ET",
        IdCarnetFamilia: 9,
        FechaAlta: "2017-01-23T00:00:00",
        Activo: false,
      },
      {
        IdCarnet: 139,
        Nombre: "Marcos Lopez",
        ValorCuota: 5899.0,
        CodigoDeBarra: "AD238OU",
        IdCarnetFamilia: 7,
        FechaAlta: "2017-01-04T00:00:00",
        Activo: true,
      },
    ]);
    alert("Buscando...");
  }

  async function BuscarPorId(item, accionABMC) {
    setAccionABMC(accionABMC);
    setItem(item);
    if (accionABMC === "C") {
      alert("Consultando...");
    }
    if (accionABMC === "M") {
      alert("Modificando...");
    }
  }

  function Consultar(item) {
    BuscarPorId(item, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }
  function Modificar(item) {
    if (!item.Activo) {
      alert("No puede modificarse un registro Inactivo.");
      return;
    }
    BuscarPorId(item, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  async function Agregar() {
    setAccionABMC("A");
    setItem({
        IdCarnet: 0,
        Nombre: '',
        ValorCuota: '',
        CodigoDeBarra: '',
        IdCarnetFamilia: '',
        FechaAlta: moment(new Date()).format("YYYY-MM-DD"),
        Activo: true,
      });
    alert("preparando el Alta...");
    console.log(Item);
  }


  function Imprimir() {
    alert("En desarrollo...");
  }

  async function ActivarDesactivar(item) {
    const resp = window.confirm(
      "Está seguro que quiere " +
        (item.Activo ? "desactivar" : "activar") +
        " el registro?"
    );
    if (resp) {
      alert("Activando/Desactivando...");
    }
  }

  async function Grabar(item) {
    alert(
      "Registro " +
        (AccionABMC === "A" ? "agregado" : "modificado") +
        " correctamente."
    );

    Volver();
  }

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Carnets <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      { AccionABMC === "L" && <CarnetsBuscar
        Nombre={Nombre}
        setNombre={setNombre}
        Activo={Activo}
        setActivo={setActivo}
        Buscar={Buscar}
        Agregar={Agregar}
      />
        }

      {/* Tabla de resutados de busqueda y Paginador */}
      
      {AccionABMC === "L" && Items?.length > 0 && 
      <CarnetsListado
        {...{
          Items,
          Consultar,
          Modificar,
          ActivarDesactivar,
          Imprimir,
          Pagina,
          RegistrosTotal,
          Paginas,
          Buscar,
        }}
      />
        }
{AccionABMC === "L" && Items?.length === 0 && 
      <div className="alert alert-info mensajesAlert">
        <i className="fa fa-exclamation-sign"></i>
        No se encontraron registros...
      </div>
}

      {/* Formulario de alta/modificacion/consulta */}
      {AccionABMC !== "L" && 
      <CarnetsRegistro
        {...{ AccionABMC, CarnetsFamilias, Item, Grabar, Volver }}
      />
        }
    </div>
  );
}
export { Carnets };
