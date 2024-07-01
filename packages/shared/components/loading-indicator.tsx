import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

export default function LoadingIndicator() {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: 100 }} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
