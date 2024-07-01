import type { SxProps } from "@mui/material";
import type { CSSProperties } from "react";
import config from "./config";

export const containerStyle: SxProps = {
  height: config.ENV === "sidepanel" ? "calc(100vh - 165px)" : "calc(100vh - 120px)",
  paddingX: { md: 20, lg: 30 },
  paddingY: 2,
};

export const cardStyle: SxProps = {
  backgroundColor: "rgba(240, 240, 240)",
  padding: 1,
};

export const cardContainerStyle: SxProps = {
  ...containerStyle,
  ...cardStyle,
  borderRadius: config.ENV === "sidepanel" ? 3 : 0,
  boxShadow: 0,
  borderTop: "none",
};

export const blurredText: CSSProperties = {
  whiteSpace: "pre-line",
  overflowY: "auto",
  height: "100%",
  filter: "blur(1.9px)",
};

export const fabStyle: SxProps = {
  position: "fixed",
  color: "white",
};

export const primaryFab: SxProps = {
  bottom: 75,
  backgroundColor: "#2E3BA5",
  "&:hover": {
    backgroundColor: "#F81D5F",
  },
};

export const secondaryFab: SxProps = {
  bottom: 130,
  backgroundColor: "#5467ee",
  "&:hover": {
    backgroundColor: "#ff4a7f",
  },
};

export const inputFieldStyle: SxProps = {
  backgroundColor: "white",
  marginBottom: 2,
};

export const circularProgressStyle = {
  top: 20,
  position: "relative",
  zIndex: 10,
  left: "50%",
  right: "50%",
  marginBottom: -10,
};

export const iconButtonStyle = {
  float: "right",
  marginBottom: -10,
  zIndex: 10,
};
