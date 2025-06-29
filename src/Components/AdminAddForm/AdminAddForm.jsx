import React, { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import APIService from "../../utils/api";
import PasswordStrengthBar from "react-password-strength-bar";

function AdminAddForm({ open, onClose, header, item }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
  const onCloseForm = () => {
    setFormData({});
    onClose();
  };
  const getFormFields = (header) => {
    return header.map((fieldDef) => {
      const { name, type, options, required } = fieldDef;

      const field = {
        name,
        type,
        required,
      };
      if (type === "select") {
        field.values = options;
        field.defaultValue = options?.[0];
      } else {
        field.defaultValue = "";
        field.required = field.required || false;
      }
      return field;
    });
  };

  useEffect(() => {
    if (header) {
      const fields = getFormFields(header);
      setFormFields(fields);

      const initialData = {};
      fields.forEach((field) => {
        initialData[field.name] = field.defaultValue;
      });
      setFormData(initialData);
    }
  }, [header]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else if (name === "possibleDecorations") {
      const tags = value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");
      setFormData({ ...formData, [name]: tags });
    } else if (name === "accountPassword") {
      setPassword(value);
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateData = async () => {
    if (item !== "manager") return true;

    const errors = [];

    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const phoneRegex = /^\d{10}$/;

    if (!nameRegex.test(formData.firstName)) {
      errors.push(
        "First name must contain only letters and start with a capital letter."
      );
    }

    if (!nameRegex.test(formData.lastName)) {
      errors.push(
        "Last name must contain only letters and start with a capital letter."
      );
    }

    if (!emailRegex.test(formData.accountEmail)) {
      errors.push("Invalid email format.");
    }

    if (!passwordRegex.test(formData.accountPassword)) {
      errors.push(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
      );
    }

    if (!phoneRegex.test(formData.phoneNumber)) {
      errors.push("Phone number must be exactly 10 digits.");
    }

    if (errors.length > 0) {
      errors.forEach((err) =>
        toast.error(err, {
          position: "top-right",
          autoClose: false,
          theme: "light",
          transition: Bounce,
        })
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await validateData()) {
      try {
        if (item === "menu") {
          const formToSend = new FormData();
          for (const key in formData) {
            formToSend.append(key, formData[key]);
          }
          const res = await APIService.post(
            `/${item}/new`,
            formToSend,
            true,
            "admin"
          );
        } else {
          const res = await APIService.post(
            `/${item}/new`,
            { ...formData },
            true,
            "admin"
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        onClose();
      }
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        open ? "block" : "hidden"
      }`}
    >
      <div
        className="absolute inset-0 bg-secondary-trans backdrop-blur-sm"
        onClick={onCloseForm}
      />

      <div className="relative z-10 w-[95%] sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[40%] max-h-[90vh] bg-primary rounded-lg shadow-lg p-4 txt3 overflow-hidden flex flex-col">
        <button
          onClick={onCloseForm}
          className="absolute top-3 right-3 text-lg font-bold hover:text-red-500"
        >
          ✕
        </button>

        <h2 className="font-bold pl-2 text-xl mb-4">Add New {item}</h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 overflow-y-auto px-1"
          style={{ maxHeight: "calc(90vh - 80px)" }}
          encType="multipart/form-data"
        >
          {formFields.map((field) => (
            <div key={field.name} className="w-full">
              {field.type === "select" ? (
                <TextField
                  name={field.name}
                  select
                  required={field.required}
                  fullWidth
                  label={`Select ${field.name}`}
                  value={formData[field.name]}
                  onChange={handleChange}
                  helperText={`Please select your ${field.name}`}
                >
                  {field.values.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              ) : field.type === "password" ? (
                <FormControl fullWidth variant="standard">
                  <InputLabel>Password</InputLabel>
                  <Input
                    required={field.required}
                    onChange={handleChange}
                    name={field.name}
                    type={showPassword ? "text" : "password"}
                    value={formData[field.name]}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <PasswordStrengthBar password={password} />
                </FormControl>
              ) : field.type === "file" ? (
                <div className="relative p-3">
                  <label
                    htmlFor={`upload-${field.name}`}
                    className="absolute right-0 w-fit ml-auto cursor-pointer bg-secondary txt1 px-4 py-2 rounded text-center"
                  >
                    Choose {field.name}
                  </label>
                  <input
                    id={`upload-${field.name}`}
                    name={field.name}
                    type="file"
                    accept="image/*"
                    className=""
                    onChange={handleChange}
                  />
                  {formData[field.name] &&
                    typeof formData[field.name] === "object" && (
                      <img
                        src={URL.createObjectURL(formData[field.name])}
                        alt="Preview"
                        className="mt-2 w-32 h-32 object-cover rounded border"
                      />
                    )}
                </div>
              ) : (
                <TextField
                  required={field.required}
                  type={field.type}
                  name={field.name}
                  label={field.name}
                  value={formData[field.name]}
                  variant="standard"
                  fullWidth
                  onChange={handleChange}
                />
              )}
            </div>
          ))}

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-secondary text-white font-semibold px-6 py-2 rounded hover:bg-opacity-90 transition"
            >
              Add {item}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminAddForm;
