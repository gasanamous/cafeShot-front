import TextField from "@mui/material/TextField";
import "../../App.css";
export default function InputComponenet({ id, label, rows = 1 }) {
  return (
    <div className="mb-4 px-2">
      <TextField
        id={id}
        label={label}
        variant="outlined"
        fullWidth
        rows={rows}
        multiline={rows > 1}
        className="bg-[white]"
      />
    </div>
  );
}
