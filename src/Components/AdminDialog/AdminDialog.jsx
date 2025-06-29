import React, { useEffect, useState } from "react";
import APIService from "../../utils/api";
import { MenuItem, TextField } from "@mui/material";

function AdminDialog({ open, header, data, onClose, action, item }) {
  if (!data) return null;
  const id = data._id || data.managerId;
  const name = data.itemName;
  const [formData, setFormData] = useState({});
  useEffect(() => {
    if (data && header) {
      const initialData = {};
      header.map((field) => {
        const { name } = field;
        if (name !== "accountPassword") initialData[name] = data[name];
      });
      setFormData(initialData);
    }
  }, [data, header]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (action === "delete") {
        const res = await APIService.delete(
          `/${item}/${action}/${id}`,
          true,
          "admin"
        );
      } else {
        if (item === "menu") {
          const formToSend = new FormData();
          for (const key in formData) {
            formToSend.append(key, formData[key]);
          }
          const res = await APIService.patch(
            `/${item}/${action}/${id}`,
            action === "update" ? formToSend : {},
            true,
            "admin"
          );
          
        } else {
          const res = await APIService.patch(
            `/${item}/${action}/${id}`,
            action === "update" ? formData : {},
            true,
            "admin"
          );
          console.log(`/${item}/${action}/${id}`);
        }
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    } finally {
      window.dispatchEvent(new Event("update"));
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center  p-4 ${
        open ? "block" : "hidden"
      }`}
    >
      <div className="absolute inset-0 bg-secondary-trans" onClick={onClose} />

      <div className="relative z-10 lg:min-w-md bg-primary rounded-lg shadow-md p-6">
        <button onClick={onClose} className="absolute top-4 right-4 txt3">
          ✕
        </button>
        {data ? (
          action === "update" ? (
            <div>
              <h2 className="text-xl font-bold mb-4">Edit Data</h2>

              <form
                onSubmit={handleSubmit}
                style={{ maxHeight: "calc(90vh - 80px)" }}
                className="p-2 overflow-auto"
                encType="multipart/form-data"
              >
                {header.map((field) => {
                  const { name, type, required, options } = field;
                  const isDisabled =
                    name.toLowerCase().includes("id") ||
                    name.toLowerCase() === "status";
                  if (name.toLowerCase().includes("password")) {
                    return <></>;
                  }
                  if (type === "select") {
                    return (
                      <TextField
                        name={field.name}
                        select
                        required={field.required}
                        fullWidth
                        label={`Select ${field.name}`}
                        value={formData[name] || ""}
                        onChange={handleChange}
                        className="!mb-3"
                      >
                        {options?.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    );
                  }
                  return (
                    <div key={name} className="relative z-0 w-full mb-5 group">
                      {type === "file" ? (
                        <div className="relative p-3">
                          <label
                            htmlFor={`upload-${name}`}
                            className="absolute right-0 w-fit ml-auto cursor-pointer bg-secondary txt1 px-4 py-2 rounded text-center"
                          >
                            Choose {name}
                          </label>
                          <input
                            id={`upload-${name}`}
                            name={name}
                            type="file"
                            accept="image/*"
                            onChange={handleChange}
                          />
                          {formData[name] && (
                            <img
                              src={`${import.meta.env.VITE_API}/utils/png/${
                                formData[name]
                              }`}
                              alt="Preview"
                              className="mt-2 w-32 h-32 object-cover rounded border"
                            />
                          )}
                        </div>
                      ) : (
                        <input
                          type={type}
                          name={name}
                          id={name}
                          value={formData[name] || ""}
                          onChange={handleChange}
                          required={required}
                          disabled={isDisabled}
                          min="0"
                          className={`${
                            !isDisabled ? "cursor-text" : "cursor-not-allowed"
                          } block py-2.5 px-0 w-full bg-transparent border-0 border-b-1 appearance-none focus:outline-none focus:ring-0`}
                        />
                      )}
                      <label
                        htmlFor={name}
                        className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]"
                      >
                        {name}
                      </label>
                    </div>
                  );
                })}

                <input
                  type="submit"
                  className="p-2 bg-secondary rounded-xl txt1 cursor-pointer"
                />
              </form>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-4 overflow-y-auto px-1"
              style={{ maxHeight: "calc(90vh - 80px)" }}
            >
              <h2 className="text-xl font-bold mb-4">
                {action === "restrict" && data["status"] === "restricted"
                  ? `Un${action} `
                  : `${action} `}{" "}
                {item === "menu" ? name : id}
              </h2>
              <p>
                Are You Sure You want to{" "}
                {action === "restrict" && data["status"] === "restricted"
                  ? `Un${action} `
                  : `${action} `}
                {item === "menu" ? name : id}
              </p>
              <input
                type="submit"
                className="absolute right-1 p-2 bottom-1 bg-secondary rounded-xl txt1 cursor-pointer"
              />
            </form>
          )
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
}

export default AdminDialog;
