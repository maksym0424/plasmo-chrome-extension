import { Button, Card, CardContent, Container, Stack } from "@mui/material";
import arrowImage from "data-base64:assets/arrow.png";
import pinToToolbarImage from "data-base64:assets/pin_to_toolbar.png";
import { useTranslation } from "shared/i18n/config";
import useUiStore from "shared/state/uiStore";
import { cardStyle } from "shared/styles";

export default function PinToToolbar() {
  const ui = useUiStore();

  const { t } = useTranslation();

  function next() {
    ui.setOnboardingStep(3);
  }

  return (
    <Container>
      <Stack justifyContent="center" sx={{ textAlign: "center" }}>
        <h1>
          {t("pin_to_toolbar")}
        </h1>

        <Card sx={{ ...cardStyle, width: 500, margin: "auto" }} elevation={0}>
          <CardContent>
            <Stack spacing={2}>
              <img src={arrowImage} style={{
                rotate: "219deg",
                maxWidth: "60%",
                position: "absolute",
                right: "15%",
                top: 0,
              }} />
              <img src={pinToToolbarImage} />

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
