import { Snackbar } from "@mui/material";
import useUiStore from "shared/state/uiStore";

export default function Alert() {
  const ui = useUiStore();

  return (
    <Snackbar
      color="error"
      open={ui.errorActive}
      autoHideDuration={5000}
      onClose={() => ui.setErrorActive(false)}
      message={ui.error}
      sx={{ bottom: 80, position: "fixed" }}
    />
  );
}
