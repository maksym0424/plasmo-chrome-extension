import { Card, Grid } from "@mui/material";
import React from "react";
import useContentStore from "../state/contentStore";
import useSettingsStore from "../state/settingsStore";
import useUiStore from "../state/uiStore";

export default function DebugInfo() {
  const content = useContentStore();
  const settings = useSettingsStore();
  const ui = useUiStore();

  return (
    <Card>
        <Grid container justifyContent="space-evenly">
          <p>Blobs: {ui.blobs.length}</p>
          <p>Responses: {content.responses}</p>
          <p>Recording: {`${ui.isRecording}`}</p>
          <p>Loading: {`${ui.loading}`}</p>
          <p>uiLang: {`${settings.uiLanguage}`}</p>
          <p>genLang: {`${settings.generationLanguage}`}</p>
        </Grid>
    </Card>
  );
}
