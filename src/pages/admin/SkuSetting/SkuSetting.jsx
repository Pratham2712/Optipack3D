import React from "react";
import "./SkuSetting.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = yup.object().shape({
  sku_name: yup.string().required("SKU name is required"),
  gross_weight: yup
    .number()
    .typeError("Gross Weight must be a number")
    .required("Gross Weight is required"),
  length: yup
    .number()
    .typeError("Length must be a number")
    .required("Length is required")
    .integer("Length cannot have decimal values"),
  width: yup
    .number()
    .typeError("Width must be a number")
    .required("Width is required")
    .integer("Width cannot have decimal values"),
  height: yup
    .number()
    .typeError("Height must be a number")
    .required("Height is required")
    .integer("Height cannot have decimal values"),
  numberOfCases: yup
    .number()
    .typeError("Number of Cases must be a number")
    .required("Number of Cases is required")
    .integer("Number of Cases cannot have decimal values"),
  tiltAllowed: yup.boolean(),
});

const SkuSetting = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <section>
      <div style={{ margin: "2rem 0rem" }}>
        <h2>SKU settings</h2>
        <div className="input-admin-row">
          <div className="input">
            <label>SKU name</label>
            <input type="text" {...register("sku_name")} />
            <p>{errors.sku_name?.message}</p>
          </div>
          <div className="input">
            <label>Gross Weight (kg):</label>
            <input type="number" {...register("gross_weight")} />
            <p>{errors.gross_weight?.message}</p>
          </div>
          <div className="input">
            <label>Length (mm):</label>
            <input type="number" {...register("length")} />
            <p>{errors.length?.message}</p>
          </div>
          <div className="input">
            <label>Width (mm):</label>
            <input type="number" {...register("width")} />
            <p>{errors.width?.message}</p>
          </div>
          <div className="input">
            <label>Height (mm):</label>
            <input type="number" {...register("height")} />
            <p>{errors.height?.message}</p>
          </div>
          <div className="input">
            <label>Number of Cases:</label>
            <input type="number" {...register("numberOfCases")} />
            <p>{errors.numberOfCases?.message}</p>
          </div>
          <div className="input checkbox-label">
            <label htmlFor="tilt">Tilt Allowed:</label>
            <input type="checkbox" id="tilt" {...register("tiltAllowed")} />
          </div>
          <div style={{ marginLeft: "1rem" }}>
            <button className="btn-apply" onClick={handleSubmit(onSubmit)}>
              Add
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkuSetting;
