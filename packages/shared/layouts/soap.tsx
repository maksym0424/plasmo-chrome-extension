import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import RefreshIcon from "@mui/icons-material/Refresh";
import { CircularProgress, Fab, IconButton, Stack, SxProps } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React from "react";
import { useTranslation } from "react-i18next";
import { getAssessment, getObjective, getPlan, getSubjective } from "../api/typescript-api-client";
import GenerationLanguageSelector from "../components/language/generation-language-selector";
import TranscriptionTooShort from "../components/transcription-too-short";
import useContentStore from "../state/contentStore";
import useSettingsStore from "../state/settingsStore";
import useUiStore from "../state/uiStore";
import { cardContainerStyle, circularProgressStyle, fabStyle, iconButtonStyle, primaryFab } from "../styles";

interface GetSoapParams {
  sendToEPJ?: () => void;
}

export default function Soap({ sendToEPJ }: GetSoapParams) {
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
            {ui.subjectiveLoading ?
              <CircularProgress sx={circularProgressStyle} /> :
              <IconButton
                onClick={async () => {
                  ui.setSubjectiveLoading(true);
                  content.setSubjective(await getSubjective({
                    language: settings.generationLanguage,
                    transcription: content.transcription,
                    debug: settings.debug,
                    consultationType: settings.consultationType,
                    companyName: settings.companyName,
                  }));
                  ui.setSubjectiveLoading(false);
                }}
                sx={iconButtonStyle}
                tabIndex={-1}
                disabled={!content.transcriptionLongEnough()}
              >
                <RefreshIcon />
              </IconButton>
            }
            <TextField
              disabled={ui.subjectiveLoading}
              label={t("subjective")}
              multiline
              minRows={5}
              value={content.subjective}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                content.setSubjective(event.target.value);
              }}
              variant="outlined"
              sx={{
                backgroundColor: "white",
              }}
              fullWidth
            />
          </div>

          <div>
            {ui.objectiveLoading ?
              <CircularProgress sx={circularProgressStyle} /> :
              <IconButton
                onClick={async () => {
                  ui.setObjectiveLoading(true);
                  content.setObjective(await getObjective({
                    language: settings.generationLanguage,
                    transcription: content.transcription,
                    debug: settings.debug,
                    consultationType: settings.consultationType,
                    companyName: settings.companyName,
                  }));
                  ui.setObjectiveLoading(false);
                }}
                sx={iconButtonStyle}
                tabIndex={-1}
                disabled={!content.transcriptionLongEnough()}
              >
                <RefreshIcon />
              </IconButton>
            }
            <TextField
              disabled={ui.objectiveLoading}
              label={t("objective")}
              multiline
              minRows={5}
              value={content.objective}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                content.setObjective(event.target.value);
              }}
              variant="outlined"
              sx={{
                backgroundColor: "white",
              }}
              fullWidth
            />
          </div>

          <div>
            {ui.assessmentLoading ?
              <CircularProgress sx={circularProgressStyle} /> :
              <IconButton
                onClick={async () => {
                  ui.setAssessmentLoading(true);
                  content.setAssessment(await getAssessment({
                    language: settings.generationLanguage,
                    transcription: content.transcription,
                    debug: settings.debug,
                    consultationType: settings.consultationType,
                    companyName: settings.companyName,
                  }));
                  ui.setAssessmentLoading(false);
                }}
                sx={iconButtonStyle}
                tabIndex={-1}
                disabled={!content.transcriptionLongEnough()}
              >
                <RefreshIcon />
              </IconButton>
            }
            <TextField
              disabled={ui.assessmentLoading}
              label={t("assessment")}
              multiline
              minRows={5}
              value={content.assessment}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                content.setAssessment(event.target.value);
              }}
              variant="outlined"
              sx={{
                backgroundColor: "white",
              }}
              fullWidth
            />
          </div>

          <div>
            {ui.planLoading ?
              <CircularProgress sx={circularProgressStyle} /> :
              <IconButton
                onClick={async () => {
                  ui.setPlanLoading(true);
                  content.setPlan(await getPlan({
                    language: settings.generationLanguage,
                    transcription: content.transcription,
                    debug: settings.debug,
                    consultationType: settings.consultationType,
                    companyName: settings.companyName,
                  }));
                  ui.setPlanLoading(false);
                }}
                sx={iconButtonStyle}
                tabIndex={-1}
                disabled={!content.transcriptionLongEnough()}
              >
                <RefreshIcon />
              </IconButton>
            }
            <TextField
              disabled={ui.planLoading}
              label={t("plan")}
              multiline
              minRows={5}
              value={content.plan}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                content.setPlan(event.target.value);
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
