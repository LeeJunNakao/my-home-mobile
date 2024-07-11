import { StyleSheet } from "react-native";
import { ColorSchema } from "./Colors";

export const dimensions = {
  forms: {
    lineHeight: 60,
  },
  gap: {
    default: 5,
    big: 10,
  },
  border: {
    width: {
      default: 2,
    },
    radius: {
      default: 2,
    },
  },
};

const getStyles = (color: ColorSchema) =>
  StyleSheet.create({
    rootBox: {
      padding: 20,
      gap: dimensions.gap.big,
    },
    itemBox: {
      padding: 10,
      gap: dimensions.gap.default,
    },
    border: {
      borderWidth: dimensions.border.width.default,
      borderColor: color.border.primary,
      borderRadius: dimensions.border.radius.default,
    },
  });

export { getStyles };
