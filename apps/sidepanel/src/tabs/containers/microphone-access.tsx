import { Container, Stack } from "@mui/material";
import micImage from "data-base64:assets/microphone_access.png";
import { useTranslation } from "shared/i18n/config";
import useUiStore from "shared/state/uiStore";

export default function MicrophoneAccess() {
  const ui = useUiStore();

  const { t } = useTranslation();

  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      // Permission granted, handle the stream if needed
      console.log("Microphone access granted");

      // Stop the tracks to prevent the recording indicator from being shown
      stream.getTracks().forEach(function (track) {
        track.stop();
      });
      ui.setOnboardingStep(1);
    })
    .catch((error) => {
      console.error("Error requesting microphone permission", error);
    });

  // if (process.env.NODE_ENV === "production") {
  //   navigator.mediaDevices
  //     .getUserMedia({ audio: true })
  //     .then((stream) => {
  //       // Permission granted, handle the stream if needed
  //       console.log("Microphone access granted");
  //
  //       // Stop the tracks to prevent the recording indicator from being shown
  //       stream.getTracks().forEach(function (track) {
  //         track.stop();
  //       });
  //       ui.setOnboardingStep(1);
  //     })
  //     .catch((error) => {
  //       console.error("Error requesting microphone permission", error);
  //     });
  // }
  // else {
  //   ui.setOnboardingStep(1);
  // }

  return (
    <Container>
      <Stack justifyContent="center" sx={{ textAlign: "center" }}>
        <h1>
          {t("microphone_access")}
        </h1>

        <h2>
          {t("microphone_access_description")}
        </h2>

        <img src={micImage} style={{ maxWidth: "60%", margin: "auto", marginTop: 20 }} />
      </Stack>
    </Container>
  );
}
