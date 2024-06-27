import React, { useState, useEffect } from "react";
import moment from "moment";
import CarnetsBuscar from "./CarnetsBuscar";
import CarnetsListado from "./CarnetsListado";
import CarnetsRegistro from "./CarnetsRegistro";
//import { carnetsFamiliasMockService as carnetsFamiliasService } from "../../services/carnetsFamilias-mock.service";
import { carnetsService } from "../../services/carnets.service";
import { carnetsFamiliasService } from "../../services/carnetsFamilias.service";


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
    return () => {
      //console.log("unmounting Carnets");
    };
  }, []);

  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    }
    // OJO Pagina (y cualquier estado...) se actualiza para el proximo render, para buscar usamos el parametro _pagina
    else {
      _pagina = Pagina;
    }

    const data = await carnetsService.Buscar(Nombre, Activo, _pagina);
    setItems(data.Items);
    setRegistrosTotal(data.RegistrosTotal);

    //generar array de las páginas para mostrar en select del paginador
    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }


  async function BuscarPorId(item, accionABMC) {
    const data = await carnetsService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
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
        IdArticulo: 0,
        Nombre: '',
        Precio: '',
        Stock: '',
        CodigoDeBarra: '',
        IdArticuloFamilia: '',
        FechaAlta: moment(new Date()).format("YYYY-MM-DD"),
        Activo: true,
      });
    alert("preparando el Alta...");
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
    await carnetsService.ActivarDesactivar(item);
    await Buscar();
  }
}


async function Grabar(item) {
  // agregar o modificar
  try
  {
    await articulosService.Grabar(item);
  }
  catch (error)
  {
    alert(error?.response?.data?.message ?? error.toString())
    return;
  }
  await Buscar();
  Volver();

  setTimeout(() => {
    alert(
      "Registro " +
        (AccionABMC === "A" ? "agregado" : "modificado") +
        " correctamente."
    );
  }, 0);
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
      {AccionABMC === "L" && Items?.length > 0 &&  <CarnetsListado
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

{AccionABMC === "L" && Items?.length === 0 &&  <div className="alert alert-info mensajesAlert">
        <i className="fa fa-exclamation-sign"></i>
        No se encontraron registros...
      </div>
}

      {/* Formulario de alta/modificacion/consulta */}
      {AccionABMC !== "L" && 
      <CarnetsRegistro
        {...{ AccionABMC, CarnetsFamilias, Item, Grabar, Volver }}
      /> }
    </div>
  );
}
export { Carnets };
