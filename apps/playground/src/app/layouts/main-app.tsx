"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React, { useEffect } from "react";
import LoadingIndicator from "shared/components/loading-indicator";
import { useTranslation } from "shared/i18n/config";
import useSettingsStore from "shared/state/settingsStore";
import useUiStore from "shared/state/uiStore";
import Login from "~app/layouts/login";
import SettingsWrapper from "~app/wrappers/setttings-wrapper";
import SoapWrapper from "~app/wrappers/soap-wrapper";
import SummaryWrapper from "~app/wrappers/summary-wrapper";
import TranscribeWrapper from "~app/wrappers/transcribe-wrapper";
import AppBar from "~components/app-bar";
import BottomMenu from "~components/bottom-menu";

export default function MainApp() {
  const settings = useSettingsStore();
  const ui = useUiStore();

  const {
    isLoading,
    isAuthenticated,
  } = useKindeBrowserClient();

  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(settings.uiLanguage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.uiLanguage]);

  if (isLoading || ui.loading) {
    return <LoadingIndicator />;
  }
  else if (isAuthenticated) {
    return (
      <div>
        <AppBar />
        <ActiveLayout />
        <BottomMenu />
      </div>
    );
  }
  return <Login />;
}

function ActiveLayout() {
  const ui = useUiStore();

  if (ui.activeLayout === "transcribe") {
    return <TranscribeWrapper />;
  }
  if (ui.activeLayout === "soap") {
    return <SoapWrapper />;
  }
  if (ui.activeLayout === "summary") {
    return <SummaryWrapper />;
  }
  if (ui.activeLayout === "settings") {
    return <SettingsWrapper />;
  }
  // if (ui.activeLayout === "chat") {
  //   return <ChatWrapper />;
  // }
}
