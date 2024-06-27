import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function CancionesRegistro({
  AccionABMC,
  Artistas,
  Item,
  Grabar,
  Volver,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ values: Item });

  const onSubmit = (data) => {
    Grabar(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">
        <fieldset disabled={AccionABMC === "C"}>
          {/* campo nombre */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Nombre">
                Nombre de la cancion<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("Nombre", {
                  required: { value: true, message: "El nombre es requerido" },
                  minLength: {
                    value: 5,
                    message: "El nombre debe tener al menos 5 caracter",
                  },
                  maxLength: {
                    value: 55,
                    message: "El nombre debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.Nombre ? "is-invalid" : "")
                }
              />
              {errors?.Nombre && touchedFields.Nombre && (
                <div className="invalid-feedback">
                  {errors?.Nombre?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo FechaLanzamiento */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="FechaLanzamiento">
                Fecha Lanzamiento<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("FechaLanzamiento", {
                  required: {
                    value: true,
                    message: "La fecha de lanzamiento es requerida",
                  },
                })}
                className={
                  "form-control " +
                  (errors?.FechaLanzamiento ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.FechaLanzamiento?.message}
              </div>
            </div>
          </div>

          {/* campo Iddd */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="IdArtista">
                Artista<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                {...register("IdArtista", {
                  required: {
                    value: true,
                    message: "El artista es requerido",
                  },
                })}
                className={
                  "form-control " + (errors?.IdArtista ? "is-invalid" : "")
                }
              >
                <option value="" key={1}></option>
                {Artistas?.map((x) => (
                  <option value={x.IdArtista} key={x.IdArtista}>
                    {x.Nombre}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">
                {errors?.IdArtista?.message}
              </div>
            </div>
          </div>

          {/* campo Duracion */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Duracion">
                Duracion (en minutos)<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                step=".01"
                {...register("Duracion", {
                  required: {
                    value: true,
                    message: "La duracion es requerida",
                  },
                  min: {
                    value: 0.01,
                    message: "Duracion debe ser mayor a 0",
                  },
                  max: {
                    value: 99999.99,
                    message: "Duracion debe ser menor o igual a 99999.99",
                  },
                })}
                className={
                  "form-control " + (errors?.Duracion ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.Duracion?.message}
              </div>
            </div>
          </div>

          {/* campo Genero */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Genero">
                Genero<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("Genero", {
                  required: { value: true, message: "El genero es requerido" },
                  minLength: {
                    value: 2,
                    message: "El genero debe tener al menos 2 caracteres",
                  },
                  maxLength: {
                    value: 55,
                    message: "El genero debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.Genero ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.Genero?.message}
              </div>
            </div>
          </div>
        </fieldset>

        {/* Botones Grabar, Cancelar/Volver' */}
        <hr />
        <div className="row justify-content-center">
          <div className="col text-center botones">
            {AccionABMC !== "C" && (
              <button type="submit" className="btn btn-primary">
                <i className="fa fa-check"></i> Grabar
              </button>
            )}
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => Volver()}
            >
              <i className="fa fa-undo"></i>
              {AccionABMC === "C" ? " Volver" : " Cancelar"}
            </button>
          </div>
        </div>

        {/* texto: Revisar los datos ingresados... */}
        {!isValid && isSubmitted && (
          <div className="row alert alert-danger mensajesAlert">
            <i className="fa fa-exclamation-sign"></i>
            Revisar los datos ingresados...
          </div>
        )}
      </div>
    </form>
  );
}
