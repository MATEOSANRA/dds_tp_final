import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function EstadiosRegistro({
  AccionABMC,
  Provincias,
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
                Nombre<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("Nombre", {
                  required: { value: true, message: "Nombre es requerido" },
                  minLength: {
                    value: 1,
                    message: "Nombre debe tener al menos 1 caracter",
                  },
                  maxLength: {
                    value: 55,
                    message: "Nombre debe tener como máximo 55 caracteres",
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

          {/* campo Capacidad */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Capacidad">
                Capacidad<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number" step="1"
                {...register("Capacidad", {
                  required: { value: true, message: "Capacidad es requerido" },
                  min: {
                    value: 1,
                    message: "Capacidad debe ser mayor a 0",
                  },
                  max: {
                    value: 99999999999999,
                    message: "No hay tantas personas en el planeta",
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Las personas no son decimales...",
                  },
                })}
                className={
                  "form-control " + (errors?.Capacidad ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.Capacidad?.message}</div>
            </div>
          </div>


          {/* campo FechaInauguracion */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="FechaInauguracion">
                Fecha Inauguracion<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("FechaInauguracion", {
                  required: { value: true, message: "Fecha Inauguracion es requerido" }
                })}
                className={
                  "form-control " + (errors?.FechaInauguracion ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.FechaInauguracion?.message}
              </div>
            </div>
          </div>

          {/* campo IdProvincia */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="IdProvincia">
                Provincia<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                {...register("IdProvincia", {
                  required: { value: true, message: "Provincia es requerido" },
                })}
                className={
                  "form-control " +
                  (errors?.IdProvincia ? "is-invalid" : "")
                }
              >
                <option value="" key={1}></option>
                {Provincias?.map((x) => (
                  <option value={x.IdProvincia} key={x.IdProvincia}>
                    {x.Nombre}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">
                {errors?.IdProvincia?.message}
              </div>
            </div>
          </div>

          {/* campo Abono */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Abono">
                Abono<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number" step=".01"
                {...register("Abono", {
                  required: { value: true, message: "Abono es requerido" },
                  min: {
                    value: 0.01,
                    message: "Abono debe ser mayor a 0",
                  },
                  max: {
                    value: 99999.99,
                    message: "Abono debe ser menor o igual a 99999.99",
                  },
                })}
                className={
                  "form-control " + (errors?.Abono ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.Abono?.message}</div>
            </div>
          </div>

          {/* campo Activo */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Activo">
                Activo<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                name="Activo"
                {...register("Activo", {
                  required: { value: true, message: "Activo es requerido" },
                })}
                className={
                  "form-control" + (errors?.Activo ? " is-invalid" : "")
                }
                disabled
              >
                <option value={null}></option>
                <option value={false}>NO</option>
                <option value={true}>SI</option>
              </select>
              <div className="invalid-feedback">{errors?.Activo?.message}</div>
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
