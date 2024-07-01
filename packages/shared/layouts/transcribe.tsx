import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Button, Card, Fab, Grid, Stack, type SxProps, TextField } from "@mui/material";
import { saveAs } from "file-saver";
import React, { useEffect } from "react";
import { getAll } from "../api/typescript-api-client";
import ConsultationTypeSelector from "../components/consultation-type-selector";
import InputSourceSelector from "../components/input-source-selector";
import TranscriptionLanguageSelector from "../components/language/transcription-language-selector";
import useAudioTranscription from "../hooks/useAudioTranscription";
import useRealTimeAudioTranscription from "../hooks/useRealTimeAudioTranscription";
import { useTranslation } from "../i18n/config";
import useContentStore from "../state/contentStore";
import useSettingsStore from "../state/settingsStore";
import useUiStore from "../state/uiStore";
import { blurredText, cardContainerStyle } from "../styles";

export default function Transcribe() {
  const content = useContentStore();
  const settings = useSettingsStore();
  const ui = useUiStore();

  const { t } = useTranslation();

  const { startRecording, stopRecording } = settings.transcribeBackend === "ara" ?
    useRealTimeAudioTranscription() :
    useAudioTranscription();

  useEffect(() => {
    const transcription = content.transcription.toLowerCase();
    if (ui.isRecording && content.transcriptionLongEnough() && !ui.subjectiveLoading && !ui.objectiveLoading && !ui.assessmentLoading && !ui.planLoading &&
      (transcription.includes("ha det") ||
        transcription.includes("bye") ||
        transcription.includes("takk")) ||
      transcription.includes("thank you")
    ) {
      console.log("ENDING DETECTED");
      getAll({
        language: settings.generationLanguage,
        transcription: content.transcription,
        debug: settings.debug,
        consultationType: settings.consultationType,
        companyName: settings.companyName,
      });
    }
  }, [content.transcription]);

  async function stopTranscription() {
    await stopRecording();

    if (!settings.debug) {
      if (content.transcriptionLongEnough() && !content.subjective && !content.objective && !content.assessment && !content.plan &&
        !(ui.subjectiveLoading || ui.objectiveLoading || ui.assessmentLoading || ui.planLoading)) {
        getAll({
          language: settings.generationLanguage,
          transcription: content.transcription,
          debug: settings.debug,
          consultationType: settings.consultationType,
          companyName: settings.companyName,
        });
      }
      ui.setActiveLayout("soap");
    }
  }

  function downloadAudio() {
    console.log("Download audio");
    console.log(ui.blobs.length);
    console.log(ui.blobs);

    ui.blobs.forEach((blob, index) => {
      console.log(`Blob ${index}: size=${blob.blob.size}`); // Log the size of each blob
    });

    const blob = new Blob(ui.blobs.map(b => b.blob), { type: "audio/wav" });
    console.log(`Combined Blob Size: ${blob.size}`);

    // FIXME: This is not working. Only the first blob is saved.
    saveAs(blob, "recorded_audio.wav");
  }

  return (
    <Card sx={cardContainerStyle}>
      <Grid container spacing={2} marginBottom={4}>
        <Grid item>

        </Grid>

        {settings.debug ? (
          <Grid item>
            <Button size="small" onClick={() => downloadAudio()}>Download</Button>
          </Grid>
        ) : null}
      </Grid>

      <div style={{ height: "100%", position: "relative" }}>
        {settings.debug ? (
          <TextField
            multiline
            value={content.transcription}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              content.setTranscription(event.target.value);
            }}
            fullWidth
            variant="standard"
            sx={{ overflowY: "auto", position: "absolute", bottom: 0, height: "100%" }}
          />) : <div style={blurredText}>
          {content.transcription}
        </div>}
      </div>

      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ position: "relative", bottom: "60%" }}
      >
        <Fab
          variant="extended"
          onClick={() => !ui.isRecording ? startRecording() : stopTranscription()}
          sx={{
            backgroundColor: ui.isRecording ? "red" : "black",
            color: "white",
            "&:hover": {
              backgroundColor: ui.isRecording ? "darkred" : "darkgreen",
            },
          }}
        >
          <RecordVoiceOverIcon sx={{ mr: 1 }} />
          {ui.isRecording ? t("stop") : t("start")}
        </Fab>

        {!ui.isRecording ?
          <>
            <Fab
              variant="extended"
              onClick={() => content.reset()}
              disabled={!content.transcription || ui.loading}
              size="small"
              sx={{
                backgroundColor: "#5467ee",
                "&:hover": {
                  backgroundColor: "#ff4a7f",
                },
              } as SxProps}
            >
              <RefreshIcon sx={{ mr: 1 }} />
              {t("new_consultation")}
            </Fab>

            <Stack spacing={2}>
              <TranscriptionLanguageSelector />
              <ConsultationTypeSelector />
              <InputSourceSelector />
            </Stack>
          </>
          : null}
      </Stack>
    </Card>
  );
}
