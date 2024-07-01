import { Card, CardContent, CardHeader, Container, Grid, MenuItem, Select, Stack, Switch } from "@mui/material";
import React from "react";
import TranscriptionModelSelector from "../components/models/transcription-model-selector";
import ModelSelector from "../components/ModelSelector";
import YourInformation from "../components/settings/your-information";
import config from "../config";
import { useTranslation } from "../i18n/config";
import useSettingsStore from "../state/settingsStore";
import { cardStyle, containerStyle, inputFieldStyle } from "../styles";
import "@fontsource/varela-round";

export default function Settings() {
  const settings = useSettingsStore();

  const { t } = useTranslation();

  return (
    <Container sx={containerStyle}>
      <Stack spacing={4}>
        <YourInformation />

        <Card sx={cardStyle} elevation={0}>
          <CardHeader
            subheader={t("settings.advanced")}
            action={
              <Switch
                checked={settings.advancedSettings}
                onChange={(val) => settings.setAdvancedSettings(val.target.checked)}
              />
            }
          />
          <CardContent>
            <Stack>
              <TranscriptionModelSelector />

              <p>SOAP backend</p>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Select
                    fullWidth
                    value={settings.soapBackend}
                    onChange={(val) => {
                      settings.setSoapBackend(val.target.value as any);
                    }}
                    variant="outlined"
                    sx={inputFieldStyle}
                  >
                    <MenuItem value={"azure"}>Azure OpenAI</MenuItem>
                    <MenuItem value={"ara"}>Ara AI</MenuItem>
                  </Select>
                </Grid>

                <Grid item xs={6}>
                  <ModelSelector />
                </Grid>
              </Grid>

              {config.ENV === "sidepanel" ? (
                <Grid container spacing={2} paddingTop={4}>
                  <Grid item xs={6}>
                    <p>Debug</p>
                  </Grid>

                  <Grid item xs={6} alignContent={"end"}>
                    <Switch
                      checked={settings.debug}
                      onChange={(val) => settings.setDebug(val.target.checked)}
                    />
                  </Grid>
                </Grid>
              ) : null}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}
