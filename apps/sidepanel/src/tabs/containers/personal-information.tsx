import { Button, Card, CardContent, CardHeader, Container, Stack, TextField } from "@mui/material";
import React, { useEffect } from "react";
import EhrSelector from "shared/components/ehr-selector";
import { useTranslation } from "shared/i18n/config";
import useSettingsStore from "shared/state/settingsStore";
import useUiStore from "shared/state/uiStore";
import { cardStyle, inputFieldStyle } from "shared/styles";

export default function PersonalInformation() {
  const settings = useSettingsStore();
  const ui = useUiStore();

  const { t } = useTranslation();

  useEffect(() => {
    if (settings.name && settings.companyName) {
      window.close();
    }
  }, []);

  function next() {
    ui.setOnboardingStep(2);
  }

  return (
    <Container>
      <Stack justifyContent="center" sx={{ textAlign: "center" }}>
        <h1>
          {t("get_ready")}
        </h1>

        <Card sx={{ ...cardStyle, width: 500, margin: "auto" }} elevation={0}>
          <CardHeader
            subheader={t("your_information")}
          />
          <CardContent>
            <Stack spacing={2}>
              <TextField
                margin="none"
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

              <EhrSelector />

              <Button
                variant="contained"
                onClick={next}
              >
                {t("next")}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}
