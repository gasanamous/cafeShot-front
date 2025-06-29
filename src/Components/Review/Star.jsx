import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import "./review.css";

export default function Star({ text, handleOfStar, value, readonly = false }) {
  return (
    <div>
      <Box
        sx={{
          "& > legend": { mt: 2 },
        }}
      >
        <Typography
          component="legend"
          style={{
            fontFamily: "Dosis, sans-serif",
            fontSize: "20px",
            margin: "10px",
          }}
        >
          {text}
        </Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event) => {
            handleOfStar(event.target.value);
          }}
          readOnly={readonly}
          size="large"
        />
      </Box>
    </div>
  );
}
