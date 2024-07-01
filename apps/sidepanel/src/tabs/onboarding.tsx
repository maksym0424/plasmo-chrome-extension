import { Container } from "@mui/material";
import React from "react";
import useUiStore from "shared/state/uiStore";
import MicrophoneAccess from "~tabs/containers/microphone-access";
import PersonalInformation from "~tabs/containers/personal-information";
import PinToToolbar from "~tabs/containers/pin-to-toolbar";
import ReadyToGo from "~tabs/containers/ready-to-go";

export default function Onboarding() {
  return (
    <Container>
      <OnboardingSteps />
    </Container>
  );
}

function OnboardingSteps() {
  const ui = useUiStore();
  if (ui.onboardingStep === 0) return <MicrophoneAccess />;
  else if (ui.onboardingStep === 1) return <PersonalInformation />;
  else if (ui.onboardingStep === 2) return <PinToToolbar />;
  else if (ui.onboardingStep === 3) return <ReadyToGo />;
}
