import { Backdrop } from "@mui/material";
import Card from "@mui/material/Card";
import React from "react";
import { useTranslation } from "../i18n/config";
import useContentStore from "../state/contentStore";

export default function TranscriptionTooShort() {
  const content = useContentStore();

  const { t } = useTranslation();

  return (
    <Backdrop open={!content.transcriptionLongEnough()} sx={{ zIndex: 10 }}>
      <Card sx={{ padding: 10 }}>
        <h3>{t("transcription_too_short")}</h3>
      </Card>
    </Backdrop>
  )
}
