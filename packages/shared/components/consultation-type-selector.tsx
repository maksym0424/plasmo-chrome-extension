import { MenuItem, Select } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import useSettingsStore, { type ConsultationType } from "../state/settingsStore";

export default function ConsultationTypeSelector() {
  const settings = useSettingsStore();

  const { t } = useTranslation();

  return (
    <Select
      value={settings.consultationType}
      onChange={(val) => settings.setConsultationType(val.target.value as ConsultationType)}
      variant="standard"
      size="small"
    >
      <MenuItem value={"digital"}>{t("digital_consultation")}</MenuItem>
      <MenuItem value={"physical"}>{t("physical_consultation")}</MenuItem>
    </Select>
  );
}
