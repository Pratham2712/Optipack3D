import React from "react";

const InputComp = () => {
  return (
    <div>
      {inputs.map((input, index) => (
        <div key={index} className="input-row">
          <div id={`colorPicker${index}`}>
            <Controller
              name={`color${index}`}
              control={control}
              {...register(`color${index}`)}
              render={({ field }) => (
                <input
                  type="hidden"
                  id={`colorInput${index}`}
                  defaultValue={field.value}
                />
              )}
            />
          </div>
          <input
            type="hidden"
            name={`color${index}`}
            {...register(`color${index}`)}
            id={`colorInput${index}`}
          />
          <div className="input">
            <label>Product {index + 1}:</label>
            <input
              type="text"
              name={`sku${index}`}
              required
              {...register(`sku${index}`)}
              onChange={(e) => handleInputChange(index, "sku", e.target.value)}
            />
          </div>
          <div className="input">
            <label>Gross Weight (KGs):</label>
            <input
              type="number"
              name={`grossWeight${index}`}
              {...register(`grossWeight${index}`)}
              onChange={(e) =>
                handleInputChange(index, "grossWeight", e.target.value)
              }
            />
          </div>
          <div className="input">
            <label>Length (mm):</label>
            <input
              type="number"
              name={`length${index}`}
              {...register(`length${index}`)}
              onChange={(e) =>
                handleInputChange(index, "length", e.target.value)
              }
            />
          </div>
          <div className="input">
            <label>Width (mm):</label>
            <input
              type="number"
              name={`width${index}`}
              {...register(`width${index}`)}
              onChange={(e) =>
                handleInputChange(index, "width", e.target.value)
              }
            />
          </div>
          <div className="input">
            <label>Height (mm):</label>
            <input
              type="number"
              name={`height${index}`}
              {...register(`height${index}`)}
              onChange={(e) =>
                handleInputChange(index, "height", e.target.value)
              }
            />
          </div>
          <div className="input">
            <label>Number of Cases:</label>
            <input
              type="number"
              name={`numberOfCases${index}`}
              {...register(`numberOfCases${index}`)}
              onChange={(e) =>
                handleInputChange(index, "numberOfCases", e.target.value)
              }
            />
          </div>
          <input
            type="hidden"
            name={`volume${index}`}
            {...register(`volume${index}`)}
          />
          <input
            type="hidden"
            name={`temperature${index}`}
            {...register(`temperature${index}`)}
          />
          <input
            type="hidden"
            name={`netWeight${index}`}
            {...register(`netWeight${index}`)}
          />
          <div className="input checkbox-label">
            <label for={`tilt${index}`}>Tilt Allowed:</label>
            <input
              type="checkbox"
              name={`rotationAllowed${index}`}
              id={`tilt${index}`}
              {...register(`rotationAllowed${index}`)}
              onClick={(e) => (e.target.value = !e.target.value)}
            />
          </div>
          <img
            src={del}
            className="delete-img"
            onClick={() => handleDelete(index)}
            alt="Delete"
          />
        </div>
      ))}
    </div>
  );
};

export default InputComp;
