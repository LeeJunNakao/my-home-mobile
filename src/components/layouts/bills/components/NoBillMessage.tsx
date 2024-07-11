import Typography from "@/components/Typography";
import { useStyle } from "@/hooks/useStyle";
import { View } from "react-native";

const NoBillMessage = () => {
  const { styles } = useStyle();

  return (
    <View style={[styles.border, styles.rootBox]}>
      <Typography>There aren't any bills for the current month yet</Typography>
    </View>
  );
};

export default NoBillMessage;
