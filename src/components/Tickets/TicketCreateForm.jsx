import { useForm } from "react-hook-form";
import Select from "@components/Form/Input/Select";
import { useState, useRef } from "react";
import InputForm from "@components/Form/Input/InputForm";
import Button from "../partials/Button/Button";
import DatalistChangeInput from "@components/Form/Input/DatalistCangeInput";
import solicitantes from "../../../public/assets/solicitantes.json";
import TextArea from "@components/Form/Input/TextArea";
import { useNavigate } from "react-router";
import useAuth from "@servicios/UseAuth";
import DragAndDrop from "../Form/dragAndDrop";
import SelectWithOption from "../Form/Input/SelectWithOption";
import "./TicketCreateForm.css";

const REGEX_EMAIL = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

const optionListSelect = [
  "COMPUTOS",
  "TELEFONIA",
  "SOPORTE",
  "SISTEMAS",
  "GDE",
];
const optionListAreaSolicitante = [
  "ADMINISTRACION",
  "RRHH",
  "CONTABILIDAD",
  "LEGALES",
];
const sedes = ["NUEVE_DE_JULIO", "ANEXO1", "ANEXO2", "ANEXO3"];
const datalistSolicitante = solicitantes.map((s) => s.email);

const TicketCreateForm = ({ prioridad }) => {
  const { user } = useAuth();
  const dragAndDropRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // const dragAndDropData = dragAndDropRef.current.getData();
    // const formData = { ...data, dragAndDropData, prioridad };
    const formData = { ...data };
    if (user.sector[0] !== "GDE")
      formData.area_asignada = optionListSelect.indexOf(user.sector[0].toUpperCase()) + 1;
    console.log(formData);
    // let images = dragAndDropData.map((image) => image.name).join(";");
    let body = {
      email_solicitante: formData.email,
      nombre_solicitante: formData.solicitante,
      telefono_solicitante: formData.telefono,
      celular_solicitante: formData.telefono,
      area_solicitante:
        optionListAreaSolicitante[formData.area_solicitante-1].toLowerCase(),
      sede_solicitante: "nueve_de_julio",
      piso_solicitante: formData.piso,
      referencia: formData.referencia,
      area_asignada_id: Number(formData.area_asignada),
      prioridad: formData.prioridad ? "alta" : "baja",
      estado: "pendiente",
      descripcion: formData.motivo,
      // archivos: images,
    };
    console.log(body);
    let response = await fetch("http://localhost:8000/api/tickets", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let result = await response.json();
    reset();
    console.log({ result });
  };

  const redirectTickets = () => {
    navigate("/tickets");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
      <div className="row">
        <InputForm
          label="Solicitante"
          type="text"
          name="solicitante"
          placeholder=""
          register={register}
          errors={errors}
          classCol="col-md-3 form-group item-form"
          options={{
            required: "Campo obligatorio",
          }}
        />
        <DatalistChangeInput
          idList="datalistSolicitante"
          label="Email"
          name="email"
          placeholder=""
          optionList={datalistSolicitante}
          register={register}
          errors={errors}
          classCol="col-md-4 col-lg-4 align-items-start datalist-input"
          options={{
            required: "Campo obligatorio",
            pattern: {
              value: REGEX_EMAIL,
              message: "El e-mail tiene que ser valido",
            },
          }}
        />
        <InputForm
          label="Teléfono"
          type="text"
          name="telefono"
          placeholder=""
          register={register}
          errors={errors}
          classCol="col-md-2 col-lg-2 form-group item-form"
          inputMode="tel"
          options={{
            required: "Campo obligatorio",
          }}
        />
        <InputForm
          label="N° GDE"
          type="text"
          name="gde"
          placeholder=""
          register={register}
          errors={""}
          classCol="col-2 form-group item-form"
        />
      </div>
      <div className="col-12 d-flex justify-content-between">
        <Select
          label="Sede"
          name="sede"
          placeholder="Selecciona una sede"
          optionList={sedes}
          register={register}
          errors={errors}
          classCol="col-md-4 align-items-start"
          options={{
            required: "Campo obligatorio",
          }}
        />
        <Select
          label="Área Solicitante"
          name="area_solicitante"
          placeholder="Selecciona un área"
          optionList={optionListAreaSolicitante}
          register={register}
          errors={errors}
          classCol="col-md-4 align-items-start"
          options={{
            required: "Campo obligatorio",
          }}
        />
        <Select
          label="Piso"
          name="piso"
          placeholder=""
          optionList={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          register={register}
          errors={errors}
          classCol="col-1 align-items-start"
          options={{
            required: "Campo obligatorio",
          }}
        />
        <InputForm
          label="Referencia"
          type="text"
          name="referencia"
          placeholder=""
          register={register}
          errors={""}
          classCol="col-3 form-group item-form"
        />
      </div>

      <hr />
      <div className="row">
        <TextArea
          label="Motivo"
          name="motivo"
          rows="20"
          register={register}
          errors={errors}
          classCol="col-6 form-group item-form"
          options={{
            required: "Campo obligatorio",
          }}
          placeholder="Motivo por el cual precisa asistencia."
        />
        {user.sector.includes("gde") ? (
          <Select
            label="Área Asignada"
            name="area_asignada"
            placeholder="Selecciona un área"
            optionList={optionListSelect}
            register={register}
            errors={errors}
            classCol="align-items-start col-md-4 col-lg-4 form-group item-form"
            options={{
              required: "Campo obligatorio",
            }}
          />
        ) : (
          <SelectWithOption
            label="Sector"
            name="area_asignada"
            optionList={optionListSelect}
            register={register}
            errors={""}
            classCol="align-items-start col-md-4 col-lg-4 form-group item-form"
            selectedOption={user.sector[0].toUpperCase()}
            onChangeInput={""}
            isDisable={true}
          />
        )}
        <div className="form-create-prioridad col-1">
          <input
            className="check-prioridad-form"
            type="checkbox"
            id="flexCheckDefault"
            name="prioridad_ticket"
            {...register("prioridad")}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Prioridad
          </label>
        </div>
      </div>

      {/* <label className='label-dragAndDrop'>Archivos
        <DragAndDrop
          ref={dragAndDropRef}
          register={register}
          errors={errors}
        />
      </label> */}
      <div className="d-flex justify-content-end">
        <Button
          type="reset"
          classBoton="btn-action btn-danger"
          texto="Cancelar"
          onClick={redirectTickets}
        />
        <Button
          type="submit"
          classBoton="btn-action btn-success"
          texto="Crear"
        />
      </div>
    </form>
  );
};

export default TicketCreateForm;
