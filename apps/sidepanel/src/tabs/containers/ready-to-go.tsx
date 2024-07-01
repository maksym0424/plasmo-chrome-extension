import { Button, Card, CardContent, Container, Stack } from "@mui/material";
import arrowImage from "data-base64:assets/arrow.png";
import icon from "data-base64:assets/icon.png";
import { useTranslation } from "shared/i18n/config";
import { cardStyle } from "shared/styles";

export default function ReadyToGo() {
  const { t } = useTranslation();

  function next() {
    window.close();
  }

  return (
    <Container>
      <Stack justifyContent="center" sx={{ textAlign: "center" }}>
        <h1>
          {t("click_the_icon")}
        </h1>

        <Card sx={{ ...cardStyle, width: 500, margin: "auto" }} elevation={0}>
          <CardContent>
            <Stack spacing={2}>
              <img src={icon} />

              <img
                src={arrowImage} style={{
                rotate: "219deg",
                maxWidth: "60%",
                position: "absolute",
                right: "15%",
                top: 0,
              }}
              />

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
