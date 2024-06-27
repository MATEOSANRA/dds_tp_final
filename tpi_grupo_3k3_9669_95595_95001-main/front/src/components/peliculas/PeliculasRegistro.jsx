import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function PeliculasRegistro({
  AccionABMC,
  Directores,
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
                Nombre de la película<span className="text-danger">*</span>:
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

          {/* campo FechaPublicacion */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="FechaPublicacion">
                Fecha Publicacion<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("FechaPublicacion", {
                  required: {
                    value: true,
                    message: "La fecha de publicacion es requerida",
                  },
                })}
                className={
                  "form-control " +
                  (errors?.FechaPublicacion ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.FechaPublicacion?.message}
              </div>
            </div>
          </div>

          {/* campo Iddd */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="IdDirector">
                Director<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                {...register("IdDirector", {
                  required: {
                    value: true,
                    message: "El director es requerido",
                  },
                })}
                className={
                  "form-control " + (errors?.IdDirector ? "is-invalid" : "")
                }
              >
                <option value="" key={1}></option>
                {Directores?.map((x) => (
                  <option value={x.IdDirector} key={x.IdDirector}>
                    {x.Nombre}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">
                {errors?.IdDirector?.message}
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

          {/* campo Recaudacion */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Recaudacion">
                Recaudacion<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                step=".01"
                {...register("Recaudacion", {
                  required: {
                    value: true,
                    message: "La Recaudacion es requerida",
                  },
                  min: {
                    value: 100,
                    message: "Recaudacion debe ser mayor a 100",
                  },
                  max: {
                    value: 999999999,
                    message: "Recaudacion debe ser menor o igual a 999999999",
                  },
                })}
                className={
                  "form-control " + (errors?.Recaudacion ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.Recaudacion?.message}
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
