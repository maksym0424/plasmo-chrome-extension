import AddIcon from "@mui/icons-material/Add";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import InterpreterModeIcon from "@mui/icons-material/InterpreterMode";
import NotesIcon from "@mui/icons-material/Notes";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { AppBar, BottomNavigation, BottomNavigationAction, Box, IconButton, Paper, Toolbar } from "@mui/material";
import * as Sentry from "@sentry/react";
import React, { useEffect } from "react";
import DebugInfo from "shared/components/debug-info";
import LoadingIndicator from "shared/components/loading-indicator";
import { useTranslation } from "shared/i18n/config";
import PatientSummary from "shared/layouts/patient-summary";
import Settings from "shared/layouts/settings";
import Soap from "shared/layouts/soap";
import Transcribe from "shared/layouts/transcribe";
import useContentStore from "shared/state/contentStore";
import useSettingsStore from "shared/state/settingsStore";
import useUiStore, { Layouts } from "shared/state/uiStore";
import Alert from "~components/alert";
import { sendSoapToEPJ, sendSummaryToEPJ, wakeUp } from "~sidepanel/messaging";
import "@fontsource/varela-round";

Sentry.init({
  dsn: "https://ab9b1e949da414ef12edf860e3f4778b@o4507148297371648.ingest.de.sentry.io/4507148302286928",
  integrations: [
    Sentry.browserTracingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  // tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  environment: "sidepanel",
});

export default function IndexSidePanel() {
  const content = useContentStore();
  const settings = useSettingsStore();
  const ui = useUiStore();

  const { t, i18n } = useTranslation();

  useEffect(() => {
    wakeUp();
  }, []);

  useEffect(() => {
    i18n.changeLanguage(settings.uiLanguage);
  }, [settings.uiLanguage]);

  function newConsultation() {
    content.reset();
    ui.setActiveLayout("transcribe");
    ui.setBlobs([]);
  }

  return (
    <div style={{ paddingTop: 60 }}>
      <AppBar position="fixed" color="inherit" elevation={0}>
        <Toolbar>
          {/*<IconButton color="inherit" aria-label="open drawer">*/}
          {/*  <DescriptionOutlinedIcon />*/}
          {/*</IconButton>*/}

          <IconButton color="inherit" onClick={() => newConsultation()}>
            <AddIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1, textAlign: "center" }}>
            <h2>Ara AI</h2>
          </Box>

          <IconButton
            color="inherit"
            onClick={() => ui.setActiveLayout("settings")}
          >
            <SettingsOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {ui.loading ? <LoadingIndicator /> : null}

      <ActiveLayout />

      <Alert />

      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000 }}
      >
        <BottomNavigation
          showLabels
          value={Layouts.indexOf(ui.activeLayout)}
        >
          <BottomNavigationAction
            label={t("transcribe")}
            icon={<InterpreterModeIcon />}
            onClick={() => ui.setActiveLayout("transcribe")}
          />
          <BottomNavigationAction
            label={t("note")}
            icon={<FormatListBulletedIcon />}
            onClick={() => ui.setActiveLayout("soap")}
          />
          <BottomNavigationAction
            label={t("summary")}
            icon={<NotesIcon />}
            onClick={() => ui.setActiveLayout("summary")}
          />
          {/*<BottomNavigationAction*/}
          {/*  label="Chat"*/}
          {/*  icon={<ChatIcon />}*/}
          {/*  onClick={() => ui.setActiveLayout("chat")}*/}
          {/*/>*/}
        </BottomNavigation>

        {settings.debug && (<DebugInfo />)}
      </Paper>
    </div>
  );
}

function ActiveLayout() {
  const content = useContentStore();
  const ui = useUiStore();

  if (ui.activeLayout === "settings") {
    return <Settings />;
  }
  if (ui.activeLayout === "transcribe") {
    return <Transcribe />;
  }
  if (ui.activeLayout === "soap") {
    return <Soap
      sendToEPJ={() => sendSoapToEPJ({
        subjective: content.subjective,
        objective: content.objective,
        assessment: content.assessment,
        plan: content.plan,
      })}
    />;
  }
  if (ui.activeLayout === "summary") {
    return <PatientSummary
      sendToEPJ={() => sendSummaryToEPJ({
        summary: content.summary,
      })}
    />;
  }
  // if (ui.activeLayout === "chat") {
  //   return <Chat />;
  // }
}
