import { Card, CardContent, CardHeader, Grid, Stack, TextField } from "@mui/material";
import React from "react";
import { useTranslation } from "../../i18n/config";
import useSettingsStore from "../../state/settingsStore";
import { cardStyle, inputFieldStyle } from "../../styles";
import EhrSelector from "../ehr-selector";
import UiLanguageSelector from "../language/ui-language-selector";

export default function YourInformation() {
  const settings = useSettingsStore();

  const { t } = useTranslation();

  return (
    <Card sx={cardStyle} elevation={0}>
      <CardHeader
        subheader={t("your_information")}
      />
      <CardContent>
        <Stack>
          <TextField
            label={t("company_name")}
            value={settings.companyName}
            onChange={(val) => settings.setCompanyName(val.target.value)}
            variant="outlined"
            sx={inputFieldStyle}
          />

          <TextField
            margin="none"
            label={t("your_name")}
            value={settings.name}
            onChange={(val) => settings.setName(val.target.value)}
            variant="outlined"
            sx={inputFieldStyle}
          />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <UiLanguageSelector />
            </Grid>
            <Grid item xs={6}>
              <EhrSelector />
            </Grid>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
}
