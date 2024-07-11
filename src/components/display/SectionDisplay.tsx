import { useStyle } from "@/hooks/useStyle";
import { View } from "react-native";
import Typography from "../Typography";
import { PropsWithChildren } from "react";

type Props = {
  title: string;
};

const SectionDisplay = ({ title, children }: PropsWithChildren<Props>) => {
  const { styles, dimensions } = useStyle();

  return (
    <View style={[styles.itemBox, { gap: dimensions.gap.big }]}>
      <View
        style={[
          {
            borderBottomWidth: dimensions.border.width.default,
          },
        ]}
      >
        <Typography variant="sectionTitle">{title}</Typography>
      </View>

      <View style={{ gap: dimensions.gap.default }}>{children}</View>
    </View>
  );
};

export default SectionDisplay;
