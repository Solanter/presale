// Colors

const neutral = {
  100: "#F3F4F6",
  200: "#E5E7EB",
  300: "#D1D5DB",
  400: "#9CA3AF",
  500: "#6B7280",
  600: "#4B5563",
  700: "#374151",
  800: "#1F2937",
  900: "#111827",
};
const background = {
  default: neutral[900],
  paper: "#000000",
  contrast: neutral[200],
  contrastText: neutral[900],
};

const divider = neutral[600];

const primary = {
  main: "#2A04FE",
  light: "#401EFD",
  dark: "#1F01C3",
  contrastText: neutral[200],
};

const secondary = {
  main: "#c59307",
  light: "#fbc245",
  dark: "#8f6500",
  contrastText: neutral[100],
};

const success = {
  main: "#14B8A6",
  light: "#43C6B7",
  dark: "#0E8074",
  contrastText: neutral[900],
};

const info = {
  main: "#2196F3",
  light: "#64B6F7",
  dark: "#0B79D0",
  contrastText: neutral[900],
};

const warning = {
  main: "#FFB020",
  light: "#FFBF4C",
  dark: "#B27B16",
  contrastText: neutral[900],
};

const error = {
  main: "#F44336",
  light: "#E57373",
  dark: "#D32F2F",
  contrastText: neutral[100],
};

const text = {
  main: "#EDF2F7",
  primary: "#EDF2F7",
  secondary: "#A0AEC0",
  disabled: "rgba(255, 255, 255, 0.48)",
  contrastText: "#2e2e2e",
  buttonText: "#EDF2F7",
};

const darkThemeOptions = {
  palette: {
    action: {
      active: neutral[400],
      hover: "rgba(255, 255, 255, 0.04)",
      selected: "rgba(255, 255, 255, 0.08)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
      disabled: "rgba(255, 255, 255, 0.26)",
    },
    background,
    divider,
    error,
    info,
    mode: "dark",
    neutral,
    primary,
    secondary,
    success,
    text,
    warning,
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: background.default,
        },
      },
    },
  },
};

export default darkThemeOptions;
