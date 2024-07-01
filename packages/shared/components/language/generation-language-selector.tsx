import { FormControl, MenuItem, Select } from "@mui/material";
import React from "react";
import { useTranslation } from "../../i18n/config";
import useSettingsStore, { type Language } from "../../state/settingsStore";

export default function GenerationLanguageSelector() {
  const settings = useSettingsStore();
  const { t } = useTranslation();

  return (
    <FormControl>
      <Select
        value={settings.generationLanguage}
        onChange={(val) => settings.setGenerationLanguage(val.target.value as Language)}
        variant="standard"
      >
        <MenuItem value={'da'}>Dansk</MenuItem>
        <MenuItem value={'en'}>English</MenuItem>
        <MenuItem value={'nb'}>Norsk Bokmål</MenuItem>
        <MenuItem value={'sv'}>Svenska</MenuItem>
      </Select>
    </FormControl>
  );
}
