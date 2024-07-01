import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import RefreshIcon from "@mui/icons-material/Refresh";
import { CircularProgress, Fab, IconButton, Stack, type SxProps } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React from "react";
import { getSummary } from "../api/typescript-api-client";
import GenerationLanguageSelector from "../components/language/generation-language-selector";
import TranscriptionTooShort from "../components/transcription-too-short";
import { useTranslation } from "../i18n/config";
import useContentStore from "../state/contentStore";
import useSettingsStore from "../state/settingsStore";
import useUiStore from "../state/uiStore";
import { cardContainerStyle, circularProgressStyle, fabStyle, iconButtonStyle, primaryFab } from "../styles";

interface PatientSummaryProps {
  sendToEPJ?: () => void;
}

export default function PatientSummary({ sendToEPJ }: PatientSummaryProps) {
  const content = useContentStore();
  const settings = useSettingsStore();
  const ui = useUiStore();

  const { t } = useTranslation();

  return (
    <Card sx={cardContainerStyle}>
      <TranscriptionTooShort />
      <div style={{ overflowY: "auto", height: "80vh", paddingTop: 10 }}>
        <div style={{ marginBottom: 20, justifyContent: "end", display: "flex" }}>
          <GenerationLanguageSelector />
        </div>

        <Stack spacing={4}>
          <div>
            {ui.summaryLoading ?
              <CircularProgress sx={circularProgressStyle} /> :
              <IconButton
                onClick={async () => {
                  ui.setSummaryLoading(true);
                  content.setSummary(await getSummary({
                    language: settings.generationLanguage,
                    transcription: content.transcription,
                    debug: settings.debug,
                    consultationType: settings.consultationType,
                    companyName: settings.companyName,
                  }));
                  ui.setSummaryLoading(false);
                }}
                sx={iconButtonStyle}
                tabIndex={-1}
                disabled={!content.transcriptionLongEnough()}
              >
                <RefreshIcon />
              </IconButton>
            }
            <TextField
              label={t("summary")}
              multiline
              minRows={20}
              value={content.summary}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                content.setSummary(event.target.value);
              }}
              variant="outlined"
              sx={{
                backgroundColor: "white",
              }}
              fullWidth
            />
          </div>
        </Stack>
      </div>

      <Grid container justifyContent="center">
        {sendToEPJ ? <Fab
          variant="extended"
          onClick={() => sendToEPJ()}
          sx={{ ...fabStyle, ...primaryFab } as SxProps}
        >
          <KeyboardDoubleArrowLeftIcon sx={{ mr: 1 }} />
          {t("send_to")} {settings.ehrSystem}
        </Fab> : null}
      </Grid>
    </Card>
  );
}
