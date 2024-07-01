"use client";

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import InterpreterModeIcon from "@mui/icons-material/InterpreterMode";
import NotesIcon from "@mui/icons-material/Notes";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useTranslation } from "shared/i18n/config";
import useUiStore, { Layouts } from "shared/state/uiStore";

export default function BottomMenu() {
  const ui = useUiStore();

  const { t } = useTranslation();

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, height: 64, zIndex: 1000 }}
      elevation={2}
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
        <BottomNavigationAction
          label={t("settings.settings")}
          icon={<SettingsOutlinedIcon />}
          onClick={() => ui.setActiveLayout("settings")}
        />
      </BottomNavigation>
    </Paper>
  );
}
