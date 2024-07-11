/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export type ColorSchema = {
  text: string;
  background: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
  border: {
    primary: string;
    error: string;
  };
  fill: {
    primary: string;
  };
  palette: {
    critical: string;
  };
};

export const Colors: {
  light: ColorSchema;
  dark: ColorSchema;
} = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    border: {
      primary: "#26355D",
      error: "#EE4E4E",
    },
    fill: {
      primary: "#26355D",
    },
    palette: {
      critical: "#973131",
    },
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    border: {
      primary: "#4B70F5",
      error: "#EE4E4E",
    },
    fill: {
      primary: "#4B70F5",
    },
    palette: {
      critical: "#973131",
    },
  },
};
