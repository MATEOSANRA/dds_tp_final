import React, { useState, useEffect } from "react";
import moment from "moment";
import ClubesBuscar from "./ClubesBuscar";
import ClubesListado from "./ClubesListado";
import ClubesRegistro from "./ClubesRegistro";
import { clubesService } from "../../services/clubes.service";
import { ligasService } from "../../services/ligas.service";
//import { autoresMockService as autoresService } from "../../services/autores-mock.service";
import modalDialogService from "../../services/modalDialog.service";

function Clubes() {
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

  const [Ligas, setLigas] = useState(null);

  // cargar al "montar" el componente, solo la primera vez (por la dependencia [])
  useEffect(() => {
    async function BuscarLigas() {
      let data = await ligasService.Buscar();
      setLigas(data);
    }
    BuscarLigas();
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
    const data = await clubesService.Buscar(Nombre, _pagina);
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
    const data = await clubesService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }

  function Consultar(item) {
    BuscarPorId(item, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }
  function Modificar(item) {
    if (!item.Abierto) {
      //alert("No puede modificarse un club No Abierto.");
      modalDialogService.Alert("No puede modificarse un club Cerrado.");
      return;
    }
    BuscarPorId(item, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  async function Agregar() {
    setAccionABMC("A");
    setItem({
      IdClub: 0,
      Nombre: "",
      FechaFundacion: moment(new Date()).format("YYYY-MM-DD"),
      IdLiga: "",
      Abono: "",
      Abierto: true,
    });
    //modalDialogService.Alert("preparando el Alta...");
  }

  function Imprimir() {
    modalDialogService.Alert("En desarrollo...");
  }

  async function ActivarDesactivar(item) {
    modalDialogService.Confirm(
      "Esta seguro que quiere " +
      (item.Abierto ? "Habilitar el club" : "Deshabilitar el club") +
      " el registro?",
      undefined,
      undefined,
      undefined,
      async () => {
        await clubesService.ActivarDesactivar(item);
        await Buscar();
      }
    );
  }

  async function Grabar(item) {
    // agregar o modificar
    try {
      await clubesService.Grabar(item);
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
        Clubes <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        <ClubesBuscar
          Nombre={Nombre}
          setNombre={setNombre}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {/* Tabla de resutados de busqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 && (
        <ClubesListado
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
        <ClubesRegistro {...{ AccionABMC, Ligas, Item, Grabar, Volver }} />
      )}
    </div>
  );
}
export { Clubes };
