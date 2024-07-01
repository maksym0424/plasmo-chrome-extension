import { MenuItem, Select } from "@mui/material";
import React from "react";
import { useTranslation } from "../../i18n/config";
import useSettingsStore, { type Language } from "../../state/settingsStore";
import "@fontsource/varela-round";

export default function TranscriptionLanguageSelector() {
  const settings = useSettingsStore();
  const { t } = useTranslation();

  return (
    <Select
      value={settings.transcriptionLanguage}
      onChange={(val) => settings.setTranscriptionLanguage(val.target.value as Language)}
      variant="standard"
      size="small"
    >
      <MenuItem value={'da'}>Dansk</MenuItem>
      <MenuItem value={'en'}>English</MenuItem>
      <MenuItem value={'nb'}>Norsk Bokmål</MenuItem>
      <MenuItem value={'sv'}>Svenska</MenuItem>
    </Select>
  );
}
