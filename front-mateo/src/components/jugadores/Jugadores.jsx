import React, { useState, useEffect } from "react";
import moment from "moment";
import JugadoresBuscar from "./JugadoresBuscar";
import JugadoresListado from "./JugadoresListado";
import JugadoresRegistro from "./JugadoresRegistro";
import { jugadoresService } from "../../services/jugadores.service";
import { posicionesService } from "../../services/posiciones.service";
//import { autoresMockService as autoresService } from "../../services/autores-mock.service";
import modalDialogService from "../../services/modalDialog.service";

function Jugadores() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Nombre, setNombre] = useState("");

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

  const [Posiciones, setPosiciones] = useState(null);

  // cargar al "montar" el componente, solo la primera vez (por la dependencia [])
  useEffect(() => {
    async function BuscarPosiciones() {
      let data = await posicionesService.Buscar();
      setPosiciones(data);
    }
    BuscarPosiciones();
  }, []);

  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    }
    // OJO Pagina (y cualquier estado...) se actualiza para el proximo render, para buscar usamos el parametro _pagina
    else {
      _pagina = Pagina;
    }
    modalDialogService.BloquearPantalla(true);
    const data = await jugadoresService.Buscar(Nombre, _pagina);
    modalDialogService.BloquearPantalla(false);
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
    const data = await jugadoresService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }

  function Consultar(item) {
    BuscarPorId(item, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }
  function Modificar(item) {
    if (!item.Retirado) {
      //alert("No puede modificarse un jugador Retirado.");
      modalDialogService.Alert("No puede modificarse un jugador Retirado.");
      return;
    }
    BuscarPorId(item, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  async function Agregar() {
    setAccionABMC("A");
    setItem({
      IdJugador: 0,
      Nombre: "",
      FechaNacimiento: moment(new Date()).format("YYYY-MM-DD"),
      IdPosicion: "",
      Retirado: true,
    });
    //modalDialogService.Alert("preparando el Alta...");
  }

  function Imprimir() {
    modalDialogService.Alert("En desarrollo...");
  }

  async function ActivarDesactivar(item) {
    modalDialogService.Confirm(
      "Esta seguro que quiere " +
      (item.Retirado ? "Retirar el jugador" : "Volver del retiro al jugador") +
      " el registro?",
      undefined,
      undefined,
      undefined,
      async () => {
        await jugadoresService.ActivarDesactivar(item);
        await Buscar();
      }
    );
  }

  async function Grabar(item) {
    // agregar o modificar
    try {
      await jugadoresService.Grabar(item);
    } catch (error) {
      modalDialogService.Alert(
        error?.response?.data?.message ?? error.toString()
      );
      return;
    }
    await Buscar();
    Volver();

    //setTimeout(() => {
    modalDialogService.Alert(
      "Registro " +
      (AccionABMC === "A" ? "agregado" : "modificado") +
      " correctamente."
    );
    //}, 0);
  }

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Jugadores <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        <JugadoresBuscar
          Nombre={Nombre}
          setNombre={setNombre}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {/* Tabla de resutados de busqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 && (
        <JugadoresListado
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
      )}

      {AccionABMC === "L" && Items?.length === 0 && (
        <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
        </div>
      )}

      {/* Formulario de alta/modificacion/consulta */}
      {AccionABMC !== "L" && (
        <JugadoresRegistro {...{ AccionABMC, Posiciones, Item, Grabar, Volver }} />
      )}
    </div>
  );
}
export { Jugadores };
