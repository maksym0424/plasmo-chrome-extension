import { Card } from "@mui/material";
import React from "react";
import YourInformation from "../components/settings/your-information";
import { useTranslation } from "../i18n/config";
import { cardContainerStyle } from "../styles";

export default function Onboarding() {
  const { t } = useTranslation();

  return (
    <Card
      sx={{
        ...cardContainerStyle,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        textAlign: "center",
      }}
    >
      <div style={{ borderRadius: 2, width: 500 }}>
        <Card
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            height: 100
          }}
        >
          <h2>{t("playground.welcome")}</h2>
          <p>{t("playground.demo_version")}</p>
        </Card>

        <YourInformation />
      </div>
    </Card>
  );
}
