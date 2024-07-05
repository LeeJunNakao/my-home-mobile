import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import { getStyles, dimensions } from "@/constants/Styles";

export const useStyle = () => {
  const mode = useColorScheme() as "light" | "dark";
  const colors = Colors[mode];
  const styles = getStyles(colors);

  return { styles, colors, dimensions };
};
