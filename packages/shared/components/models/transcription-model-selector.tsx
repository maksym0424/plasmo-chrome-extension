import { MenuItem, Select } from "@mui/material";
import React from "react";
import { useTranslation } from "../../i18n/config";
import useSettingsStore from "../../state/settingsStore";
import { inputFieldStyle } from "../../styles";

export default function TranscriptionModelSelector() {
  const settings = useSettingsStore();

  const { t } = useTranslation();

  return (
    <>
      <p>{t("settings.transcription_algo")}</p>
      <Select
        fullWidth
        value={settings.transcribeBackend}
        onChange={(val) => {
          settings.setTranscribeBackend(val.target.value as any);
        }}
        variant="outlined"
        sx={inputFieldStyle}
      >
        <MenuItem value={"ara"}>{t("models.ara")}</MenuItem>
        <MenuItem value={"azure"}>{t("models.azure")}</MenuItem>
      </Select>
    </>
  );
}
