import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "../../i18n/config";
import useSettingsStore, { type Language } from "../../state/settingsStore";
import { inputFieldStyle } from "../../styles";

export default function UiLanguageSelector() {
  const settings = useSettingsStore();

  const { t } = useTranslation();

  return (
    <FormControl fullWidth>
      <Typography variant="overline">{t("language.your")}</Typography>
      <Select
        value={settings.uiLanguage}
        onChange={(val) => settings.setUiLanguage(val.target.value as Language)}
        variant="outlined"
        sx={inputFieldStyle}
      >
        <MenuItem value={"da"}>Dansk</MenuItem>
        <MenuItem value={"en"}>English</MenuItem>
        <MenuItem value={"nb"}>Norsk Bokmål</MenuItem>
        <MenuItem value={"sv"}>Svenska</MenuItem>
      </Select>
    </FormControl>
  );
};
