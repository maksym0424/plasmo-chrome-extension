import { MenuItem, Select } from "@mui/material";
import React from "react";
import useSettingsStore, { araModels, type Model, models } from "../state/settingsStore";

export default function ModelSelector() {
  const settings = useSettingsStore();

  return (
    <Select
      fullWidth
      value={settings.model}
      onChange={(val) => settings.setModel(val.target.value as Model)}
      variant="outlined"
      sx={{
        backgroundColor: "white",
      }}
    >
      {settings.soapBackend === "azure" ? models.map(model => (
        <MenuItem key={model} value={model}>{model}</MenuItem>
      )) : (
        araModels.map(model => (
          <MenuItem key={model} value={model}>{model}</MenuItem>
        ))
      )}
    </Select>
  );
}
