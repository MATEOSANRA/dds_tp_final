import React from "react";
import { useForm } from "react-hook-form";

export default function CarnetsRegistro({
  AccionABMC,
  CarnetsFamilias,
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
  if (!Item) return null;
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
                    value: 4,
                    message: "Nombre debe tener al menos 4 caracteres",
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

          {/* campo ValorCuota */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="ValorCuota">
                ValorCuota<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
            <input
                type="number" step=".01"
                {...register("ValorCuota", {
                  required: { value: true, message: "Valor de Cuota es requerido" },
                  min: {
                    value: 0.01,
                    message: "Valor de Cuota debe ser mayor a 0",
                  },
                  max: {
                    value: 99999.99,
                    message: "Valor de Cuota debe ser menor o igual a 99999.99",
                  },
                })}
                className={
                  "form-control " + (errors?.ValorCuota ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.ValorCuota?.message}</div>
            </div>
          </div>

         
          {/* campo CodigoDeBarra */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="CodigoDeBarra">
                Codigo De Barra<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
            <input
                type="text"
                {...register("CodigoDeBarra", {
                  required: {
                    value: true,
                    message: "Codigo De Barra es requerido",
                  },
                  pattern: {
                    value: /^[A-Z]{2}[0-9]{3}[A-Z]{2}$/,
                    message: "Codigo De Barra debe tener el formato AA000AA (2 letras, 3 números, 2 letras)",
                  },
                  
                })}
                className={
                  "form-control" + (errors?.CodigoDeBarra ? " is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.CodigoDeBarra?.message}
              </div>
            </div>
          </div>

          {/* campo idcarnetfamilia */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="IdCarnetFamilia">
                Familia<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
            <select
                {...register("IdCarnetFamilia", {
                  required: { value: true, message: "Familia es requerido" },
                })}
                className={
                  "form-control " +
                  (errors?.IdCarnetFamilia ? "is-invalid" : "")
                }
              >
                <option value="" key={1}></option>
                {CarnetsFamilias?.map((x) => (
                  <option value={x.IdCarnetFamilia} key={x.IdCarnetFamilia}>
                    {x.Nombre}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">
                {errors?.IdCarnetFamilia?.message}
              </div>
            </div>
          </div>

          {/* campo FechaAlta */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="FechaAlta">
                Fecha Alta<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
            <input
                type="date"
                {...register("FechaAlta", {
                  required: { message: "Fecha Alta es requerido" }
                })}
                className={
                  "form-control " + (errors?.FechaAlta ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.FechaAlta?.message}
              </div>
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
        <div className="row alert alert-danger mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          Revisar los datos ingresados...
        </div>

      </div>
    </form>
  );
}
