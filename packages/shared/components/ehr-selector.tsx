import { MenuItem, Select, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "../i18n/config";
import useSettingsStore from "../state/settingsStore";
import { inputFieldStyle } from "../styles";

export default function EhrSelector() {
  const settings = useSettingsStore();
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="overline">{t("ehr_system")}</Typography>
      <Select
        fullWidth
        value={settings.ehrSystem}
        onChange={(val) => {
          settings.setEhrSystem(val.target.value as any);
        }}
        variant="outlined"
        sx={inputFieldStyle}
      >
        <MenuItem value={"Pridok"}>Pridok</MenuItem>
        <MenuItem value={"Webmed"}>Webmed</MenuItem>
        <MenuItem value={"PasientSky"}>PasientSky</MenuItem>
      </Select>
    </>
  );
}
